<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { renderMarkdown } from '$lib/utils/markdown';
  import { extractWikilinks, slugify } from '$lib/utils/wikilinks';
  import { ZETTELKASTEN_MAP } from '$lib/types/database.types';
  import type { Note, NoteStage } from '$lib/types/database.types';
  import { 
    Globe, Lock, Sprout, Leaf, TreeDeciduous, 
    Link2, Network, Sparkles, Eye, Edit3, Check 
  } from 'lucide-svelte';

  export let note: Note;
  export let allNotes: Note[] = [];
  export let onUpdateNote: (updated: Note) => void;
  export let onNavigateToSlug: (slug: string) => void;
  export let isRightPanelOpen: boolean = true;
  export let onToggleRightPanel: () => void = () => {};

  let isPreviewMode = false;
  let copiedLink = false;
  let textareaElement: HTMLTextAreaElement;
  let showWikilinkMenu = false;
  let wikilinkQuery = '';

  $: stageMeta = ZETTELKASTEN_MAP[note.stage] || ZETTELKASTEN_MAP.seed;
  $: renderedHtml = renderMarkdown(note.content || '');
  $: extractedLinks = extractWikilinks(note.content || '');

  $: wikilinkSuggestions = allNotes.filter(n => 
    n.id !== note.id && 
    (n.title.toLowerCase().includes(wikilinkQuery.toLowerCase()) || 
     n.slug.toLowerCase().includes(wikilinkQuery.toLowerCase()))
  );

  function handleStageChange(newStage: NoteStage) {
    note.stage = newStage;
    onUpdateNote(note);
  }

  function handlePublicToggle() {
    note.is_public = !note.is_public;
    onUpdateNote(note);
  }

  function copyPublicUrl() {
    const url = `${window.location.origin}/u/demo#${note.slug}`;
    navigator.clipboard.writeText(url);
    copiedLink = true;
    setTimeout(() => copiedLink = false, 2000);
  }

  function handleContentInput() {
    onUpdateNote(note);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === '[' && textareaElement) {
      const cursor = textareaElement.selectionStart;
      const textBefore = note.content.slice(0, cursor);
      if (textBefore.endsWith('[')) {
        showWikilinkMenu = true;
        wikilinkQuery = '';
      }
    } else if (showWikilinkMenu && event.key === 'Escape') {
      showWikilinkMenu = false;
    }
  }

  function insertWikilink(targetTitle: string) {
    if (!textareaElement) return;
    const cursor = textareaElement.selectionStart;
    const textBefore = note.content.slice(0, cursor);
    const textAfter = note.content.slice(cursor);
    
    // Replace trailing '[' with [[Title]]
    const newTextBefore = textBefore.endsWith('[') ? textBefore.slice(0, -1) : textBefore;
    note.content = `${newTextBefore}[[${targetTitle}]]${textAfter}`;
    showWikilinkMenu = false;
    onUpdateNote(note);
  }

  function handleWikilinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('wikilink')) {
      event.preventDefault();
      event.stopPropagation();
      const slug = target.getAttribute('data-slug');
      if (slug) {
        onNavigateToSlug(slug);
      }
    }
  }
</script>

