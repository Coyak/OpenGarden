<script lang="ts">
  import { ArrowRight, Sparkles, Network, FileCode2, Globe, ShieldCheck, Sprout, BookOpen, Layers } from 'lucide-svelte';
</script>

<section class="relative pt-20 pb-16 overflow-hidden">
  <!-- Subtle organic background highlight -->
  <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <!-- Announcement Badge -->
    <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full notion-panel mb-8 hover:border-emerald-500/50 transition-colors cursor-pointer group">
      <Sprout class="w-4 h-4 text-emerald-400" />
      <span class="text-xs sm:text-sm font-medium text-garden-text">
        <span class="text-emerald-400 font-bold">OpenGarden</span> — Zettelkasten & Digital Garden SaaS
      </span>
      <ArrowRight class="w-3.5 h-3.5 text-garden-muted group-hover:translate-x-1 transition-transform" />
    </div>

    <!-- Main Title -->
    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
      Construye tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Jardín Digital de Conocimiento</span> con Zettelkasten.
    </h1>

    <!-- Subtitle -->
    <p class="mt-6 text-base sm:text-lg text-garden-muted max-w-3xl mx-auto font-normal leading-relaxed">
      Escribe en un editor fluido estilo Notion, interconecta notas mediante <code class="text-emerald-400 bg-garden-card px-2 py-0.5 rounded border border-garden-border font-mono">[[wikilinks]]</code> y organiza tu pensamiento en notas Efímeras, de Literatura y Permanentes.
    </p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="/register"
        class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-sm"
      >
        <span>Crear mi Jardín Gratis</span>
        <ArrowRight class="w-4 h-4" />
      </a>

      <a
        href="#zettelkasten"
        class="w-full sm:w-auto px-8 py-3.5 rounded-xl notion-panel text-garden-text font-semibold hover:bg-garden-surface hover:text-white transition-all flex items-center justify-center space-x-2 text-sm"
      >
        <BookOpen class="w-4 h-4 text-emerald-400" />
        <span>Conocer Zettelkasten</span>
      </a>
    </div>

    <!-- Value Props Badges -->
    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
      <div class="p-4 rounded-xl notion-panel">
        <FileCode2 class="w-5 h-5 text-emerald-400 mb-2" />
        <h4 class="font-bold text-white text-sm">Editor Notion-like</h4>
        <p class="text-xs text-garden-muted mt-1">Edición fluida sin pantalla dividida.</p>
      </div>

      <div class="p-4 rounded-xl notion-panel">
        <Layers class="w-5 h-5 text-sky-400 mb-2" />
        <h4 class="font-bold text-white text-sm">Método Zettelkasten</h4>
        <p class="text-xs text-garden-muted mt-1">Notas Efímeras, Literatura y Permanentes.</p>
      </div>

      <div class="p-4 rounded-xl notion-panel">
        <Network class="w-5 h-5 text-purple-400 mb-2" />
        <h4 class="font-bold text-white text-sm">Grafo D3 Interactivo</h4>
        <p class="text-xs text-garden-muted mt-1">Red de conexiones bidireccionales.</p>
      </div>

      <div class="p-4 rounded-xl notion-panel">
        <Globe class="w-5 h-5 text-teal-400 mb-2" />
        <h4 class="font-bold text-white text-sm">URL Pública Personal</h4>
        <p class="text-xs text-garden-muted mt-1">Comparte tu jardín en <code class="text-teal-300">/u/username</code>.</p>
      </div>
    </div>
  </div>
</section>
