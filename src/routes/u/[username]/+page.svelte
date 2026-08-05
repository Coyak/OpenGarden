<script lang="ts">
  import { page } from '$app/stores';
  import { renderMarkdown } from '$lib/utils/markdown';
  import GraphDemo from '$lib/components/landing/GraphDemo.svelte';
  import { 
    Globe, User, Sprout, Leaf, TreeDeciduous, Search, Network, 
    BookOpen, Calendar, ArrowLeft, Share2, BrainCircuit 
  } from 'lucide-svelte';

  const username = $page.params.username || 'demo';

  // Demo public garden profile
  const profile = {
    username: username,
    display_name: `${username.charAt(0).toUpperCase() + username.slice(1)}'s Zettelkasten`,
    bio: 'Investigador de sistemas de pensamiento Zettelkasten, diseño de software y aprendizaje continuo.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    theme: 'obsidian'
  };

  // Demo public notes with Zettelkasten stages
  const publicNotes = [
    {
      id: 'p1',
      title: 'Bienvenido a mi Jardín Digital Zettelkasten',
      slug: 'bienvenido',
      stage: 'evergreen',
      content: `# Bienvenido a mi Jardín Digital Zettelkasten\n\nEste espacio es una colección viva de mis aprendizajes, ensayos y fragmentos de código.\n\n## Exploración recomendada:\n- [[Metodologia Zettelkasten]]\n- [[Arquitectura de Software Abierta]]`,
      updated_at: '2026-08-01'
    },
    {
      id: 'p2',
      title: 'Metodologia Zettelkasten',
      slug: 'metodologia-zettelkasten',
      stage: 'growing',
      content: `# Metodología Zettelkasten\n\nPrincipios de atomización del conocimiento y enlaces bidireccionales.`,
      updated_at: '2026-07-28'
    },
    {
      id: 'p3',
      title: 'Arquitectura de Software Abierta',
      slug: 'arquitectura-de-software-abierta',
      stage: 'evergreen',
      content: `# Arquitectura de Software Abierta\n\nDefinición de patrones SaaS eficientes en SvelteKit y Supabase.`,
      updated_at: '2026-07-25'
    },
    {
      id: 'p4',
      title: 'Idea: Experimentos con D3.js Force',
      slug: 'experimentos-con-d3',
      stage: 'seed',
      content: `# Idea: Experimentos con D3.js Force\n\nApunte sobre simulación física en canvas y SVG para grafos de conocimiento.`,
      updated_at: '2026-08-02'
    }
  ];

  let activeNote = publicNotes[0];
  let filterStage: 'all' | 'seed' | 'growing' | 'evergreen' = 'all';
  let searchQuery = '';

  $: filteredNotes = publicNotes.filter(n => {
    const matchesStage = filterStage === 'all' || n.stage === filterStage;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  $: renderedContent = renderMarkdown(activeNote.content);
</script>

<svelte:head>
  <title>{profile.display_name} | OpenGarden</title>
  <meta name="description" content={profile.bio} />
</svelte:head>

<div class="min-h-screen bg-garden-main pb-20">
  
  <!-- PUBLIC GARDEN HEADER PROFILE BANNER -->
  <section class="border-b border-garden-border/80 bg-garden-surface/30 pt-10 pb-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        
        <!-- Avatar -->
        <div class="relative">
          <img
            src={profile.avatar_url}
            alt={profile.display_name}
            class="w-20 h-20 rounded-2xl border border-garden-border object-cover shadow-xl"
          />
          <span class="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-slate-950 border border-garden-main" title="Jardín Activo">
            <Sprout class="w-3.5 h-3.5" />
          </span>
        </div>

        <!-- Bio & Info -->
        <div class="flex-grow space-y-1">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 class="text-2xl font-extrabold text-white">{profile.display_name}</h1>
            <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 self-center sm:self-auto">
              /u/{profile.username}
            </span>
          </div>
          <p class="text-xs sm:text-sm text-garden-muted max-w-xl">{profile.bio}</p>
        </div>

        <!-- Global Public Stats -->
        <div class="flex items-center space-x-3 bg-garden-surface p-3 rounded-2xl border border-garden-border">
          <div class="text-center px-2">
            <span class="text-lg font-extrabold text-white block">{publicNotes.length}</span>
            <span class="text-[10px] text-garden-muted uppercase tracking-wider font-semibold">Notas</span>
          </div>
          <div class="w-px h-8 bg-garden-border"></div>
          <div class="text-center px-2">
            <span class="text-lg font-extrabold text-emerald-400 block">4</span>
            <span class="text-[10px] text-garden-muted uppercase tracking-wider font-semibold">Conexiones</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- GLOBAL PUBLIC INTERACTIVE GRAPH -->
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-bold text-white flex items-center space-x-2">
        <Network class="w-4 h-4 text-emerald-400" />
        <span>Grafo de Nodos Zettelkasten</span>
      </h2>
      <span class="text-xs text-garden-muted">Visualización pública de notas</span>
    </div>

    <!-- Graph Component -->
    <GraphDemo />
  </section>

  <!-- NOTES EXPLORER & NOTION READER SPLIT -->
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left Column: Public Notes Index -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Filter Controls -->
        <div class="p-4 rounded-2xl notion-panel space-y-3">
          <div class="relative">
            <Search class="w-3.5 h-3.5 text-garden-muted absolute left-3 top-3" />
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Buscar nota pública..."
              class="w-full pl-9 pr-3 py-2 rounded-xl bg-garden-surface border border-garden-border text-xs text-white placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <!-- Maturity Filter Pills -->
          <div class="grid grid-cols-2 gap-1 text-[11px]">
            <button
              on:click={() => filterStage = 'all'}
              class="px-2 py-1.5 rounded-lg font-medium transition-all text-center {filterStage === 'all' ? 'bg-garden-card text-garden-text font-bold border border-garden-border' : 'text-garden-muted hover:text-garden-text'}"
            >
              Todas
            </button>
            <button
              on:click={() => filterStage = 'seed'}
              class="px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 {filterStage === 'seed' ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 dark:border-emerald-500/40' : 'text-garden-muted hover:text-garden-text'}"
            >
              <Sprout class="w-3 h-3 text-emerald-400" />
              <span>Efímeras</span>
            </button>
            <button
              on:click={() => filterStage = 'growing'}
              class="px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 {filterStage === 'growing' ? 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold border border-sky-500/30 dark:border-sky-500/40' : 'text-garden-muted hover:text-garden-text'}"
            >
              <Leaf class="w-3 h-3 text-sky-400" />
              <span>Literatura</span>
            </button>
            <button
              on:click={() => filterStage = 'evergreen'}
              class="px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 {filterStage === 'evergreen' ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30 dark:border-purple-500/40' : 'text-garden-muted hover:text-garden-text'}"
            >
              <TreeDeciduous class="w-3 h-3 text-purple-400" />
              <span>Permanentes</span>
            </button>
          </div>
        </div>

        <!-- Notes List -->
        <div class="space-y-2">
          {#each filteredNotes as note}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              on:click={() => activeNote = note}
              class="p-4 rounded-2xl notion-panel transition-all cursor-pointer {activeNote.id === note.id ? 'border-emerald-500 bg-emerald-950/20 shadow-md' : 'border-garden-border/80 hover:border-garden-muted'}"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white truncate">{note.title}</span>
                {#if note.stage === 'seed'}
                  <Sprout class="w-3.5 h-3.5 text-emerald-400" />
                {:else if note.stage === 'growing'}
                  <Leaf class="w-3.5 h-3.5 text-sky-400" />
                {:else}
                  <TreeDeciduous class="w-3.5 h-3.5 text-purple-400" />
                {/if}
              </div>
              <p class="text-[11px] text-garden-muted truncate mt-1">{note.content.slice(0, 70)}...</p>
              <div class="mt-2 text-[10px] text-garden-muted font-mono flex items-center space-x-1">
                <Calendar class="w-3 h-3" />
                <span>Actualizado: {note.updated_at}</span>
              </div>
            </div>
          {/each}
        </div>

      </div>

      <!-- Right Column: Note Reader Canvas -->
      <div class="lg:col-span-8">
        <div class="p-6 sm:p-8 rounded-3xl notion-panel min-h-[450px]">
          <div class="flex items-center justify-between pb-4 mb-6 border-b border-garden-border">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-xl bg-garden-card border border-garden-border">
                {#if activeNote.stage === 'seed'}
                  <Sprout class="w-5 h-5 text-emerald-400" />
                {:else if activeNote.stage === 'growing'}
                  <Leaf class="w-5 h-5 text-sky-400" />
                {:else}
                  <TreeDeciduous class="w-5 h-5 text-purple-400" />
                {/if}
              </div>
              <div>
                <h2 class="text-xl sm:text-2xl font-extrabold text-white">{activeNote.title}</h2>
                <span class="text-xs text-garden-muted font-mono">/u/{username}/{activeNote.slug}</span>
              </div>
            </div>

            <span class="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {activeNote.stage}
            </span>
          </div>

          <!-- Processed Rendered Content -->
          <div class="prose max-w-none text-garden-text leading-relaxed">
            {@html renderedContent}
          </div>
        </div>
      </div>

    </div>
  </section>

</div>
