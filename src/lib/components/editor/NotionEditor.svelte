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

  let copiedLink = false;
  let showWikilinkMenu = false;
  let wikilinkQuery = '';
  let isAllSelected = false;

  // Global Undo/Redo history stack state
  let undoStack: string[] = [];
  let redoStack: string[] = [];
  let isUndoOrRedoOperation = false;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let currentNoteId = '';

  $: {
    if (note && note.id !== currentNoteId) {
      currentNoteId = note.id;
      undoStack = [note.content || ''];
      redoStack = [];
    }
  }
  
  let activeBlockIndex: number | null = null;
  let blockInputs: HTMLInputElement[] = [];

  $: stageMeta = ZETTELKASTEN_MAP[note.stage] || ZETTELKASTEN_MAP.seed;
  $: blocks = (note.content || '').split('\n');
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

  // Set the first line active on mount to make onboarding intuitive
  onMount(() => {
    if (blocks.length > 0) {
      activeBlockIndex = 0;
    }
  });

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

  function updateBlockContent(index: number, newText: string) {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = newText;
    note.content = updatedBlocks.join('\n');
    onUpdateNote(note);
  }

  function handleBlockInput(event: Event, index: number) {
    const input = event.currentTarget as HTMLInputElement;
    debouncedSaveToHistory(note.content);
    updateBlockContent(index, input.value);

    const cursor = input.selectionStart || 0;
    const textBefore = input.value.slice(0, cursor);
    if (textBefore.endsWith('[[')) {
      showWikilinkMenu = true;
      wikilinkQuery = '';
    } else if (showWikilinkMenu) {
      const lastIdx = textBefore.lastIndexOf('[[');
      if (lastIdx !== -1) {
        wikilinkQuery = textBefore.slice(lastIdx + 2);
      } else {
        showWikilinkMenu = false;
      }
    }
  }

  async function handleBlockKeyDown(event: KeyboardEvent, index: number) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      isAllSelected = true;
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      toggleFormatting(index, '**');
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'i') {
      event.preventDefault();
      toggleFormatting(index, '_');
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      saveToHistory(note.content);
      showWikilinkMenu = false;
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, '');
      note.content = updatedBlocks.join('\n');
      onUpdateNote(note);

      activeBlockIndex = index + 1;
      await tick();
      if (blockInputs[index + 1]) {
        blockInputs[index + 1].focus();
      }
    } else if (event.key === 'Backspace' && blocks[index] === '' && blocks.length > 1) {
      event.preventDefault();
      saveToHistory(note.content);
      showWikilinkMenu = false;
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
    } else if (event.key === 'ArrowUp' && index > 0) {
      event.preventDefault();
      showWikilinkMenu = false;
      activeBlockIndex = index - 1;
      await tick();
      if (blockInputs[index - 1]) blockInputs[index - 1].focus();
    } else if (event.key === 'ArrowDown' && index < blocks.length - 1) {
      event.preventDefault();
      showWikilinkMenu = false;
      activeBlockIndex = index + 1;
      await tick();
      if (blockInputs[index + 1]) blockInputs[index + 1].focus();
    } else if (event.key === 'Escape') {
      showWikilinkMenu = false;
    }
  }

  function activateBlock(index: number) {
    activeBlockIndex = index;
    tick().then(() => {
      if (blockInputs[index]) blockInputs[index].focus();
    });
  }

  function handleBlockClick(event: MouseEvent, index: number) {
    if (isAllSelected) {
      isAllSelected = false;
    }

    // If the user has highlighted text with the cursor, do not activate edit mode
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      return;
    }

    const target = event.target as HTMLElement;
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

  function insertWikilink(targetTitle: string) {
    if (activeBlockIndex === null || !blockInputs[activeBlockIndex]) return;
    saveToHistory(note.content);
    const blockText = blocks[activeBlockIndex];
    const input = blockInputs[activeBlockIndex];
    const cursor = input.selectionStart || blockText.length;
    
    const textBefore = blockText.slice(0, cursor);
    const textAfter = blockText.slice(cursor);
    
    const lastIdx = textBefore.lastIndexOf('[[');
    const newTextBefore = lastIdx !== -1 ? textBefore.slice(0, lastIdx) : textBefore;
    
    const newBlockText = `${newTextBefore}[[${targetTitle}]]${textAfter}`;
    updateBlockContent(activeBlockIndex, newBlockText);
    showWikilinkMenu = false;

    // Focus input back and position cursor after wikilink
    tick().then(() => {
      if (input) {
        input.focus();
        const newCursorPos = newTextBefore.length + targetTitle.length + 4; // [[ + Title + ]]
        input.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
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

  function saveToHistory(content: string) {
    if (isUndoOrRedoOperation) return;
    const top = undoStack[undoStack.length - 1];
    if (content !== top) {
      if (undoStack.length >= 100) {
        undoStack.shift();
      }
      undoStack.push(content);
      redoStack = []; // Reset redo stack on new operation
    }
  }

  function debouncedSaveToHistory(content: string) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      saveToHistory(content);
    }, 800);
  }

  async function performUndo() {
    if (undoStack.length === 0) return;
    isUndoOrRedoOperation = true;
    const currentContent = note.content || '';
    
    let targetContent = undoStack.pop();
    if (targetContent === currentContent && undoStack.length > 0) {
      redoStack.push(currentContent);
      targetContent = undoStack.pop();
    } else {
      redoStack.push(currentContent);
    }
    
    if (targetContent !== undefined) {
      note.content = targetContent;
      onUpdateNote(note);
    }
    
    await tick();
    isUndoOrRedoOperation = false;
  }

  async function performRedo() {
    if (redoStack.length === 0) return;
    isUndoOrRedoOperation = true;
    const currentContent = note.content || '';
    undoStack.push(currentContent);
    
    const nextContent = redoStack.pop();
    if (nextContent !== undefined) {
      note.content = nextContent;
      onUpdateNote(note);
    }
    
    await tick();
    isUndoOrRedoOperation = false;
  }

  function toggleFormatting(index: number, marker: string) {
    const input = blockInputs[index];
    if (!input) return;
    
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const blockText = blocks[index];
    
    const selectedText = blockText.slice(start, end);
    const newText = blockText.slice(0, start) + marker + selectedText + marker + blockText.slice(end);
    
    saveToHistory(note.content);
    updateBlockContent(index, newText);
    
    tick().then(() => {
      input.focus();
      input.setSelectionRange(start + marker.length, start + marker.length + selectedText.length);
    });
  }

  function handleGlobalKeyDown(event: KeyboardEvent) {
    // Check for Undo (Ctrl+Z)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      event.preventDefault();
      performUndo();
      return;
    }
    // Check for Redo (Ctrl+Y or Ctrl+Shift+Z)
    if ((event.ctrlKey || event.metaKey) && 
        ((event.key.toLowerCase() === 'y') || (event.key.toLowerCase() === 'z' && event.shiftKey))) {
      event.preventDefault();
      performRedo();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      // Check if focus is inside title input or other interactive forms
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && activeEl !== blockInputs[activeBlockIndex || 0]) {
        // If focus is in Title or other forms, let native select all happen
        return;
      }
      event.preventDefault();
      isAllSelected = true;
      return;
    }

    if (isAllSelected) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        note.content = '';
        isAllSelected = false;
        activeBlockIndex = 0;
        onUpdateNote(note);
        tick().then(() => {
          if (blockInputs[0]) blockInputs[0].focus();
        });
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        navigator.clipboard.writeText(note.content);
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'x') {
        event.preventDefault();
        navigator.clipboard.writeText(note.content);
        note.content = '';
        isAllSelected = false;
        activeBlockIndex = 0;
        onUpdateNote(note);
        tick().then(() => {
          if (blockInputs[0]) blockInputs[0].focus();
        });
        return;
      }
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        note.content = event.key;
        isAllSelected = false;
        activeBlockIndex = 0;
        onUpdateNote(note);
        tick().then(() => {
          if (blockInputs[0]) blockInputs[0].focus();
        });
        return;
      }
      // Any other key clears selection
      if (event.key !== 'Control' && event.key !== 'Meta' && event.key !== 'Shift') {
        isAllSelected = false;
      }
    }
  }

  function handleGlobalMouseDown() {
    if (isAllSelected) {
      isAllSelected = false;
    }
  }

  function getInputClasses(text: string): string {
    const trimmed = text.trim();
    // Clear browser-drawn outlines, and add an elegant left accent border and soft backdrop highlight.
    // Left padding set to pl-2.5 + border-l-2 = 12px (matches px-3 of inactive lines exactly to prevent shifts).
    let base = "w-full bg-transparent outline-none focus:outline-none border-t-0 border-r-0 border-b-0 border-l-2 border-accent focus:border-accent focus:ring-0 focus:ring-transparent transition-all py-1 pl-2.5 pr-3 bg-accent-glow/5 rounded-r-lg ";

    if (trimmed.startsWith('# ')) {
      return base + "font-serif text-2xl sm:text-3xl font-extrabold text-garden-text tracking-tight";
    }
    if (trimmed.startsWith('## ')) {
      return base + "font-serif text-xl sm:text-2xl font-bold text-garden-text/95 tracking-tight";
    }
    if (trimmed.startsWith('### ')) {
      return base + "font-serif text-lg sm:text-xl font-semibold text-garden-text/90";
    }
    if (trimmed.startsWith('> ')) {
      // Style match with .prose blockquote (border-l-4 border-accent, background accent-glow)
      return "w-full bg-transparent outline-none focus:outline-none border-t-0 border-r-0 border-b-0 border-l-4 border-accent focus:border-accent focus:ring-0 focus:ring-transparent transition-all py-1.5 pl-4 pr-3 bg-accent-glow font-sans italic text-garden-text/90 rounded-r-lg";
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      return base + "font-sans text-base pl-6 text-garden-text/90";
    }
    if (trimmed.startsWith('```') || trimmed.startsWith('`')) {
      return "w-full bg-transparent outline-none focus:outline-none border-0 focus:ring-0 focus:ring-transparent transition-all py-1.5 px-3 font-mono text-xs sm:text-sm bg-garden-surface/40 rounded text-emerald-500";
    }
    return base + "font-sans text-base leading-relaxed text-garden-text/90";
  }