<div class="h-full flex flex-col bg-garden-main overflow-y-auto">
  
  <!-- Document Header Bar (0% Emojis, 100% SVG Icons) -->
  <div class="px-6 py-3 border-b border-garden-border/60 glass-panel flex items-center justify-between flex-shrink-0">
    
    <!-- Clean Zettelkasten Stage Buttons (No Emojis) -->
    <div class="flex items-center space-x-1 bg-garden-surface p-0.5 rounded-xl border border-garden-border text-xs">
      <button
        on:click={() => handleStageChange('seed')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'seed' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-garden-muted hover:text-white'}"
        title="Etapa Efímera (Seed)"
      >
        <Sprout class="w-3.5 h-3.5 text-emerald-400" />
        <span class="hidden md:inline">Efímera</span>
      </button>

      <button
        on:click={() => handleStageChange('growing')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'growing' ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40' : 'text-garden-muted hover:text-white'}"
        title="Etapa Literatura (Growing)"
      >
        <Leaf class="w-3.5 h-3.5 text-sky-400" />
        <span class="hidden md:inline">Literatura</span>
      </button>

      <button
        on:click={() => handleStageChange('evergreen')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'evergreen' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40' : 'text-garden-muted hover:text-white'}"
        title="Etapa Permanente (Evergreen)"
      >
        <TreeDeciduous class="w-3.5 h-3.5 text-purple-400" />
        <span class="hidden md:inline">Permanente</span>
      </button>
    </div>

    <!-- Right Controls: Toggle Edit vs Render, Public Toggle & Clean Inspector Toggle -->
    <div class="flex items-center space-x-2">
      <div class="flex items-center bg-garden-surface p-0.5 rounded-xl border border-garden-border text-xs">
        <button
          on:click={() => isPreviewMode = false}
          class="px-3 py-1 rounded-lg transition-colors flex items-center space-x-1.5 {!isPreviewMode ? 'bg-garden-card text-white font-bold shadow-sm' : 'text-garden-muted hover:text-white'}"
        >
          <Edit3 class="w-3.5 h-3.5" />
          <span>Editor Markdown</span>
        </button>

        <button
          on:click={() => isPreviewMode = true}
          class="px-3 py-1 rounded-lg transition-colors flex items-center space-x-1.5 {isPreviewMode ? 'bg-garden-card text-white font-bold shadow-sm' : 'text-garden-muted hover:text-white'}"
        >
          <Eye class="w-3.5 h-3.5 text-emerald-400" />
          <span>Vista Renderizada</span>
        </button>
      </div>

      <!-- Public / Private Toggle -->
      <button
        on:click={handlePublicToggle}
        class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border {note.is_public ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' : 'bg-garden-surface text-garden-muted border-garden-border'}"
      >
        {#if note.is_public}
          <Globe class="w-3.5 h-3.5 text-emerald-400" />
          <span class="hidden sm:inline">Pública</span>
        {:else}
          <Lock class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Privada</span>
        {/if}
      </button>

      {#if note.is_public}
        <button
          on:click={copyPublicUrl}
          class="p-1.5 rounded-xl bg-garden-surface border border-garden-border text-garden-muted hover:text-white text-xs transition-colors"
          title="Copiar URL pública"
        >
          {#if copiedLink}
            <Check class="w-3.5 h-3.5 text-emerald-400" />
          {:else}
            <Link2 class="w-3.5 h-3.5" />
          {/if}
        </button>
      {/if}

      <!-- Clean non-overlapping Right Inspector Panel toggle button -->
      {#if !isRightPanelOpen}
        <button
          on:click={onToggleRightPanel}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border bg-garden-surface text-sky-300 border-sky-500/40 hover:bg-sky-500/20"
          title="Mostrar Inspector de Conexiones"
        >
          <Network class="w-3.5 h-3.5 text-sky-400" />
          <span class="hidden sm:inline">Conexiones</span>
        </button>
      {/if}
    </div>
  </div>

  <!-- Notion Single Canvas Container -->
  <div class="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 flex-grow flex flex-col relative">
    
    <!-- Title Input (Editable Large Header) -->
    <div class="mb-6 space-y-2">
      <div class="flex items-center space-x-2 text-xs text-garden-muted font-mono">
        {#if note.stage === 'seed'}
          <Sprout class="w-4 h-4 text-emerald-400" />
        {:else if note.stage === 'growing'}
          <Leaf class="w-4 h-4 text-sky-400" />
        {:else}
          <TreeDeciduous class="w-4 h-4 text-purple-400" />
        {/if}
        <span>Zettelkasten / {stageMeta.shortLabel}</span>
      </div>

      <input
        type="text"
        bind:value={note.title}
        on:input={() => { note.slug = slugify(note.title); onUpdateNote(note); }}
        placeholder="Título de la nota..."
        class="w-full bg-transparent text-3xl sm:text-4xl font-extrabold text-white focus:outline-none placeholder:text-garden-muted/40 tracking-tight border-b border-transparent focus:border-garden-border pb-1"
      />
    </div>

    <!-- Toolbar Hint Bar -->
    <div class="mb-6 text-[11px] text-garden-muted font-mono bg-garden-surface/60 px-3 py-1.5 rounded-xl border border-garden-border/40 flex items-center justify-between">
      <span>Escribe sintaxis Markdown: <code class="text-emerald-400 font-bold"># Título</code>, <code class="text-emerald-400 font-bold">## Título 2</code>, <code class="text-emerald-400 font-bold">- Viñeta</code>, <code class="text-emerald-400 font-bold">&gt; Cita</code>, <code class="text-emerald-400 font-bold">[[Nota]]</code></span>
      <span class="text-emerald-400 font-sans font-semibold">Live Editor</span>
    </div>

    <!-- Wikilink Autocomplete Popover -->
    {#if showWikilinkMenu && wikilinkSuggestions.length > 0}
      <div class="absolute top-36 left-6 z-50 w-64 rounded-2xl glass-panel border border-garden-border shadow-2xl p-2 animate-in fade-in zoom-in-95 space-y-1">
        <div class="px-2 py-1 text-[10px] uppercase font-bold text-garden-muted tracking-wider border-b border-garden-border/60">
          Seleccionar Nota para [[...]]
        </div>

        <div class="max-h-48 overflow-y-auto space-y-0.5">
          {#each wikilinkSuggestions as suggestion}
            <button
              type="button"
              on:click={() => insertWikilink(suggestion.title)}
              class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors flex items-center justify-between"
            >
              <span class="truncate">{suggestion.title}</span>
              <span class="text-[10px] text-garden-muted font-mono">/u/{suggestion.slug}</span>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Main Canvas View: Markdown Editor vs Rendered Document -->
    {#if !isPreviewMode}
      <textarea
        bind:this={textareaElement}
        bind:value={note.content}
        on:input={handleContentInput}
        on:keydown={handleKeyDown}
        placeholder="Comienza a escribir en Markdown aquí... Usa # para títulos, - para viñetas, > para citas o [[ para wikilinks."
        class="w-full flex-grow min-h-[400px] bg-transparent text-slate-100 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-relaxed p-2"
      ></textarea>
    {:else}
      <!-- Rendered Markdown View with Wikilink Click Navigation -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="prose prose-invert max-w-none text-slate-200 leading-relaxed py-2 min-h-[400px]"
        on:click={handleWikilinkClick}
      >
        {@html renderedHtml}
      </div>
    {/if}

    <!-- Wikilinks Connections Footer Bar -->
    {#if extractedLinks.length > 0}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="mt-12 pt-6 border-t border-garden-border/60" on:click={handleWikilinkClick}>
        <h4 class="text-xs font-bold text-white mb-3 flex items-center space-x-2">
          <Network class="w-4 h-4 text-emerald-400" />
          <span>Conexiones Zettelkasten ([[...]]) en este documento:</span>
        </h4>
        <div class="flex flex-wrap gap-2">
          {#each extractedLinks as link}
            <a 
              href={`#${link.slug}`} 
              data-slug={link.slug}
              class="wikilink px-3 py-1 rounded-xl bg-garden-surface border border-garden-border text-xs text-emerald-300 font-medium flex items-center space-x-1 hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <span class="text-emerald-400 font-mono">[[</span>
              <span>{link.displayTitle}</span>
              <span class="text-emerald-400 font-mono">]]</span>
            </a>
          {/each}
        </div>
      </div>
    {/if}

  </div>
</div>
