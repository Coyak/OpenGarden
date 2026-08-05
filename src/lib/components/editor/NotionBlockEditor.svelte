<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { renderMarkdown } from '$lib/utils/markdown';
  import { extractWikilinks, slugify } from '$lib/utils/wikilinks';
  import { ZETTELKASTEN_MAP } from '$lib/types/database.types';
  import type { Note, NoteStage } from '$lib/types/database.types';
  import { 
    Globe, Lock, Sprout, Leaf, TreeDeciduous, 
    Link2, Network, Sparkles, Plus, Layers
  } from 'lucide-svelte';

  export let note: Note;
  export let onUpdateNote: (updated: Note) => void;
  export let onNavigateToSlug: (slug: string) => void;

  let activeBlockIndex: number | null = 0;
  let blockInputs: (HTMLInputElement | HTMLTextAreaElement)[] = [];
  let copiedLink = false;

  $: stageMeta = ZETTELKASTEN_MAP[note.stage] || ZETTELKASTEN_MAP.seed;

  // Split content into blocks by lines
  $: blocks = (note.content || '').split('\n');

  $: extractedLinks = extractWikilinks(note.content);

  function handleStageChange(newStage: NoteStage) {
    note.stage = newStage;
    onUpdateNote(note);
  }

  function handlePublicToggle() {
    note.is_public = !note.is_public;
    onUpdateNote(note);
  }

  function copyPublicUrl() {
    navigator.clipboard.writeText(`${window.location.origin}/u/demo/${note.slug}`);
    copiedLink = true;
    setTimeout(() => copiedLink = false, 2000);
  }

  function updateBlockContent(index: number, newText: string) {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = newText;
    note.content = updatedBlocks.join('\n');
    onUpdateNote(note);
  }

  async function handleBlockKeyDown(event: KeyboardEvent, index: number) {
    // When Enter is pressed -> freeze current block & create new block below
    if (event.key === 'Enter') {
      event.preventDefault();
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, '');
      note.content = updatedBlocks.join('\n');
      onUpdateNote(note);
      
      activeBlockIndex = index + 1;
      await tick();
      if (blockInputs[index + 1]) {
        blockInputs[index + 1].focus();
      }
    } 
    // Backspace on empty line -> remove block & focus previous block
    else if (event.key === 'Backspace' && blocks[index] === '' && blocks.length > 1) {
      event.preventDefault();
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      note.content = updatedBlocks.join('\n');
      onUpdateNote(note);

      const targetIndex = Math.max(0, index - 1);
      activeBlockIndex = targetIndex;
      await tick();
      if (blockInputs[targetIndex]) {
        blockInputs[targetIndex].focus();
      }
    }
    // Arrow up / down navigation between blocks
    else if (event.key === 'ArrowUp' && index > 0) {
      activeBlockIndex = index - 1;
      await tick();
      if (blockInputs[index - 1]) blockInputs[index - 1].focus();
    }
    else if (event.key === 'ArrowDown' && index < blocks.length - 1) {
      activeBlockIndex = index + 1;
      await tick();
      if (blockInputs[index + 1]) blockInputs[index + 1].focus();
    }
  }

  function activateBlock(index: number) {
    activeBlockIndex = index;
    tick().then(() => {
      if (blockInputs[index]) blockInputs[index].focus();
    });
  }

  function handleBlockClick(event: MouseEvent, index: number) {
    const target = event.target as HTMLElement | null;
    if (target && target.classList.contains('wikilink')) {
      event.preventDefault();
      event.stopPropagation();
      const slug = target.getAttribute('data-slug');
      if (slug) {
        onNavigateToSlug(slug);
      }
    } else {
      activateBlock(index);
    }
  }

  function handleFooterWikilinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
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
  
  <!-- Document Header Bar (No Vista Lectura toggle button) -->
  <div class="px-6 py-3 border-b border-garden-border/60 glass-panel flex items-center justify-between flex-shrink-0">
    <!-- Stage Selector Dropdown -->
    <div class="flex items-center space-x-3">
      <div class="relative flex items-center">
        <select
          bind:value={note.stage}
          on:change={() => handleStageChange(note.stage)}
          class="bg-garden-surface border border-garden-border text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-semibold cursor-pointer appearance-none pr-8"
        >
          <option value="seed">🌱 Fleeting (Efímera)</option>
          <option value="growing">🌿 Literature (Literatura)</option>
          <option value="evergreen">🌲 Permanent (Permanente)</option>
        </select>
        <span class="absolute right-2.5 pointer-events-none text-garden-muted text-xs">▼</span>
      </div>

      <span class="hidden sm:inline text-xs text-garden-muted font-medium">
        Zettelkasten: <strong class={stageMeta.color}>{stageMeta.label}</strong>
      </span>
    </div>

    <!-- Right Controls: Public Toggle & Link Copy -->
    <div class="flex items-center space-x-2">
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
          <Link2 class="w-3.5 h-3.5" />
        </button>
      {/if}
    </div>
  </div>

  <!-- Notion Unified Single Canvas Page -->
  <div class="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 flex-grow flex flex-col relative">
    
    <!-- Title Input (Editable Large Notion Header) -->
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

    <!-- Hint Bar -->
    <div class="mb-6 text-[11px] text-garden-muted font-mono bg-garden-surface/60 px-3 py-1.5 rounded-xl border border-garden-border/40 flex items-center justify-between">
      <span>Escribe un bloque y presiona <code class="text-emerald-400 font-bold">Enter</code> para formatear como Markdown estilo Notion.</span>
      <span class="text-emerald-400 font-sans font-semibold">Live Block Editor</span>
    </div>

    <!-- Notion Unified Block Canvas -->
    <div class="space-y-1 min-h-[350px]">
      {#each blocks as blockText, i}
        {@const isActive = activeBlockIndex === i}
        {@const renderedBlock = renderMarkdown(blockText || ' ')}

        {#if isActive}
          <!-- Active Line: Plain Text Editable Block -->
          <div class="relative flex items-center group">
            <input
              bind:this={blockInputs[i]}
              type="text"
              value={blockText}
              on:input={(e) => updateBlockContent(i, e.currentTarget.value)}
              on:keydown={(e) => handleBlockKeyDown(e, i)}
              on:blur={() => activeBlockIndex = null}
              placeholder="Escribe algo o usa # Título, - Lista, > Cita..."
              class="w-full bg-transparent text-garden-text font-mono text-sm py-1 px-2 focus:outline-none border-l-2 border-emerald-500 bg-garden-surface/30 rounded-r-lg"
            />
          </div>
        {:else}
          <!-- Inactive Line: Notion Formatted Rendered Markdown Block -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            on:click={(e) => handleBlockClick(e, i)}
            class="py-1 px-2 rounded-lg hover:bg-garden-surface/40 cursor-text transition-colors text-garden-text text-sm leading-relaxed prose max-w-none"
          >
            {#if !blockText || blockText.trim() === ''}
              <span class="text-garden-muted/40 italic font-mono text-xs">Escribe algo...</span>
            {:else}
              {@html renderedBlock}
            {/if}
          </div>
        {/if}
      {/each}
    </div>

    <!-- Wikilinks Connections Footer Bar inside Document -->
    {#if extractedLinks.length > 0}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="mt-12 pt-6 border-t border-garden-border/60" on:click={handleFooterWikilinkClick}>
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
