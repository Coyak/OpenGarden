import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component } from "../../chunks/ssr.js";
import { S as Sprout } from "../../chunks/sprout.js";
import { A as Arrow_right } from "../../chunks/arrow-right.js";
import { B as Book_open } from "../../chunks/book-open.js";
import { I as Icon } from "../../chunks/Icon.js";
import { N as Network } from "../../chunks/network.js";
import { G as Globe } from "../../chunks/globe.js";
import { G as GraphDemo } from "../../chunks/GraphDemo.js";
import { B as Brain_circuit } from "../../chunks/brain-circuit.js";
import { L as Leaf, T as Tree_deciduous } from "../../chunks/tree-deciduous.js";
const File_code_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { "d": "m5 12-3 3 3 3" }],
    ["path", { "d": "m9 18 3-3-3-3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file-code-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Layers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
      }
    ],
    [
      "path",
      {
        "d": "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
      }
    ],
    [
      "path",
      {
        "d": "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "layers" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Sparkles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
      }
    ],
    ["path", { "d": "M5 3v4" }],
    ["path", { "d": "M19 17v4" }],
    ["path", { "d": "M3 5h4" }],
    ["path", { "d": "M17 19h4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sparkles" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="relative pt-20 pb-16 overflow-hidden"> <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"> <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full notion-panel mb-8 hover:border-emerald-500/50 transition-colors cursor-pointer group">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span class="text-xs sm:text-sm font-medium text-garden-text" data-svelte-h="svelte-12f9u8q"><span class="text-emerald-400 font-bold">OpenGarden</span> — Zettelkasten &amp; Digital Garden SaaS</span> ${validate_component(Arrow_right, "ArrowRight").$$render(
    $$result,
    {
      class: "w-3.5 h-3.5 text-garden-muted group-hover:translate-x-1 transition-transform"
    },
    {},
    {}
  )}</div>  <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]" data-svelte-h="svelte-iz2sqh">Construye tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Jardín Digital de Conocimiento</span> con Zettelkasten.</h1>  <p class="mt-6 text-base sm:text-lg text-garden-muted max-w-3xl mx-auto font-normal leading-relaxed" data-svelte-h="svelte-pjs8x3">Escribe en un editor fluido estilo Notion, interconecta notas mediante <code class="text-emerald-400 bg-garden-card px-2 py-0.5 rounded border border-garden-border font-mono">[[wikilinks]]</code> y organiza tu pensamiento en notas Efímeras, de Literatura y Permanentes.</p>  <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"><a href="/register" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-sm"><span data-svelte-h="svelte-1gdr7ax">Crear mi Jardín Gratis</span> ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a> <a href="#zettelkasten" class="w-full sm:w-auto px-8 py-3.5 rounded-xl notion-panel text-garden-text font-semibold hover:bg-garden-surface hover:text-white transition-all flex items-center justify-center space-x-2 text-sm">${validate_component(Book_open, "BookOpen").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-shyzc5">Conocer Zettelkasten</span></a></div>  <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left"><div class="p-4 rounded-xl notion-panel">${validate_component(File_code_2, "FileCode2").$$render($$result, { class: "w-5 h-5 text-emerald-400 mb-2" }, {}, {})} <h4 class="font-bold text-white text-sm" data-svelte-h="svelte-31o1db">Editor Notion-like</h4> <p class="text-xs text-garden-muted mt-1" data-svelte-h="svelte-xbkk7n">Edición fluida sin pantalla dividida.</p></div> <div class="p-4 rounded-xl notion-panel">${validate_component(Layers, "Layers").$$render($$result, { class: "w-5 h-5 text-sky-400 mb-2" }, {}, {})} <h4 class="font-bold text-white text-sm" data-svelte-h="svelte-1abu4k3">Método Zettelkasten</h4> <p class="text-xs text-garden-muted mt-1" data-svelte-h="svelte-zdx65">Notas Efímeras, Literatura y Permanentes.</p></div> <div class="p-4 rounded-xl notion-panel">${validate_component(Network, "Network").$$render($$result, { class: "w-5 h-5 text-purple-400 mb-2" }, {}, {})} <h4 class="font-bold text-white text-sm" data-svelte-h="svelte-174djif">Grafo D3 Interactivo</h4> <p class="text-xs text-garden-muted mt-1" data-svelte-h="svelte-e9acd7">Red de conexiones bidireccionales.</p></div> <div class="p-4 rounded-xl notion-panel">${validate_component(Globe, "Globe").$$render($$result, { class: "w-5 h-5 text-teal-400 mb-2" }, {}, {})} <h4 class="font-bold text-white text-sm" data-svelte-h="svelte-izjh0r">URL Pública Personal</h4> <p class="text-xs text-garden-muted mt-1" data-svelte-h="svelte-1pxw2r6">Comparte tu jardín en <code class="text-teal-300">/u/username</code>.</p></div></div></div></section>`;
});
const GardenConcept = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeTab = "growing";
  const zettelkastenStages = {
    seed: {
      title: "Nota Efímera (Fleeting Note)",
      icon: Sprout,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      subtitle: "Captura rápida de pensamientos e ideas iniciales",
      desc: "Las notas efímeras son apuntes informales que registras al momento cuando surge una idea. No requieren estructura pulida, sino capturar el concepto antes de que se olvide.",
      exampleContent: "# Idea: Simulación de Grafos Zettelkasten\n- Conectar [[Notas de Literatura]] con [[Notas Permanentes]].\n- Investigar algoritmos de fuerza en D3.js."
    },
    growing: {
      title: "Nota de Literatura (Literature Note)",
      icon: Leaf,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/30",
      subtitle: "Resúmenes y citas de libros, artículos o podcasts",
      desc: "Las notas de literatura contienen síntesis de contenido externo redactadas con tus propias palabras, citando fuentes y enlazando los temas a tu base de conocimientos.",
      exampleContent: "# Resumen: How to Take Smart Notes (Ahrens)\nLa metodología [[Zettelkasten]] sostiene que el pensamiento no ocurre en la cabeza, sino en el papel o sistema digital.\n\n## Puntos Clave:\n1. Notas atómicas\n2. Enlaces bidireccionales con [[wikilinks]]\n3. Revisión continua"
    },
    evergreen: {
      title: "Nota Permanente (Permanent Note)",
      icon: Tree_deciduous,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      subtitle: "Conocimiento atómico, maduro e interconectado",
      desc: "Las notas permanentes son ensayos y síntesis atómicas autónomas. Cada nota contiene una sola idea completa que vive de manera atemporal en tu mapa de conocimiento.",
      exampleContent: "# Manifiesto del Conocimiento Atómico\nLas notas permanentes son los bloques fundamentales de un [[Second Brain]]. A diferencia de una publicación en un blog tradicional, una nota permanente no caduca con el tiempo.\n\nVer también: [[Arquitectura del Conocimiento]], [[Redes Neuronales de Aprendizaje]]."
    }
  };
  return `<section id="zettelkasten" class="py-20 relative bg-garden-surface/30 border-y border-garden-border/60 scroll-mt-16"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto"><div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">${validate_component(Brain_circuit, "BrainCircuit").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-2097ey">Metodología de Aprendizaje</span></div> <h2 class="text-3xl sm:text-4xl font-extrabold text-white" data-svelte-h="svelte-1usvwuo">Introducción al Sistema Zettelkasten</h2> <p class="mt-4 text-garden-muted text-sm sm:text-base leading-relaxed" data-svelte-h="svelte-o0rniq">El sistema **Zettelkasten** (creado por el sociólogo Niklas Luhmann) transforma notas sueltas en una red interconectada de pensamiento. En OpenGarden organizas tu conocimiento en 3 etapas fundamentales:</p></div>  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="p-6 rounded-2xl notion-panel border border-emerald-500/30 space-y-3"><div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-5 h-5" }, {}, {})}</div> <h3 class="text-base font-bold text-white" data-svelte-h="svelte-34t12q">1. Notas Efímeras</h3> <p class="text-xs text-garden-muted leading-relaxed" data-svelte-h="svelte-12ozys6">Pensamientos rápidos y semillas de ideas. Sirven como materia prima para procesar más adelante.</p> <div class="pt-2 text-[11px] font-mono text-emerald-400" data-svelte-h="svelte-ttv06b">Etapa: Fleeting Note</div></div>  <div class="p-6 rounded-2xl notion-panel border border-sky-500/30 space-y-3"><div class="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 w-fit border border-sky-500/20">${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-5 h-5" }, {}, {})}</div> <h3 class="text-base font-bold text-white" data-svelte-h="svelte-19gbdm5">2. Notas de Literatura</h3> <p class="text-xs text-garden-muted leading-relaxed" data-svelte-h="svelte-ok4we3">Resúmenes y conceptos extraídos de lecturas, libros o podcasts explicados en tus palabras.</p> <div class="pt-2 text-[11px] font-mono text-sky-400" data-svelte-h="svelte-1xzgm2x">Etapa: Literature Note</div></div>  <div class="p-6 rounded-2xl notion-panel border border-purple-500/30 space-y-3"><div class="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit border border-purple-500/20">${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-5 h-5" }, {}, {})}</div> <h3 class="text-base font-bold text-white" data-svelte-h="svelte-1e5s3ly">3. Notas Permanentes</h3> <p class="text-xs text-garden-muted leading-relaxed" data-svelte-h="svelte-44vx45">Síntesis atómicas atemporales que se conectan mediante <code class="text-purple-300">[[wikilinks]]</code> para formar tu mapa mental.</p> <div class="pt-2 text-[11px] font-mono text-purple-400" data-svelte-h="svelte-1na1l6n">Etapa: Permanent Note</div></div></div>  <div class="mt-14 p-6 sm:p-8 rounded-2xl notion-panel"><div class="text-center mb-6" data-svelte-h="svelte-4r0a5y"><h3 class="text-lg font-bold text-white">Explora el ciclo de vida de una Nota Zettelkasten</h3> <p class="text-xs text-garden-muted mt-1">Haz clic para ver la estructura de cada tipo de nota en el editor</p></div>  <div class="flex justify-center space-x-2 sm:space-x-4 mb-8"><button class="${"px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border " + escape(
    "bg-garden-surface text-garden-muted border-garden-border hover:border-garden-muted",
    true
  )}">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-76m6i7">Notas Efímeras</span></button> <button class="${"px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border " + escape(
    "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-md",
    true
  )}">${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-4 h-4 text-sky-400" }, {}, {})} <span data-svelte-h="svelte-1759vln">Notas de Literatura</span></button> <button class="${"px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 border " + escape(
    "bg-garden-surface text-garden-muted border-garden-border hover:border-garden-muted",
    true
  )}">${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-4 h-4 text-purple-400" }, {}, {})} <span data-svelte-h="svelte-1wg9skf">Notas Permanentes</span></button></div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"><div class="${"p-6 rounded-xl bg-garden-surface/80 border " + escape(zettelkastenStages[activeTab].borderColor, true)}"><div class="flex items-center space-x-2 mb-2">${validate_component(zettelkastenStages[activeTab].icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      class: "w-5 h-5 " + zettelkastenStages[activeTab].color
    },
    {},
    {}
  )} <h4 class="text-base font-bold text-white">${escape(zettelkastenStages[activeTab].title)}</h4></div> <p class="text-xs text-garden-muted font-mono mb-3">${escape(zettelkastenStages[activeTab].subtitle)}</p> <p class="text-xs text-slate-300 leading-relaxed">${escape(zettelkastenStages[activeTab].desc)}</p></div> <div class="p-5 rounded-xl bg-black/40 border border-garden-border font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto"><div class="flex items-center justify-between pb-3 mb-3 border-b border-garden-border text-garden-muted text-[11px]" data-svelte-h="svelte-gzh3lw"><span>Vista de Documento Notion</span> <span class="text-emerald-400 font-sans font-medium">Contenido Markdown</span></div> <pre class="whitespace-pre-wrap">${escape(zettelkastenStages[activeTab].exampleContent)}</pre></div></div></div></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1m824w1_START -->${$$result.title = `<title>OpenGarden | Tu Jardín Digital Zettelkasten estilo Notion</title>`, ""}<meta name="description" content="OpenGarden es la plataforma SaaS para crear notas Zettelkasten, enlazarlas con [[wikilinks]] y publicar tu jardín digital personal."><!-- HEAD_svelte-1m824w1_END -->`, ""} <div class="space-y-12"> ${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}  <section id="zettelkasten" class="scroll-mt-16">${validate_component(GardenConcept, "GardenConcept").$$render($$result, {}, {}, {})}</section>  <section id="demo" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-16"><div class="text-center max-w-2xl mx-auto mb-8"><div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">${validate_component(Network, "Network").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-1h6c1ge">Red de Conocimiento D3</span></div> <h2 class="text-3xl font-extrabold text-white" data-svelte-h="svelte-fqwn0t">Grafo Interactivo Zettelkasten</h2> <p class="text-garden-muted text-xs sm:text-sm mt-2" data-svelte-h="svelte-1nv53ht">Pasa el cursor sobre los nodos para inspeccionar las conexiones bidireccionales entre tus notas.</p></div>  ${validate_component(GraphDemo, "GraphDemo").$$render($$result, {}, {}, {})}</section>  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14"><div class="relative rounded-3xl p-8 sm:p-12 notion-panel border border-emerald-500/30 overflow-hidden text-center shadow-2xl"><div class="relative z-10 max-w-2xl mx-auto space-y-4"><div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">${validate_component(Book_open, "BookOpen").$$render($$result, { class: "w-6 h-6" }, {}, {})}</div> <h2 class="text-3xl sm:text-4xl font-extrabold text-white" data-svelte-h="svelte-14695xa">Comienza a cultivar tu Zettelkasten hoy</h2> <p class="text-garden-muted text-xs sm:text-sm" data-svelte-h="svelte-eb8jjg">Elige entre presets como PARA, Zettelkasten o Dev y comparte tu jardín público en <code class="text-emerald-400">/u/tu-usuario</code>.</p> <div class="pt-4 flex flex-col sm:flex-row justify-center gap-4"><a href="/onboarding" class="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 text-xs sm:text-sm">${validate_component(Sparkles, "Sparkles").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-94kunv">Probar Wizard de Onboarding</span></a> <a href="/register" class="px-8 py-3.5 rounded-xl notion-panel text-white hover:bg-garden-surface transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold"><span data-svelte-h="svelte-w4inwn">Crear Cuenta Gratis</span> ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})}</a></div></div></div></section></div>`;
});
export {
  Page as default
};
