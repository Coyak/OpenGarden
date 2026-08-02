<script lang="ts">
  import { 
    ArrowRight, Check, FolderTree, Sprout, Leaf, TreeDeciduous, 
    BookOpen, Code2, Sparkles, FileText, ChevronRight, BrainCircuit 
  } from 'lucide-svelte';

  let currentStep = 1;
  let selectedPreset = 'zettelkasten';
  let isGenerating = false;

  const presets = [
    {
      id: 'zettelkasten',
      title: 'Método Zettelkasten',
      icon: BrainCircuit,
      color: 'text-emerald-400',
      desc: 'Estructurado en 1_Efimeras (captura rápida), 2_Literatura (resúmenes) y 3_Permanentes (síntesis atómicas).',
      folders: ['📁 1_Efimeras', '📁 2_Literatura', '📁 3_Permanentes']
    },
    {
      id: 'para',
      title: 'Método PARA',
      icon: FolderTree,
      color: 'text-sky-400',
      desc: 'Organiza por Proyectos (activos), Áreas (responsabilidades), Recursos (intereses) y Archivo.',
      folders: ['📁 1_Proyectos', '📁 2_Areas', '📁 3_Recursos', '📁 4_Archivo']
    },
    {
      id: 'student',
      title: 'Estudiante & Investigación',
      icon: BookOpen,
      color: 'text-purple-400',
      desc: 'Ideal para tomar apuntes de clases, resúmenes de libros, fichas bibliográficas y papers.',
      folders: ['📁 Asignaturas', '📁 Resúmenes_Libros', '📁 Investigacion']
    },
    {
      id: 'developer',
      title: 'Software Developer',
      icon: Code2,
      color: 'text-teal-400',
      desc: 'Pensado para guardar snippets de código, arquitectura de sistemas, TIL y proyectos dev.',
      folders: ['📁 Snippets', '📁 Arquitectura', '📁 Proyectos_Dev']
    }
  ];

  function finishOnboarding() {
    isGenerating = true;
    setTimeout(() => {
      window.location.href = '/app';
    }, 1000);
  }
</script>

<svelte:head>
  <title>Onboarding Zettelkasten | OpenGarden</title>
</svelte:head>

<div class="min-h-[85vh] flex items-center justify-center px-4 py-10">
  <div class="w-full max-w-2xl p-8 rounded-3xl notion-panel shadow-2xl relative">
    
    <!-- Wizard Progress Bar -->
    <div class="flex items-center justify-between mb-8 pb-6 border-b border-garden-border/60">
      <div class="flex items-center space-x-3">
        <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
          {currentStep}
        </span>
        <div>
          <h2 class="text-sm font-bold text-white">Configuración del Jardín Digital</h2>
          <p class="text-[11px] text-garden-muted">Paso {currentStep} de 3</p>
        </div>
      </div>

      <button
        on:click={finishOnboarding}
        class="text-xs text-garden-muted hover:text-white transition-colors underline"
      >
        Saltar Wizard
      </button>
    </div>

    <!-- STEP 1: Zettelkasten Concept -->
    {#if currentStep === 1}
      <div class="space-y-6 animate-in fade-in slide-in-from-right-4">
        <div class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <BrainCircuit class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-white">Metodología Zettelkasten</h3>
          <p class="text-xs text-garden-muted mt-1 max-w-md mx-auto">
            En OpenGarden organizas tu pensamiento en tres categorías de madurez sin depender de listas cronológicas.
          </p>
        </div>

        <div class="space-y-3">
          <div class="p-4 rounded-xl notion-panel border border-emerald-500/30 flex items-start space-x-3">
            <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Sprout class="w-4 h-4" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-emerald-400">Notas Efímeras (Fleeting Notes)</h4>
              <p class="text-xs text-garden-muted mt-0.5">Captura rápida de ideas, fragmentos y pensamientos informales.</p>
            </div>
          </div>

          <div class="p-4 rounded-xl notion-panel border border-sky-500/30 flex items-start space-x-3">
            <div class="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Leaf class="w-4 h-4" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-sky-400">Notas de Literatura (Literature Notes)</h4>
              <p class="text-xs text-garden-muted mt-0.5">Resúmenes de lecturas y citas explicadas en tus propias palabras.</p>
            </div>
          </div>

          <div class="p-4 rounded-xl notion-panel border border-purple-500/30 flex items-start space-x-3">
            <div class="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <TreeDeciduous class="w-4 h-4" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-purple-400">Notas Permanentes (Permanent Notes)</h4>
              <p class="text-xs text-garden-muted mt-0.5">Síntesis atómicas y conceptos interconectados con [[wikilinks]].</p>
            </div>
          </div>
        </div>

        <button
          on:click={() => currentStep = 2}
          class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Seleccionar Preset de Carpetas</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

    <!-- STEP 2: Presets -->
    {:else if currentStep === 2}
      <div class="space-y-6 animate-in fade-in slide-in-from-right-4">
        <div class="text-center">
          <h3 class="text-xl font-bold text-white">Elige tu Preset Inicial</h3>
          <p class="text-xs text-garden-muted mt-1">
            Crearemos la estructura de carpetas inicial en tu navegador de archivos.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each presets as preset}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              on:click={() => selectedPreset = preset.id}
              class="p-4 rounded-2xl notion-panel transition-all cursor-pointer relative flex flex-col justify-between {selectedPreset === preset.id ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500' : 'border-garden-border hover:border-garden-muted'}"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-xs text-white flex items-center space-x-2">
                    <svelte:component this={preset.icon} class="w-4 h-4 {preset.color}" />
                    <span>{preset.title}</span>
                  </span>
                  {#if selectedPreset === preset.id}
                    <Check class="w-4 h-4 text-emerald-400" />
                  {/if}
                </div>
                <p class="text-[11px] text-garden-muted leading-relaxed mb-3">{preset.desc}</p>
              </div>

              <div class="flex flex-wrap gap-1">
                {#each preset.folders as folder}
                  <span class="text-[10px] bg-garden-surface px-2 py-0.5 rounded border border-garden-border text-garden-muted font-mono">
                    {folder}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <div class="flex items-center space-x-3 pt-2">
          <button
            on:click={() => currentStep = 1}
            class="w-1/3 py-3 rounded-xl notion-panel text-garden-muted hover:text-white text-xs font-semibold"
          >
            Atrás
          </button>
          <button
            on:click={() => currentStep = 3}
            class="w-2/3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-2"
          >
            <span>Generar Espacio Notion</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>

    <!-- STEP 3: Ready -->
    {:else if currentStep === 3}
      <div class="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
          <Sprout class="w-8 h-8 text-emerald-400" />
        </div>

        <div>
          <h3 class="text-2xl font-extrabold text-white">¡Todo listo para redactar!</h3>
          <p class="text-xs text-garden-muted mt-2 max-w-md mx-auto">
            Hemos preparado tu nota inicial interactiva con el preset <strong class="text-emerald-400">{selectedPreset.toUpperCase()}</strong>.
          </p>
        </div>

        <button
          on:click={finishOnboarding}
          disabled={isGenerating}
          class="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-xl flex items-center justify-center space-x-2"
        >
          {#if isGenerating}
            <span>Abriendo Editor Notion...</span>
          {:else}
            <span>Entrar al Dashboard</span>
            <ArrowRight class="w-4 h-4" />
          {/if}
        </button>
      </div>
    {/if}

  </div>
</div>
