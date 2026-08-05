<script lang="ts">
  import FolderTree from '$lib/components/navigation/FolderTree.svelte';
  import NotionEditor from '$lib/components/editor/NotionEditor.svelte';
  import LocalGraph from '$lib/components/graph/LocalGraph.svelte';
  import type { Note, Folder, NoteStage } from '$lib/types/database.types';
  import { extractWikilinks, slugify } from '$lib/utils/wikilinks';
  import { 
    Network, Globe, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, 
    ArrowUpRight, BookOpen, Layers, Plus, Link2 
  } from 'lucide-svelte';

  // Initial state with Zettelkasten folders & notes
  let folders: Folder[] = [
    { id: 'f1', user_id: 'u1', name: '1_Efimeras', parent_id: null, created_at: new Date().toISOString() },
    { id: 'f2', user_id: 'u1', name: '2_Literatura', parent_id: null, created_at: new Date().toISOString() },
    { id: 'f3', user_id: 'u1', name: '3_Permanentes', parent_id: null, created_at: new Date().toISOString() }
  ];

  let notes: Note[] = [
    {
      id: 'n1',
      user_id: 'u1',
      folder_id: 'f3',
      title: 'Bienvenido a tu Zettelkasten Digital',
      slug: 'bienvenido-a-tu-zettelkasten-digital',
      content: `# Bienvenido a tu Zettelkasten Digital\n\nEste es tu espacio no lineal estilo Notion para cultivar conocimiento.\n\n## Principios Zettelkasten:\n- Registra ideas rápidas como **Notas Efímeras**.\n- Resume fuentes externas en **Notas de Literatura** como [[Metodologia Zettelkasten]].\n- Enlaza síntesis autónomas mediante **Notas Permanentes** usando [[wikilinks]].\n\n## Conceptos Enlazados:\n- [[Metodologia Zettelkasten]]\n- [[Idea: Grafos D3 con SvelteKit]]`,
      stage: 'evergreen',
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'n2',
      user_id: 'u1',
      folder_id: 'f2',
      title: 'Metodologia Zettelkasten',
      slug: 'metodologia-zettelkasten',
      content: `# Metodología Zettelkasten\n\nEl sistema de fichas creado por Niklas Luhmann que inspiró el flujo de enlaces bidireccionales.\n\n- Cada nota debe ser atómica (una sola idea).\n- Enlaza conceptos clave como [[Bienvenido a tu Zettelkasten Digital]].`,
      stage: 'growing',
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'n3',
      user_id: 'u1',
      folder_id: 'f1',
      title: 'Idea: Grafos D3 con SvelteKit',
      slug: 'idea-grafos-d3-con-sveltekit',
      content: `# Idea: Grafos D3 con SvelteKit\n\nApunte rápido sobre el renderizado de force simulation usando SVGs reactivos y d3.drag() para interactividad tipo Obsidian.\n\nRelacionado con [[Bienvenido a tu Zettelkasten Digital]].`,
      stage: 'seed',
      is_public: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  let activeNoteId: string = 'n1';
  let isSidebarOpen: boolean = true;
  let isRightPanelOpen: boolean = true;
  let inspectorTab: 'graph' | 'backlinks' = 'graph';

  // Resizable Sidebars state variables & event handlers
  let sidebarWidth = 280;
  let rightPanelWidth = 320;
  let isResizingLeft = false;
  let isResizingRight = false;

  function startResizingLeft(event: MouseEvent) {
    event.preventDefault();
    isResizingLeft = true;
  }

  function startResizingRight(event: MouseEvent) {
    event.preventDefault();
    isResizingRight = true;
  }

  function handleMouseMove(event: MouseEvent) {
    if (isResizingLeft) {
      sidebarWidth = Math.max(180, Math.min(450, event.clientX));
    } else if (isResizingRight) {
      const w = window.innerWidth - event.clientX;
      rightPanelWidth = Math.max(200, Math.min(500, w));
    }
  }

  function stopResizing() {
    isResizingLeft = false;
    isResizingRight = false;
  }

  $: activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  $: extractedLinks = activeNote ? extractWikilinks(activeNote.content) : [];
  $: backlinks = activeNote 
    ? notes.filter(n => n.id !== activeNote.id && n.content.toLowerCase().includes(activeNote.title.toLowerCase()))
    : [];

  function handleSelectNote(id: string) {
    activeNoteId = id;
  }

  // Navigate directly when clicking [[wikilinks]]
  function handleNavigateToSlug(targetSlug: string) {
    const found = notes.find(n => n.slug === targetSlug || slugify(n.title) === targetSlug);
    if (found) {
      activeNoteId = found.id;
    } else {
      // Create new target note automatically if it doesn't exist
      const newTitle = targetSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const newId = `n_${Date.now()}`;
      const newNote: Note = {
        id: newId,
        user_id: 'u1',
        folder_id: 'f1',
        title: newTitle,
        slug: targetSlug,
        content: `# ${newTitle}\n\nNota creada automáticamente al pulsar [[${newTitle}]].`,
        stage: 'seed',
        is_public: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      notes = [newNote, ...notes];
      activeNoteId = newId;
    }
  }

  function handleCreateNote(folderId?: string, stage?: NoteStage) {
    const newId = `n_${Date.now()}`;
    const newNote: Note = {
      id: newId,
      user_id: 'u1',
      folder_id: folderId || 'f1',
      title: 'Nueva Nota Zettelkasten',
      slug: `nueva-nota-${Date.now().toString().slice(-4)}`,
      content: `# Nueva Nota\n\nEscribe tus ideas aquí y conecta otros conceptos usando [[Nombre de Nota]].`,
      stage: stage || 'seed',
      is_public: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    notes = [newNote, ...notes];
    activeNoteId = newId;
  }

  function handleCreateFolder(name: string, parentId?: string | null) {
    const newFolder: Folder = {
      id: `f_${Date.now()}`,
      user_id: 'u1',
      name,
      parent_id: parentId || null,
      created_at: new Date().toISOString()
    };
    folders = [...folders, newFolder];
  }

  function handleDeleteNote(id: string) {
    notes = notes.filter(n => n.id !== id);
    if (activeNoteId === id && notes.length > 0) {
      activeNoteId = notes[0].id;
    }
  }

  function handleUpdateNote(updatedNote: Note) {
    notes = notes.map(n => n.id === updatedNote.id ? { ...updatedNote } : n);
  }

  // Drag & Drop Note Re-parenting Handler with instant reactivity
  function handleMoveNoteToFolder(noteId: string, targetFolderId: string | null) {
    notes = notes.map(n => n.id === noteId ? { ...n, folder_id: targetFolderId } : n);
  }

  // Renaming Handlers
  function handleRenameFolder(folderId: string, newName: string) {
    folders = folders.map(f => f.id === folderId ? { ...f, name: newName } : f);
  }

  function handleRenameNote(noteId: string, newTitle: string) {
    notes = notes.map(n => n.id === noteId ? { ...n, title: newTitle, slug: slugify(newTitle) } : n);
  }
</script>

<svelte:head>
  <title>Dashboard Zettelkasten | OpenGarden</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={stopResizing} />

<div class="h-[calc(100vh-4.1rem)] flex overflow-hidden bg-garden-main select-none">
  
  <!-- LEFT SIDEBAR: Nested Folder Tree with Drag and Drop -->
  <aside 
    style="width: {isSidebarOpen ? sidebarWidth : 0}px"
    class="transition-[opacity] duration-300 glass-panel border-r border-garden-border flex flex-col flex-shrink-0 relative z-20 {!isSidebarOpen ? 'opacity-0 overflow-hidden' : ''}"
  >
    <div class="flex-grow overflow-hidden select-text">
      <FolderTree
        {folders}
        {notes}
        {activeNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onCreateFolder={handleCreateFolder}
        onDeleteNote={handleDeleteNote}
        onMoveNoteToFolder={handleMoveNoteToFolder}
        onRenameFolder={handleRenameFolder}
        onRenameNote={handleRenameNote}
      />
    </div>

    <!-- Sidebar Footer -->
    <div class="p-3 border-t border-garden-border/60 text-xs text-garden-muted flex items-center justify-between">
      <a href="/u/demo" target="_blank" class="hover:text-emerald-400 flex items-center space-x-1 transition-colors font-medium">
        <Globe class="w-3.5 h-3.5 text-emerald-400" />
        <span>Jardín Público</span>
        <ArrowUpRight class="w-3 h-3" />
      </a>

      <button
        on:click={() => isSidebarOpen = false}
        class="p-1 rounded hover:bg-garden-surface text-garden-muted hover:text-garden-text"
        title="Ocultar Sidebar"
      >
        <PanelLeftClose class="w-4 h-4" />
      </button>
    </div>
  </aside>

  <!-- Left Sidebar Resizer Splitter -->
  {#if isSidebarOpen}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      on:mousedown={startResizingLeft}
      class="w-[3px] hover:w-[6px] cursor-col-resize hover:bg-emerald-500/40 bg-garden-border/40 transition-all flex-shrink-0 z-30 select-none"
      title="Arrastra para cambiar el tamaño"
    ></div>
  {/if}

  <!-- CENTER CANVAS: Notion Live Markdown Editor -->
  <main class="flex-grow flex flex-col min-w-0 bg-garden-main relative select-text">
    
    <!-- Floating Show Sidebar Button -->
    {#if !isSidebarOpen}
      <button
        on:click={() => isSidebarOpen = true}
        class="absolute top-2.5 left-3 z-30 p-1.5 rounded-xl glass-panel border border-garden-border text-garden-muted hover:text-garden-text hover:border-emerald-500/40 transition-colors shadow-md"
        title="Mostrar Barra Lateral"
      >
        <PanelLeftOpen class="w-4 h-4 text-emerald-400" />
      </button>
    {/if}

    {#if activeNote}
      <NotionEditor
        note={activeNote}
        allNotes={notes}
        {isRightPanelOpen}
        onToggleRightPanel={() => isRightPanelOpen = !isRightPanelOpen}
        onUpdateNote={handleUpdateNote}
        onNavigateToSlug={handleNavigateToSlug}
      />
    {/if}
  </main>

  <!-- Right Sidebar Resizer Splitter -->
  {#if isRightPanelOpen}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      on:mousedown={startResizingRight}
      class="w-[3px] hover:w-[6px] cursor-col-resize hover:bg-emerald-500/40 bg-garden-border/40 transition-all flex-shrink-0 z-30 select-none"
      title="Arrastra para cambiar el tamaño"
    ></div>
  {/if}

  <!-- RIGHT PANEL: Local Graph vs Backlinks Tabs -->
  <aside 
    style="width: {isRightPanelOpen ? rightPanelWidth : 0}px"
    class="transition-[opacity] duration-300 glass-panel border-l border-garden-border flex flex-col flex-shrink-0 relative {!isRightPanelOpen ? 'opacity-0 overflow-hidden' : ''}"
  >
    
    <!-- Panel Header with Tab Switcher & Hide Button -->
    <div class="p-3 border-b border-garden-border/60 flex items-center justify-between">
      <div class="flex items-center bg-garden-surface p-0.5 rounded-lg border border-garden-border text-xs">
        <button
          on:click={() => inspectorTab = 'graph'}
          class="px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 {inspectorTab === 'graph' ? 'bg-garden-card text-garden-text font-bold' : 'text-garden-muted hover:text-garden-text'}"
        >
          <Network class="w-3.5 h-3.5 text-emerald-400" />
          <span>Grafo Local</span>
        </button>

        <button
          on:click={() => inspectorTab = 'backlinks'}
          class="px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 {inspectorTab === 'backlinks' ? 'bg-garden-card text-garden-text font-bold' : 'text-garden-muted hover:text-garden-text'}"
        >
          <Link2 class="w-3.5 h-3.5 text-sky-400" />
          <span>Menciones ({backlinks.length})</span>
        </button>
      </div>

      <button
        on:click={() => isRightPanelOpen = false}
        class="p-1 rounded hover:bg-garden-surface text-garden-muted hover:text-garden-text transition-colors"
        title="Ocultar Panel"
      >
        <PanelRightClose class="w-4 h-4" />
      </button>
    </div>

    <div class="p-4 space-y-6 overflow-y-auto flex-grow select-text">
      
      <!-- TAB 1: Local Interactive Graph -->
      {#if inspectorTab === 'graph'}
        <div class="space-y-4">
          <div class="text-xs font-bold text-white flex items-center justify-between">
            <span>Vista de Nodos Enlazados</span>
            <span class="text-[10px] text-garden-muted font-mono">Arrastra para mover</span>
          </div>

          {#if activeNote}
            <LocalGraph activeNote={activeNote} allNotes={notes} />
          {/if}

          <!-- Outgoing Wikilinks List with Click Navigation -->
          <div>
            <h4 class="text-xs font-bold text-white mb-2 flex items-center justify-between">
              <span>Enlaces Salientes</span>
              <span class="text-[10px] bg-garden-surface px-1.5 py-0.5 rounded text-emerald-400 font-mono">{extractedLinks.length}</span>
            </h4>
            {#if extractedLinks.length === 0}
              <p class="text-xs text-garden-muted/70 italic">No hay wikilinks en este documento.</p>
            {:else}
              <div class="space-y-1">
                {#each extractedLinks as link}
                  <button
                    on:click={() => handleNavigateToSlug(link.slug)}
                    class="w-full text-left p-2 rounded-lg bg-garden-surface/80 hover:bg-garden-card border border-garden-border/60 text-xs text-emerald-300 font-medium flex items-center justify-between transition-colors"
                  >
                    <span class="truncate"><span class="text-emerald-400 font-mono">[[</span>{link.displayTitle}<span class="text-emerald-400 font-mono">]]</span></span>
                    <span class="text-[10px] text-garden-muted">Ir →</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>

      <!-- TAB 2: Backlinks & Mentions -->
      {:else}
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white flex items-center justify-between">
            <span>Notas que citan esta página</span>
            <span class="text-[10px] bg-garden-surface px-1.5 py-0.5 rounded text-sky-400 font-mono">{backlinks.length}</span>
          </h4>

          {#if backlinks.length === 0}
            <div class="p-4 rounded-xl bg-garden-surface/40 border border-garden-border/60 text-center space-y-2">
              <Link2 class="w-6 h-6 text-garden-muted/60 mx-auto" />
              <p class="text-xs text-garden-muted">Ninguna otra nota menciona esta página aún.</p>
              <p class="text-[11px] text-garden-muted/60">Usa <code class="text-emerald-400">[[{activeNote.title}]]</code> en otros documentos para conectarlas.</p>
            </div>
          {:else}
            <div class="space-y-2">
              {#each backlinks as backlink}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                  on:click={() => handleSelectNote(backlink.id)}
                  class="p-3 rounded-xl bg-garden-surface hover:bg-garden-card border border-garden-border text-xs cursor-pointer transition-colors space-y-1"
                >
                  <div class="font-bold text-white flex items-center justify-between">
                    <span>{backlink.title}</span>
                    <span class="text-[10px] text-emerald-400">Ver →</span>
                  </div>
                  <p class="text-[11px] text-garden-muted truncate">{backlink.content.slice(0, 70)}...</p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

    </div>
  </aside>

</div>
