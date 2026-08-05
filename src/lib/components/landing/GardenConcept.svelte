<script lang="ts">
  import { Sprout, Leaf, TreeDeciduous, BookOpen, Layers, GitMerge, FileText, ArrowRight, BrainCircuit } from 'lucide-svelte';

  let activeTab: 'seed' | 'growing' | 'evergreen' = 'growing';

  const zettelkastenStages = {
    seed: {
      title: 'Nota Efímera (Fleeting Note)',
      icon: Sprout,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      subtitle: 'Captura rápida de pensamientos e ideas iniciales',
      desc: 'Las notas efímeras son apuntes informales que registras al momento cuando surge una idea. No requieren estructura pulida, sino capturar el concepto antes de que se olvide.',
      exampleContent: '# Idea: Simulación de Grafos Zettelkasten\n- Conectar [[Notas de Literatura]] con [[Notas Permanentes]].\n- Investigar algoritmos de fuerza en D3.js.'
    },
    growing: {
      title: 'Nota de Literatura (Literature Note)',
      icon: Leaf,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      subtitle: 'Resúmenes y citas de libros, artículos o podcasts',
      desc: 'Las notas de literatura contienen síntesis de contenido externo redactadas con tus propias palabras, citando fuentes y enlazando los temas a tu base de conocimientos.',
      exampleContent: '# Resumen: How to Take Smart Notes (Ahrens)\nLa metodología [[Zettelkasten]] sostiene que el pensamiento no ocurre en la cabeza, sino en el papel o sistema digital.\n\n## Puntos Clave:\n1. Notas atómicas\n2. Enlaces bidireccionales con [[wikilinks]]\n3. Revisión continua'
    },
    evergreen: {
      title: 'Nota Permanente (Permanent Note)',
      icon: TreeDeciduous,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      subtitle: 'Conocimiento atómico, maduro e interconectado',
      desc: 'Las notas permanentes son ensayos y síntesis atómicas autónomas. Cada nota contiene una sola idea completa que vive de manera atemporal en tu mapa de conocimiento.',
      exampleContent: '# Manifiesto del Conocimiento Atómico\nLas notas permanentes son los bloques fundamentales de un [[Second Brain]]. A diferencia de una publicación en un blog tradicional, una nota permanente no caduca con el tiempo.\n\nVer también: [[Arquitectura del Conocimiento]], [[Redes Neuronales de Aprendizaje]].'
    }
  };
</script>

