import { c as create_ssr_component, v as validate_component, s as subscribe, e as escape, d as add_attribute, f as each } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { r as renderMarkdown, S as Search } from "../../../../chunks/markdown.js";
import { G as GraphDemo } from "../../../../chunks/GraphDemo.js";
import { S as Sprout } from "../../../../chunks/sprout.js";
import { N as Network } from "../../../../chunks/network.js";
import { L as Leaf, T as Tree_deciduous } from "../../../../chunks/tree-deciduous.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "calendar" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredNotes;
  let renderedContent;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const username = $page.params.username || "demo";
  const profile = {
    username,
    display_name: `${username.charAt(0).toUpperCase() + username.slice(1)}'s Zettelkasten`,
    bio: "Investigador de sistemas de pensamiento Zettelkasten, diseño de software y aprendizaje continuo.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
  };
  const publicNotes = [
    {
      id: "p1",
      title: "Bienvenido a mi Jardín Digital Zettelkasten",
      slug: "bienvenido",
      stage: "evergreen",
      content: `# Bienvenido a mi Jardín Digital Zettelkasten

Este espacio es una colección viva de mis aprendizajes, ensayos y fragmentos de código.

## Exploración recomendada:
- [[Metodologia Zettelkasten]]
- [[Arquitectura de Software Abierta]]`,
      updated_at: "2026-08-01"
    },
    {
      id: "p2",
      title: "Metodologia Zettelkasten",
      slug: "metodologia-zettelkasten",
      stage: "growing",
      content: `# Metodología Zettelkasten

Principios de atomización del conocimiento y enlaces bidireccionales.`,
      updated_at: "2026-07-28"
    },
    {
      id: "p3",
      title: "Arquitectura de Software Abierta",
      slug: "arquitectura-de-software-abierta",
      stage: "evergreen",
      content: `# Arquitectura de Software Abierta

Definición de patrones SaaS eficientes en SvelteKit y Supabase.`,
      updated_at: "2026-07-25"
    },
    {
      id: "p4",
      title: "Idea: Experimentos con D3.js Force",
      slug: "experimentos-con-d3",
      stage: "seed",
      content: `# Idea: Experimentos con D3.js Force

Apunte sobre simulación física en canvas y SVG para grafos de conocimiento.`,
      updated_at: "2026-08-02"
    }
  ];
  let activeNote = publicNotes[0];
  let searchQuery = "";
  filteredNotes = publicNotes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  renderedContent = renderMarkdown(activeNote.content);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-xoxwxo_START -->${$$result.title = `<title>${escape(profile.display_name)} | OpenGarden</title>`, ""}<meta name="description"${add_attribute("content", profile.bio, 0)}><!-- HEAD_svelte-xoxwxo_END -->`, ""} <div class="min-h-screen bg-garden-main pb-20"> <section class="border-b border-garden-border/80 bg-garden-surface/30 pt-10 pb-8"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left"> <div class="relative"><img${add_attribute("src", profile.avatar_url, 0)}${add_attribute("alt", profile.display_name, 0)} class="w-20 h-20 rounded-2xl border border-garden-border object-cover shadow-xl"> <span class="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-slate-950 border border-garden-main" title="Jardín Activo">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</span></div>  <div class="flex-grow space-y-1"><div class="flex flex-col sm:flex-row sm:items-center gap-2"><h1 class="text-2xl font-extrabold text-white">${escape(profile.display_name)}</h1> <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 self-center sm:self-auto">/u/${escape(profile.username)}</span></div> <p class="text-xs sm:text-sm text-garden-muted max-w-xl">${escape(profile.bio)}</p></div>  <div class="flex items-center space-x-3 bg-garden-surface p-3 rounded-2xl border border-garden-border"><div class="text-center px-2"><span class="text-lg font-extrabold text-white block">${escape(publicNotes.length)}</span> <span class="text-[10px] text-garden-muted uppercase tracking-wider font-semibold" data-svelte-h="svelte-hjtzti">Notas</span></div> <div class="w-px h-8 bg-garden-border"></div> <div class="text-center px-2" data-svelte-h="svelte-qbezue"><span class="text-lg font-extrabold text-emerald-400 block">4</span> <span class="text-[10px] text-garden-muted uppercase tracking-wider font-semibold">Conexiones</span></div></div></div></div></section>  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"><div class="flex items-center justify-between mb-4"><h2 class="text-sm font-bold text-white flex items-center space-x-2">${validate_component(Network, "Network").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-9bkb6b">Grafo de Nodos Zettelkasten</span></h2> <span class="text-xs text-garden-muted" data-svelte-h="svelte-1f4mw6d">Visualización pública de notas</span></div>  ${validate_component(GraphDemo, "GraphDemo").$$render($$result, {}, {}, {})}</section>  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"> <div class="lg:col-span-4 space-y-4"> <div class="p-4 rounded-2xl notion-panel space-y-3"><div class="relative">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "w-3.5 h-3.5 text-garden-muted absolute left-3 top-3"
    },
    {},
    {}
  )} <input type="text" placeholder="Buscar nota pública..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-garden-surface border border-garden-border text-xs text-white placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", searchQuery, 0)}></div>  <div class="grid grid-cols-2 gap-1 text-[11px]"><button class="${"px-2 py-1.5 rounded-lg font-medium transition-all text-center " + escape(
    "bg-garden-card text-white font-bold border border-garden-border",
    true
  )}">Todas</button> <button class="${"px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 " + escape(
    "text-garden-muted hover:text-white",
    true
  )}">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-3 h-3 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-1jrg7uw">Efímeras</span></button> <button class="${"px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 " + escape(
    "text-garden-muted hover:text-white",
    true
  )}">${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-3 h-3 text-sky-400" }, {}, {})} <span data-svelte-h="svelte-1oz6tsx">Literatura</span></button> <button class="${"px-2 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center space-x-1 " + escape(
    "text-garden-muted hover:text-white",
    true
  )}">${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-3 h-3 text-purple-400" }, {}, {})} <span data-svelte-h="svelte-1mlszqw">Permanentes</span></button></div></div>  <div class="space-y-2">${each(filteredNotes, (note) => {
    return `  <div class="${"p-4 rounded-2xl notion-panel transition-all cursor-pointer " + escape(
      activeNote.id === note.id ? "border-emerald-500 bg-emerald-950/20 shadow-md" : "border-garden-border/80 hover:border-garden-muted",
      true
    )}"><div class="flex items-center justify-between"><span class="text-xs font-bold text-white truncate">${escape(note.title)}</span> ${note.stage === "seed" ? `${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})}` : `${note.stage === "growing" ? `${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-3.5 h-3.5 text-sky-400" }, {}, {})}` : `${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-3.5 h-3.5 text-purple-400" }, {}, {})}`}`}</div> <p class="text-[11px] text-garden-muted truncate mt-1">${escape(note.content.slice(0, 70))}...</p> <div class="mt-2 text-[10px] text-garden-muted font-mono flex items-center space-x-1">${validate_component(Calendar, "Calendar").$$render($$result, { class: "w-3 h-3" }, {}, {})} <span>Actualizado: ${escape(note.updated_at)}</span></div> </div>`;
  })}</div></div>  <div class="lg:col-span-8"><div class="p-6 sm:p-8 rounded-3xl notion-panel min-h-[450px]"><div class="flex items-center justify-between pb-4 mb-6 border-b border-garden-border"><div class="flex items-center space-x-3"><div class="p-2 rounded-xl bg-garden-card border border-garden-border">${activeNote.stage === "seed" ? `${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-5 h-5 text-emerald-400" }, {}, {})}` : `${activeNote.stage === "growing" ? `${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-5 h-5 text-sky-400" }, {}, {})}` : `${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-5 h-5 text-purple-400" }, {}, {})}`}`}</div> <div><h2 class="text-xl sm:text-2xl font-extrabold text-white">${escape(activeNote.title)}</h2> <span class="text-xs text-garden-muted font-mono">/u/${escape(username)}/${escape(activeNote.slug)}</span></div></div> <span class="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">${escape(activeNote.stage)}</span></div>  <div class="prose prose-invert max-w-none text-slate-200 leading-relaxed"><!-- HTML_TAG_START -->${renderedContent}<!-- HTML_TAG_END --></div></div></div></div></section></div>`;
});
export {
  Page as default
};
