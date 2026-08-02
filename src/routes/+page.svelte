<script lang="ts">
  import Hero from '$lib/components/landing/Hero.svelte';
  import GraphDemo from '$lib/components/landing/GraphDemo.svelte';
  import GardenConcept from '$lib/components/landing/GardenConcept.svelte';
  import { ArrowRight, Sparkles, BookOpen, Network, Layers } from 'lucide-svelte';
</script>

<svelte:head>
  <title>OpenGarden | Tu Jardín Digital Zettelkasten estilo Notion</title>
  <meta name="description" content="OpenGarden es la plataforma SaaS para crear notas Zettelkasten, enlazarlas con [[wikilinks]] y publicar tu jardín digital personal." />
</svelte:head>

<div class="space-y-12">
  <!-- Hero Section -->
  <Hero />

  <!-- Zettelkasten Concept & Methodology Section -->
  <section id="zettelkasten" class="scroll-mt-16">
    <GardenConcept />
  </section>

  <!-- Interactive Graph Demo Section -->
  <section id="demo" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-16">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
        <Network class="w-3.5 h-3.5" />
        <span>Red de Conocimiento D3</span>
      </div>
      <h2 class="text-3xl font-extrabold text-white">Grafo Interactivo Zettelkasten</h2>
      <p class="text-garden-muted text-xs sm:text-sm mt-2">
        Pasa el cursor sobre los nodos para inspeccionar las conexiones bidireccionales entre tus notas.
      </p>
    </div>

    <!-- D3 Interactive Graph Component -->
    <GraphDemo />
  </section>

  <!-- Final CTA Banner -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div class="relative rounded-3xl p-8 sm:p-12 notion-panel border border-emerald-500/30 overflow-hidden text-center shadow-2xl">
      <div class="relative z-10 max-w-2xl mx-auto space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <BookOpen class="w-6 h-6" />
        </div>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Comienza a cultivar tu Zettelkasten hoy</h2>
        <p class="text-garden-muted text-xs sm:text-sm">
          Elige entre presets como PARA, Zettelkasten o Dev y comparte tu jardín público en <code class="text-emerald-400">/u/tu-usuario</code>.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/onboarding"
            class="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            <Sparkles class="w-4 h-4" />
            <span>Probar Wizard de Onboarding</span>
          </a>

          <a
            href="/register"
            class="px-8 py-3.5 rounded-xl notion-panel text-white hover:bg-garden-surface transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold"
          >
            <span>Crear Cuenta Gratis</span>
            <ArrowRight class="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </div>
  </section>
</div>