<section id="zettelkasten" class="py-20 relative bg-garden-surface/30 border-y border-garden-border/60 scroll-mt-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
        <BrainCircuit class="w-3.5 h-3.5" />
        <span>Metodología de Aprendizaje</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Introducción al Sistema Zettelkasten</h2>
      <p class="mt-4 text-garden-muted text-sm sm:text-base leading-relaxed">
        El sistema **Zettelkasten** (creado por el sociólogo Niklas Luhmann) transforma notas sueltas en una red interconectada de pensamiento. En OpenGarden organizas tu conocimiento en 3 etapas fundamentales:
      </p>
    </div>

    <!-- Zettelkasten 3-Tier Grid Explanation -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Tier 1: Fleeting -->
      <div class="p-6 rounded-2xl notion-panel border border-emerald-500/30 space-y-3">
        <div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20">
          <Sprout class="w-5 h-5" />
        </div>
        <h3 class="text-base font-bold text-white">1. Notas Efímeras</h3>
        <p class="text-xs text-garden-muted leading-relaxed">
          Pensamientos rápidos y semillas de ideas. Sirven como materia prima para procesar más adelante.
        </p>
        <div class="pt-2 text-[11px] font-mono text-emerald-400">
          Etapa: Fleeting Note
        </div>
      </div>

      <!-- Tier 2: Literature -->
      <div class="p-6 rounded-2xl notion-panel border border-sky-500/30 space-y-3">
        <div class="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 w-fit border border-sky-500/20">
          <Leaf class="w-5 h-5" />
        </div>
        <h3 class="text-base font-bold text-white">2. Notas de Literatura</h3>
        <p class="text-xs text-garden-muted leading-relaxed">
          Resúmenes y conceptos extraídos de lecturas, libros o podcasts explicados en tus palabras.
        </p>
        <div class="pt-2 text-[11px] font-mono text-sky-400">
          Etapa: Literature Note
        </div>
      </div>

      <!-- Tier 3: Permanent -->
      <div class="p-6 rounded-2xl notion-panel border border-purple-500/30 space-y-3">
        <div class="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit border border-purple-500/20">
          <TreeDeciduous class="w-5 h-5" />
        </div>
        <h3 class="text-base font-bold text-white">3. Notas Permanentes</h3>
        <p class="text-xs text-garden-muted leading-relaxed">
          Síntesis atómicas atemporales que se conectan mediante <code class="text-purple-300">[[wikilinks]]</code> para formar tu mapa mental.
        </p>
        <div class="pt-2 text-[11px] font-mono text-purple-400">
          Etapa: Permanent Note
        </div>
      </div>

    </div>

    <!-- Interactive Stage Simulator -->
    <div class="mt-14 p-6 sm:p-8 rounded-2xl notion-panel">
      <div class="text-center mb-6">
        <h3 class="text-lg font-bold text-white">Explora el ciclo de vida de una Nota Zettelkasten</h3>
        <p class="text-xs text-garden-muted mt-1">Haz clic para ver la estructura de cada tipo de nota en el editor</p>
      </div>

      <!-- Stage Switcher Tabs -->
      <div class="flex justify-center space-x-2 sm:space-x-4 mb-8">
        <button
          on:click={() => activeTab = 'seed'}
          class="px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border {activeTab === 'seed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md' : 'bg-garden-surface text-garden-muted border-garden-border hover:border-garden-muted'}"
        >
          <Sprout class="w-4 h-4 text-emerald-400" />
          <span>Notas Efímeras</span>
        </button>

        <button
          on:click={() => activeTab = 'growing'}
          class="px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border {activeTab === 'growing' ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-md' : 'bg-garden-surface text-garden-muted border-garden-border hover:border-garden-muted'}"
        >
          <Leaf class="w-4 h-4 text-sky-400" />
          <span>Notas de Literatura</span>
        </button>

        <button
          on:click={() => activeTab = 'evergreen'}
          class="px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border {activeTab === 'evergreen' ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md' : 'bg-garden-surface text-garden-muted border-garden-border hover:border-garden-muted'}"
        >
          <TreeDeciduous class="w-4 h-4 text-purple-400" />
          <span>Notas Permanentes</span>
        </button>
      </div>

      <!-- Stage Preview Box -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div class="p-6 rounded-xl bg-garden-surface/80 border {zettelkastenStages[activeTab].borderColor}">
          <div class="flex items-center space-x-2 mb-2">
            <svelte:component this={zettelkastenStages[activeTab].icon} class="w-5 h-5 {zettelkastenStages[activeTab].color}" />
            <h4 class="text-base font-bold text-white">{zettelkastenStages[activeTab].title}</h4>
          </div>
          <p class="text-xs text-garden-muted font-mono mb-3">{zettelkastenStages[activeTab].subtitle}</p>
          <p class="text-xs text-garden-text/90 leading-relaxed">
            {zettelkastenStages[activeTab].desc}
          </p>
        </div>

        <div class="p-5 rounded-xl bg-garden-surface/80 border border-garden-border font-mono text-xs text-garden-text leading-relaxed overflow-x-auto">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-garden-border text-garden-muted text-[11px]">
            <span>Vista de Documento Notion</span>
            <span class="text-emerald-400 font-sans font-medium">Contenido Markdown</span>
          </div>
          <pre class="whitespace-pre-wrap">{zettelkastenStages[activeTab].exampleContent}</pre>
        </div>
      </div>
    </div>

  </div>
</section>
