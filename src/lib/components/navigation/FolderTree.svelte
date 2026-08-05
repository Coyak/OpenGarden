<script lang="ts">
  import { 
    Folder as FolderClosed, FolderOpen, FileText, ChevronRight, ChevronDown, 
    Plus, Trash2, Globe, Sprout, Leaf, TreeDeciduous, Search, FolderPlus, Edit2, Check 
  } from 'lucide-svelte';
  import type { Folder, Note, NoteStage } from '$lib/types/database.types';

  export let folders: Folder[] = [];
  export let notes: Note[] = [];
  export let activeNoteId: string = '';
  export let onSelectNote: (id: string) => void;
  export let onCreateNote: (folderId?: string, stage?: NoteStage) => void;
  export let onCreateFolder: (name: string, parentId?: string | null) => void;
  export let onDeleteNote: (id: string) => void;
  export let onMoveNoteToFolder: (noteId: string, folderId: string | null) => void;
  export let onRenameFolder: (folderId: string, newName: string) => void;
  export let onRenameNote: (noteId: string, newTitle: string) => void;

  let expandedFolders: Record<string, boolean> = { 'f1': true, 'f2': true, 'f3': true };
  let newFolderName = '';
  let showNewFolderModal = false;
  let showCreateMenu = false;
  let selectedParentFolderId: string | null = null;
  let searchQuery = '';

  // Inline editing state
  let editingFolderId: string | null = null;
  let editingFolderName = '';
  let editingNoteId: string | null = null;
  let editingNoteTitle = '';

  // Drag and Drop state
  let draggedNoteId: string | null = null;
  let dragOverFolderId: string | null = null;

  function toggleFolder(folderId: string) {
    expandedFolders = { ...expandedFolders, [folderId]: !expandedFolders[folderId] };
  }

  function handleCreateFolderSubmit() {
    if (!newFolderName.trim()) return;
    onCreateFolder(newFolderName.trim(), selectedParentFolderId);
    newFolderName = '';
    showNewFolderModal = false;
  }

  // Drag & Drop Event Handlers
  function handleDragStart(event: DragEvent, noteId: string) {
    draggedNoteId = noteId;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', noteId);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  function handleDragOver(event: DragEvent, folderId: string | null) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    dragOverFolderId = folderId;
  }

  function handleDragLeave() {
    dragOverFolderId = null;
  }

  function handleDrop(event: DragEvent, folderId: string | null) {
    event.preventDefault();
    const noteId = event.dataTransfer?.getData('text/plain') || draggedNoteId;
    if (noteId) {
      onMoveNoteToFolder(noteId, folderId);
      // Auto expand target folder with immutable reactivity
      if (folderId) {
        expandedFolders = { ...expandedFolders, [folderId]: true };
      }
    }
    draggedNoteId = null;
    dragOverFolderId = null;
  }

  // Renaming Handlers
  function startRenameFolder(folder: Folder) {
    editingFolderId = folder.id;
    editingFolderName = folder.name;
  }

  function saveRenameFolder(folderId: string) {
    if (editingFolderName.trim()) {
      onRenameFolder(folderId, editingFolderName.trim());
    }
    editingFolderId = null;
  }

  function startRenameNote(note: Note) {
    editingNoteId = note.id;
    editingNoteTitle = note.title;
  }

  function saveRenameNote(noteId: string) {
    if (editingNoteTitle.trim()) {
      onRenameNote(noteId, editingNoteTitle.trim());
    }
    editingNoteId = null;
  }

  $: filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reactive mapping helper for instant removal from source folder
  $: getFolderNotes = (folderId: string | null) => {
    return filteredNotes.filter(n => n.folder_id === folderId);
  };

  $: uncategorizedNotes = filteredNotes.filter(n => {
    const folderIds = new Set(folders.map(f => f.id));
    return !n.folder_id || !folderIds.has(n.folder_id);
  });
</script>

