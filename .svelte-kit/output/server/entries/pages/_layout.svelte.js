import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { S as Sprout } from "../../chunks/sprout.js";
import { B as Book_open } from "../../chunks/book-open.js";
import { N as Network } from "../../chunks/network.js";
import { I as Icon } from "../../chunks/Icon.js";
const Folder_tree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    [
      "path",
      {
        "d": "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    ["path", { "d": "M3 5a2 2 0 0 0 2 2h3" }],
    ["path", { "d": "M3 3v13a2 2 0 0 0 2 2h3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder-tree" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Layout_dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "3",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "14",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "14",
        "y": "12",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "3",
        "y": "16",
        "rx": "1"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "layout-dashboard" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Log_in = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      }
    ],
    ["polyline", { "points": "10 17 15 12 10 7" }],
    [
      "line",
      {
        "x1": "15",
        "x2": "3",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "log-in" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Palette = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "circle",
      {
        "cx": "13.5",
        "cy": "6.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "17.5",
        "cy": "10.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "8.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "6.5",
        "cy": "12.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "path",
      {
        "d": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "palette" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const User_plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    [
      "line",
      {
        "x1": "19",
        "x2": "19",
        "y1": "8",
        "y2": "14"
      }
    ],
    [
      "line",
      {
        "x1": "22",
        "x2": "16",
        "y1": "11",
        "y2": "11"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user-plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTheme = "obsidian";
  return `<div class="min-h-screen flex flex-col bg-garden-main text-garden-text font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200"> <header class="sticky top-0 z-50 w-full glass-panel border-b border-garden-border/80"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"> <a href="/" class="flex items-center space-x-2.5 group"><div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-5 h-5 text-emerald-400" }, {}, {})}</div> <div class="flex flex-col" data-svelte-h="svelte-7r3y6n"><span class="font-extrabold text-lg text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">OpenGarden</span> <span class="text-[10px] text-garden-muted font-mono tracking-widest uppercase">Zettelkasten SaaS</span></div></a>  <nav class="hidden md:flex items-center space-x-6 text-xs font-semibold text-garden-muted"><a href="/#zettelkasten" class="hover:text-white transition-colors flex items-center space-x-1.5">${validate_component(Book_open, "BookOpen").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-w3c722">Zettelkasten</span></a> <a href="/#demo" class="hover:text-white transition-colors flex items-center space-x-1.5">${validate_component(Network, "Network").$$render($$result, { class: "w-4 h-4 text-sky-400" }, {}, {})} <span data-svelte-h="svelte-rufv43">Grafo de Nodos</span></a> <a href="/onboarding" class="hover:text-white transition-colors flex items-center space-x-1.5">${validate_component(Folder_tree, "FolderTree").$$render($$result, { class: "w-4 h-4 text-purple-400" }, {}, {})} <span data-svelte-h="svelte-1usg1qw">Presets de Carpetas</span></a> <a href="/app" class="hover:text-white transition-colors flex items-center space-x-1.5">${validate_component(Layout_dashboard, "LayoutDashboard").$$render($$result, { class: "w-4 h-4 text-teal-400" }, {}, {})} <span data-svelte-h="svelte-xyitl2">Dashboard</span></a></nav>  <div class="flex items-center space-x-3"> <div class="relative"><button class="p-2 rounded-xl glass-panel border border-garden-border text-garden-muted hover:text-white hover:border-garden-border transition-all flex items-center space-x-1.5 text-xs" title="Cambiar Tema Visual">${validate_component(Palette, "Palette").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span class="capitalize hidden sm:inline">${escape(currentTheme)}</span></button> ${``}</div>  <a href="/login" class="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-garden-text hover:text-white hover:bg-garden-surface transition-colors">${validate_component(Log_in, "LogIn").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-1fbjswj">Acceder</span></a> <a href="/register" class="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20">${validate_component(User_plus, "UserPlus").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-2ihkgb">Crear Jardín</span></a></div></div></header>  <main class="flex-grow">${slots.default ? slots.default({}) : ``}</main>  <footer class="border-t border-garden-border/60 bg-garden-surface/50 py-10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-garden-muted"><div class="flex items-center space-x-2">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span class="font-semibold text-white" data-svelte-h="svelte-oxzh2a">OpenGarden</span> <span data-svelte-h="svelte-dru3oh">— Digital Garden &amp; Zettelkasten SaaS</span></div> <div data-svelte-h="svelte-o5qxem">Estética Notion / Obsidian • SvelteKit + Supabase + D3.js</div></div></footer></div>`;
});
export {
  Layout as default
};