</script>

<svelte:window on:keydown={handleGlobalKeyDown} on:mousedown={handleGlobalMouseDown} />

<div class="h-full flex flex-col bg-garden-main overflow-y-auto">
  
  <!-- Document Header Bar (0% Emojis, 100% SVG Icons) -->
  <div class="px-6 py-3 border-b border-garden-border/60 glass-panel flex items-center justify-between flex-shrink-0">
    
    <!-- Clean Zettelkasten Stage Buttons (No Emojis) -->
    <div class="flex items-center space-x-1 bg-garden-surface p-0.5 rounded-xl border border-garden-border text-xs">
      <button
        on:click={() => handleStageChange('seed')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'seed' ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 dark:border-emerald-500/40' : 'text-garden-muted hover:text-garden-text'}"
        title="Etapa Efímera (Seed)"
      >
        <Sprout class="w-3.5 h-3.5 text-emerald-400" />
        <span class="hidden md:inline">Efímera</span>
      </button>

      <button
        on:click={() => handleStageChange('growing')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'growing' ? 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold border border-sky-500/30 dark:border-sky-500/40' : 'text-garden-muted hover:text-garden-text'}"
        title="Etapa Literatura (Growing)"
      >
        <Leaf class="w-3.5 h-3.5 text-sky-400" />
        <span class="hidden md:inline">Literatura</span>
      </button>

      <button
        on:click={() => handleStageChange('evergreen')}
        class="px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors {note.stage === 'evergreen' ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30 dark:border-purple-500/40' : 'text-garden-muted hover:text-garden-text'}"
        title="Etapa Permanente (Evergreen)"
      >
        <TreeDeciduous class="w-3.5 h-3.5 text-purple-400" />
        <span class="hidden md:inline">Permanente</span>
      </button>
    </div>

    <!-- Right Controls: Public Toggle & Clean Inspector Toggle -->
    <div class="flex items-center space-x-2">

      <!-- Public / Private Toggle -->
      <button
        on:click={handlePublicToggle}
        class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border {note.is_public ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40' : 'bg-garden-surface text-garden-muted border-garden-border'}"
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
          class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border bg-garden-surface text-sky-700 dark:text-sky-300 border-sky-500/40 hover:bg-sky-500/20"
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
        class="w-full bg-transparent text-3xl sm:text-4xl font-extrabold text-white focus:outline-none placeholder:text-garden-muted/40 tracking-tight border-b border-transparent focus:border-garden-border pb-1 font-serif"
      />
    </div>

    <!-- Toolbar Hint Bar -->
    <div class="mb-6 text-[11px] text-garden-muted font-mono bg-garden-surface/60 px-3 py-1.5 rounded-xl border border-garden-border/40 flex items-center justify-between">
      <span>Escribe un bloque y presiona <code class="text-emerald-400 font-bold">Enter</code>. Usa <code class="text-emerald-400 font-bold">[[</code> para conectar otras páginas.</span>
      <span class="text-emerald-400 font-sans font-semibold">Live Obsidian Editor</span>
    </div>

    <!-- Main Canvas View: Unified Interactive Zettelkasten Document -->
    <div class="live-editor-canvas space-y-0.5 min-h-[400px] flex flex-col justify-start pb-20">
      {#each blocks as blockText, i}
        {@const isActive = activeBlockIndex === i}
        {@const renderedBlock = renderMarkdown(blockText || ' ')}

        {#if isActive}
          <!-- Active Line: borderless input element -->
          <div class="relative flex flex-col group w-full {isAllSelected ? 'is-all-selected' : ''}">
            <input
              bind:this={blockInputs[i]}
              type="text"
              value={blockText}
              on:input={(e) => handleBlockInput(e, i)}
              on:keydown={(e) => handleBlockKeyDown(e, i)}
              on:blur={() => setTimeout(() => { if (activeBlockIndex === i) activeBlockIndex = null; }, 150)}
              placeholder="Escribe algo o usa # Título, - Lista, > Cita..."
              class="{getInputClasses(blockText)} {isAllSelected ? 'is-all-selected' : ''}"
            />

            <!-- Nested Wikilink Autocomplete Popover (Always below active line) -->
            {#if showWikilinkMenu && wikilinkSuggestions.length > 0}
              <div class="absolute top-full left-3 mt-1.5 z-50 w-72 rounded-2xl glass-panel border border-garden-border shadow-2xl p-2.5 animate-in fade-in zoom-in-95 space-y-2 pointer-events-auto">
                <div class="px-2 py-1 text-[10px] uppercase font-bold text-garden-muted tracking-wider border-b border-garden-border/60">
                  Seleccionar Nota para [[...]]
                </div>

                <div class="max-h-48 overflow-y-auto space-y-0.5">
                  {#each wikilinkSuggestions as suggestion}
                    <button
                      type="button"
                      on:mousedown|preventDefault={() => insertWikilink(suggestion.title)}
                      class="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-white hover:bg-emerald-500/10 hover:text-emerald-300 border border-transparent hover:border-emerald-500/20 transition-all flex items-center justify-between"
                    >
                      <span class="truncate">{suggestion.title}</span>
                      <span class="text-[10px] text-garden-muted font-mono">/u/{suggestion.slug}</span>
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <!-- Inactive Line: fully rendered Markdown -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            on:click={(e) => handleBlockClick(e, i)}
            class="py-1 px-3 rounded-xl hover:bg-garden-surface/30 cursor-text transition-colors text-garden-text text-base leading-relaxed prose max-w-none w-full {isAllSelected ? 'is-all-selected' : ''}"
          >
            {#if !blockText || blockText.trim() === ''}
              <span class="text-garden-muted/40 italic font-mono text-xs select-none">Escribe algo...</span>
            {:else}
              {@html renderedBlock}
            {/if}
          </div>
        {/if}
      {/each}
    </div>

    <!-- Wikilinks Connections Footer Bar -->
    {#if extractedLinks.length > 0}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="mt-6 pt-3 border-t border-garden-border/40 select-text" on:click={handleWikilinkClick}>
        <h4 class="text-[10px] font-bold uppercase tracking-wider text-garden-muted mb-2 flex items-center space-x-1.5">
          <Network class="w-3 h-3 text-emerald-400/80" />
          <span>Conexiones Zettelkasten ([[...]]):</span>
        </h4>
        <div class="flex flex-wrap gap-1.5">
          {#each extractedLinks as link}
            <a 
              href={`#${link.slug}`} 
              data-slug={link.slug}
              class="wikilink px-2 py-0.5 rounded-lg bg-garden-surface/40 border border-garden-border/80 text-[10px] text-emerald-300 font-mono transition-colors cursor-pointer hover:border-emerald-500/40"
            >
              <span class="text-emerald-400/60">[[</span>
              <span class="font-sans">{link.displayTitle}</span>
              <span class="text-emerald-400/60">]]</span>
            </a>
          {/each}
        </div>
      </div>
    {/if}

  </div>
</div>