<div class="flex flex-col h-full space-y-2">
  
  <!-- Quick Actions & Unified Creation Menu -->
  <div class="px-3 pt-3 pb-2 space-y-2 border-b border-garden-border/60">
    <div class="flex items-center justify-between relative">
      <span class="text-[11px] font-bold uppercase tracking-wider text-garden-muted flex items-center space-x-1.5">
        <FolderOpen class="w-3.5 h-3.5 text-emerald-400" />
        <span>Navegador de Carpetas</span>
      </span>

      <!-- Unified Creation Plus Button -->
      <div class="relative">
        <button
          on:click={() => showCreateMenu = !showCreateMenu}
          class="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center space-x-1 text-xs font-semibold"
          title="Crear Nueva Nota o Categoría"
        >
          <Plus class="w-4 h-4" />
        </button>

        {#if showCreateMenu}
          <div class="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-garden-border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 space-y-1">
            <div class="px-2 py-1 text-[10px] uppercase font-bold text-garden-muted tracking-wider border-b border-garden-border/40 mb-1">
              Crear Nueva Nota Zettelkasten
            </div>

            <button
              on:click={() => { onCreateNote(undefined, 'seed'); showCreateMenu = false; }}
              class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors flex items-center space-x-2"
            >
              <Sprout class="w-4 h-4 text-emerald-400" />
              <span>Nota Efímera (Seed)</span>
            </button>

            <button
              on:click={() => { onCreateNote(undefined, 'growing'); showCreateMenu = false; }}
              class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-sky-500/20 hover:text-sky-300 transition-colors flex items-center space-x-2"
            >
              <Leaf class="w-4 h-4 text-sky-400" />
              <span>Nota de Literatura (Growing)</span>
            </button>

            <button
              on:click={() => { onCreateNote(undefined, 'evergreen'); showCreateMenu = false; }}
              class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-purple-500/20 hover:text-purple-300 transition-colors flex items-center space-x-2"
            >
              <TreeDeciduous class="w-4 h-4 text-purple-400" />
              <span>Nota Permanente (Evergreen)</span>
            </button>

            <div class="border-t border-garden-border/40 pt-1 my-1"></div>

            <button
              on:click={() => { selectedParentFolderId = null; showNewFolderModal = true; showCreateMenu = false; }}
              class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-garden-surface hover:text-emerald-300 transition-colors flex items-center space-x-2"
            >
              <FolderPlus class="w-4 h-4 text-amber-400" />
              <span>Nueva Categoría / Carpeta</span>
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Search Input -->
    <div class="relative group">
      <Search class="w-3.5 h-3.5 text-garden-muted absolute left-2.5 top-2.5 group-focus-within:text-emerald-400 transition-colors" />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar nota o carpeta..."
        class="w-full pl-8 pr-3 py-1.5 rounded-xl bg-garden-surface/80 border border-garden-border text-xs text-garden-text placeholder:text-garden-muted/75 focus:outline-none focus:border-emerald-500/60 focus:bg-garden-card focus:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-200"
      />
    </div>
  </div>

  <!-- Folder Tree List with HTML5 Drag & Drop -->
  <div class="flex-grow overflow-y-auto px-2 space-y-1 text-xs">
    
    <!-- Render Folders -->
    {#each folders as folder (folder.id)}
      {@const folderNotes = getFolderNotes(folder.id)}
      {@const isExpanded = expandedFolders[folder.id] ?? false}
      {@const isDragOver = dragOverFolderId === folder.id}

      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="space-y-0.5 rounded-2xl transition-all duration-200 {isDragOver ? 'bg-emerald-500/10 border border-dashed border-emerald-500/50 p-1.5 shadow-[0_0_15px_var(--accent-glow)]' : ''}"
        on:dragover={(e) => handleDragOver(e, folder.id)}
        on:dragleave={handleDragLeave}
        on:drop={(e) => handleDrop(e, folder.id)}
      >
        <!-- Folder Row Header -->
        <div class="group flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-garden-surface/80 text-garden-muted hover:text-white transition-colors">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="flex items-center space-x-1.5 flex-grow cursor-pointer truncate"
            on:click={() => toggleFolder(folder.id)}
          >
            {#if isExpanded}
              <ChevronDown class="w-3.5 h-3.5 text-garden-muted" />
              <FolderOpen class="w-4 h-4 text-emerald-400" />
            {:else}
              <ChevronRight class="w-3.5 h-3.5 text-garden-muted" />
              <FolderClosed class="w-4 h-4 text-garden-muted group-hover:text-white" />
            {/if}

            {#if editingFolderId === folder.id}
              <input
                type="text"
                bind:value={editingFolderName}
                on:keydown={(e) => e.key === 'Enter' && saveRenameFolder(folder.id)}
                class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"
              />
              <button on:click={() => saveRenameFolder(folder.id)} class="text-emerald-400 hover:text-white">
                <Check class="w-3.5 h-3.5" />
              </button>
            {:else}
              <span class="font-medium truncate text-white/90">{folder.name}</span>
              <span class="text-[10px] text-garden-muted font-mono">({folderNotes.length})</span>
            {/if}
          </div>

          <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              on:click|stopPropagation={() => startRenameFolder(folder)}
              class="p-1 hover:text-sky-400 transition-colors"
              title="Renombrar carpeta"
            >
              <Edit2 class="w-3 h-3" />
            </button>
            <button
              on:click|stopPropagation={() => onCreateNote(folder.id)}
              class="p-1 hover:text-emerald-400 transition-colors"
              title="Añadir nota en esta carpeta"
            >
              <Plus class="w-3 h-3" />
            </button>
          </div>
        </div>

        <!-- Nested Draggable Folder Items -->
        {#if isExpanded}
          <div class="pl-5 space-y-1.5 border-l-2 border-dashed border-garden-border/30 hover:border-emerald-500/20 ml-3.5 transition-all duration-300">
            {#if folderNotes.length === 0}
              <div class="py-1 px-2 text-[11px] text-garden-muted/60 italic">Arrastra notas aquí</div>
            {:else}
              {#each folderNotes as note (note.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, note.id)}
                  class="group flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium cursor-grab active:cursor-grabbing transition-all border {activeNoteId === note.id ? 'bg-garden-surface text-white border-garden-border shadow-sm' : 'text-garden-muted hover:text-white hover:bg-garden-surface/40 border-transparent'}"
                  on:click={() => onSelectNote(note.id)}
                >
                  <div class="flex items-center space-x-2 truncate">
                    {#if note.stage === 'seed'}
                      <Sprout class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {:else if note.stage === 'growing'}
                      <Leaf class="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    {:else}
                      <TreeDeciduous class="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    {/if}

                    {#if editingNoteId === note.id}
                      <input
                        type="text"
                        bind:value={editingNoteTitle}
                        on:keydown={(e) => e.key === 'Enter' && saveRenameNote(note.id)}
                        class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"
                      />
                      <button on:click={() => saveRenameNote(note.id)} class="text-emerald-400 hover:text-white">
                        <Check class="w-3.5 h-3.5" />
                      </button>
                    {:else}
                      <span class="truncate">{note.title}</span>
                    {/if}
                  </div>

                  <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {#if note.is_public}
                      <span title="Pública"><Globe class="w-3 h-3 text-emerald-400" /></span>
                    {/if}
                    <button
                      on:click|stopPropagation={() => startRenameNote(note)}
                      class="p-1 hover:text-sky-400 transition-colors"
                      title="Renombrar nota"
                    >
                      <Edit2 class="w-3 h-3" />
                    </button>
                    <button
                      on:click|stopPropagation={() => onDeleteNote(note.id)}
                      class="p-1 text-garden-muted hover:text-red-400 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        {/if}
      </div>
    {/each}

    <!-- Uncategorized Notes Root Level Drop Target -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="pt-2 rounded-2xl transition-all duration-200 {dragOverFolderId === 'uncategorized' ? 'bg-emerald-500/10 border border-dashed border-emerald-500/50 p-1.5 shadow-[0_0_15px_var(--accent-glow)]' : ''}"
      on:dragover={(e) => handleDragOver(e, 'uncategorized')}
      on:dragleave={handleDragLeave}
      on:drop={(e) => handleDrop(e, null)}
    >
      <div class="px-2 py-1 text-[10px] uppercase font-bold text-garden-muted tracking-wider">
        Notas Sueltas ({uncategorizedNotes.length})
      </div>
      {#each uncategorizedNotes as note (note.id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          draggable="true"
          on:dragstart={(e) => handleDragStart(e, note.id)}
          class="group flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium cursor-grab active:cursor-grabbing transition-all border {activeNoteId === note.id ? 'bg-garden-surface text-white border-garden-border shadow-sm' : 'text-garden-muted hover:text-white hover:bg-garden-surface/40 border-transparent'}"
          on:click={() => onSelectNote(note.id)}
        >
          <div class="flex items-center space-x-2 truncate">
            {#if note.stage === 'seed'}
              <Sprout class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            {:else if note.stage === 'growing'}
              <Leaf class="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            {:else}
              <TreeDeciduous class="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            {/if}
            
            {#if editingNoteId === note.id}
              <input
                type="text"
                bind:value={editingNoteTitle}
                on:keydown={(e) => e.key === 'Enter' && saveRenameNote(note.id)}
                class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"
              />
              <button on:click={() => saveRenameNote(note.id)} class="text-emerald-400 hover:text-white">
                <Check class="w-3.5 h-3.5" />
              </button>
            {:else}
              <span class="truncate">{note.title}</span>
            {/if}
          </div>

          <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              on:click|stopPropagation={() => startRenameNote(note)}
              class="p-1 hover:text-sky-400 transition-colors"
              title="Renombrar nota"
            >
              <Edit2 class="w-3 h-3" />
            </button>
            <button
              on:click|stopPropagation={() => onDeleteNote(note.id)}
              class="p-1 text-garden-muted hover:text-red-400 transition-colors"
              title="Eliminar"
            >
              <Trash2 class="w-3 h-3" />
            </button>
          </div>
        </div>
      {/each}
    </div>

  </div>

</div>

<!-- Create New Folder Modal Dialog -->
{#if showNewFolderModal}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-garden-surface border border-garden-border rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
      <h3 class="text-sm font-bold text-white flex items-center space-x-2">
        <FolderPlus class="w-4 h-4 text-emerald-400" />
        <span>Crear Nueva Categoría / Carpeta</span>
      </h3>

      <input
        type="text"
        bind:value={newFolderName}
        placeholder="Nombre de categoría (ej. 1_Efimeras)"
        class="w-full px-3 py-2 rounded-xl bg-garden-card border border-garden-border text-white text-xs placeholder:text-garden-muted focus:outline-none focus:border-emerald-500"
        on:keydown={(e) => e.key === 'Enter' && handleCreateFolderSubmit()}
      />

      <div class="flex items-center justify-end space-x-2 pt-2">
        <button
          on:click={() => showNewFolderModal = false}
          class="px-3 py-1.5 rounded-lg text-xs text-garden-muted hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          on:click={handleCreateFolderSubmit}
          class="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
        >
          Crear Categoría
        </button>
      </div>
    </div>
  </div>
{/if}
