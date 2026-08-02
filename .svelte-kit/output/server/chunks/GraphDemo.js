import { c as create_ssr_component, d as add_attribute, v as validate_component } from "./ssr.js";
import "d3";
import { N as Network } from "./network.js";
import { S as Sprout } from "./sprout.js";
import { L as Leaf, T as Tree_deciduous } from "./tree-deciduous.js";
import { R as Refresh_cw } from "./refresh-cw.js";
const GraphDemo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  let svgElement;
  return `<div class="relative w-full h-[480px] rounded-2xl notion-panel overflow-hidden shadow-xl flex flex-col justify-between"${add_attribute("this", container, 0)}> <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none"><div class="flex items-center space-x-2 bg-garden-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-garden-border text-xs text-garden-muted">${validate_component(Network, "Network").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-btk3pc">Grafo Interactivo Estilo Obsidian (Arrastra los Nodos)</span></div> <div class="flex items-center space-x-3 pointer-events-auto text-xs bg-garden-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-garden-border"><span class="flex items-center space-x-1.5">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span class="text-garden-muted" data-svelte-h="svelte-zhen47">Efímera</span></span> <span class="flex items-center space-x-1.5">${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-3.5 h-3.5 text-sky-400" }, {}, {})} <span class="text-garden-muted" data-svelte-h="svelte-hh6cgv">Literatura</span></span> <span class="flex items-center space-x-1.5">${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-3.5 h-3.5 text-purple-400" }, {}, {})} <span class="text-garden-muted" data-svelte-h="svelte-1tuai81">Permanente</span></span> <button class="p-1 rounded hover:bg-garden-card text-garden-muted hover:text-white transition-colors" title="Reiniciar Simulación">${validate_component(Refresh_cw, "RefreshCw").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}</button></div></div>  <svg class="w-full h-full"${add_attribute("this", svgElement, 0)}></svg>  ${``}</div>`;
});
export {
  GraphDemo as G
};
