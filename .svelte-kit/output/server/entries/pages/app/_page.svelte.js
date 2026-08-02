import { c as create_ssr_component, v as validate_component, d as add_attribute, f as each, e as escape } from "../../../chunks/ssr.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { S as Search, r as renderMarkdown, e as extractWikilinks, s as slugify } from "../../../chunks/markdown.js";
import { S as Sprout } from "../../../chunks/sprout.js";
import { L as Leaf, T as Tree_deciduous } from "../../../chunks/tree-deciduous.js";
import { G as Globe } from "../../../chunks/globe.js";
import { L as Lock } from "../../../chunks/lock.js";
import { N as Network } from "../../../chunks/network.js";
import "d3";
import { R as Refresh_cw } from "../../../chunks/refresh-cw.js";
const Arrow_up_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M7 7h10v10" }], ["path", { "d": "M7 17 17 7" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-up-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "eye" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Folder_open = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder-open" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Folder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Link_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M9 17H7A5 5 0 0 1 7 7h2" }],
    ["path", { "d": "M15 7h2a5 5 0 1 1 0 10h-2" }],
    [
      "line",
      {
        "x1": "8",
        "x2": "16",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "link-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Panel_left_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M9 3v18" }],
    ["path", { "d": "m16 15-3-3 3-3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "panel-left-close" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Panel_right_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M15 3v18" }],
    ["path", { "d": "m8 9 3 3-3 3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "panel-right-close" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pen_line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M12 20h9" }],
    [
      "path",
      {
        "d": "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pen-line" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pen" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "11",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "11",
        "y2": "17"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const FolderTree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredNotes;
  let getFolderNotes;
  let uncategorizedNotes;
  let { folders = [] } = $$props;
  let { notes = [] } = $$props;
  let { activeNoteId = "" } = $$props;
  let { onSelectNote } = $$props;
  let { onCreateNote } = $$props;
  let { onCreateFolder } = $$props;
  let { onDeleteNote } = $$props;
  let { onMoveNoteToFolder } = $$props;
  let { onRenameFolder } = $$props;
  let { onRenameNote } = $$props;
  let expandedFolders = { "f1": true, "f2": true, "f3": true };
  let searchQuery = "";
  let editingFolderId = null;
  let editingFolderName = "";
  let editingNoteId = null;
  let editingNoteTitle = "";
  let dragOverFolderId = null;
  if ($$props.folders === void 0 && $$bindings.folders && folders !== void 0) $$bindings.folders(folders);
  if ($$props.notes === void 0 && $$bindings.notes && notes !== void 0) $$bindings.notes(notes);
  if ($$props.activeNoteId === void 0 && $$bindings.activeNoteId && activeNoteId !== void 0) $$bindings.activeNoteId(activeNoteId);
  if ($$props.onSelectNote === void 0 && $$bindings.onSelectNote && onSelectNote !== void 0) $$bindings.onSelectNote(onSelectNote);
  if ($$props.onCreateNote === void 0 && $$bindings.onCreateNote && onCreateNote !== void 0) $$bindings.onCreateNote(onCreateNote);
  if ($$props.onCreateFolder === void 0 && $$bindings.onCreateFolder && onCreateFolder !== void 0) $$bindings.onCreateFolder(onCreateFolder);
  if ($$props.onDeleteNote === void 0 && $$bindings.onDeleteNote && onDeleteNote !== void 0) $$bindings.onDeleteNote(onDeleteNote);
  if ($$props.onMoveNoteToFolder === void 0 && $$bindings.onMoveNoteToFolder && onMoveNoteToFolder !== void 0) $$bindings.onMoveNoteToFolder(onMoveNoteToFolder);
  if ($$props.onRenameFolder === void 0 && $$bindings.onRenameFolder && onRenameFolder !== void 0) $$bindings.onRenameFolder(onRenameFolder);
  if ($$props.onRenameNote === void 0 && $$bindings.onRenameNote && onRenameNote !== void 0) $$bindings.onRenameNote(onRenameNote);
  filteredNotes = notes.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()));
  getFolderNotes = (folderId) => {
    return filteredNotes.filter((n) => n.folder_id === folderId);
  };
  uncategorizedNotes = filteredNotes.filter((n) => {
    const folderIds = new Set(folders.map((f) => f.id));
    return !n.folder_id || !folderIds.has(n.folder_id);
  });
  return `<div class="flex flex-col h-full space-y-2"> <div class="px-3 pt-3 pb-2 space-y-2 border-b border-garden-border/60"><div class="flex items-center justify-between relative"><span class="text-[11px] font-bold uppercase tracking-wider text-garden-muted flex items-center space-x-1.5">${validate_component(Folder_open, "FolderOpen").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-fofnen">Navegador de Carpetas</span></span>  <div class="relative"><button class="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center space-x-1 text-xs font-semibold" title="Crear Nueva Nota o Categoría">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> ${``}</div></div>  <div class="relative">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "w-3.5 h-3.5 text-garden-muted absolute left-2.5 top-2.5"
    },
    {},
    {}
  )} <input type="text" placeholder="Buscar nota o carpeta..." class="w-full pl-8 pr-3 py-1.5 rounded-lg bg-garden-surface border border-garden-border text-xs text-white placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", searchQuery, 0)}></div></div>  <div class="flex-grow overflow-y-auto px-2 space-y-1 text-xs"> ${each(folders, (folder) => {
    let folderNotes = getFolderNotes(folder.id), isExpanded = expandedFolders[folder.id] ?? false, isDragOver = dragOverFolderId === folder.id;
    return `    <div class="${"space-y-0.5 rounded-xl transition-all duration-200 " + escape(
      isDragOver ? "bg-emerald-500/20 border-2 border-dashed border-emerald-400 p-1" : "",
      true
    )}"> <div class="group flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-garden-surface/80 text-garden-muted hover:text-white transition-colors">  <div class="flex items-center space-x-1.5 flex-grow cursor-pointer truncate">${isExpanded ? `${validate_component(Chevron_down, "ChevronDown").$$render($$result, { class: "w-3.5 h-3.5 text-garden-muted" }, {}, {})} ${validate_component(Folder_open, "FolderOpen").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})}` : `${validate_component(Chevron_right, "ChevronRight").$$render($$result, { class: "w-3.5 h-3.5 text-garden-muted" }, {}, {})} ${validate_component(Folder, "FolderClosed").$$render(
      $$result,
      {
        class: "w-4 h-4 text-garden-muted group-hover:text-white"
      },
      {},
      {}
    )}`} ${editingFolderId === folder.id ? `<input type="text" class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"${add_attribute("value", editingFolderName, 0)}> <button class="text-emerald-400 hover:text-white">${validate_component(Check, "Check").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} </button>` : `<span class="font-medium truncate text-white/90">${escape(folder.name)}</span> <span class="text-[10px] text-garden-muted font-mono">(${escape(folderNotes.length)})</span>`}</div> <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-1 hover:text-sky-400 transition-colors" title="Renombrar carpeta">${validate_component(Pen, "Edit2").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <button class="p-1 hover:text-emerald-400 transition-colors" title="Añadir nota en esta carpeta">${validate_component(Plus, "Plus").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> </div></div>  ${isExpanded ? `<div class="pl-5 space-y-0.5 border-l border-garden-border/50 ml-3">${folderNotes.length === 0 ? `<div class="py-1 px-2 text-[11px] text-garden-muted/60 italic" data-svelte-h="svelte-zwryvk">Arrastra notas aquí</div>` : `${each(folderNotes, (note) => {
      return `  <div draggable="true" class="${"group flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium cursor-grab active:cursor-grabbing transition-all border " + escape(
        activeNoteId === note.id ? "bg-garden-surface text-white border-garden-border shadow-sm" : "text-garden-muted hover:text-white hover:bg-garden-surface/40 border-transparent",
        true
      )}"><div class="flex items-center space-x-2 truncate">${note.stage === "seed" ? `${validate_component(Sprout, "Sprout").$$render(
        $$result,
        {
          class: "w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
        },
        {},
        {}
      )}` : `${note.stage === "growing" ? `${validate_component(Leaf, "Leaf").$$render(
        $$result,
        {
          class: "w-3.5 h-3.5 text-sky-400 flex-shrink-0"
        },
        {},
        {}
      )}` : `${validate_component(Tree_deciduous, "TreeDeciduous").$$render(
        $$result,
        {
          class: "w-3.5 h-3.5 text-purple-400 flex-shrink-0"
        },
        {},
        {}
      )}`}`} ${editingNoteId === note.id ? `<input type="text" class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"${add_attribute("value", editingNoteTitle, 0)}> <button class="text-emerald-400 hover:text-white">${validate_component(Check, "Check").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} </button>` : `<span class="truncate">${escape(note.title)}</span>`}</div> <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">${note.is_public ? `<span title="Pública">${validate_component(Globe, "Globe").$$render($$result, { class: "w-3 h-3 text-emerald-400" }, {}, {})}</span>` : ``} <button class="p-1 hover:text-sky-400 transition-colors" title="Renombrar nota">${validate_component(Pen, "Edit2").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <button class="p-1 text-garden-muted hover:text-red-400 transition-colors" title="Eliminar">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3 h-3" }, {}, {})} </button></div> </div>`;
    })}`} </div>` : ``} </div>`;
  })}   <div class="${"pt-2 rounded-xl transition-all duration-200 " + escape(
    "",
    true
  )}"><div class="px-2 py-1 text-[10px] uppercase font-bold text-garden-muted tracking-wider">Notas Sueltas (${escape(uncategorizedNotes.length)})</div> ${each(uncategorizedNotes, (note) => {
    return `  <div draggable="true" class="${"group flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium cursor-grab active:cursor-grabbing transition-all border " + escape(
      activeNoteId === note.id ? "bg-garden-surface text-white border-garden-border shadow-sm" : "text-garden-muted hover:text-white hover:bg-garden-surface/40 border-transparent",
      true
    )}"><div class="flex items-center space-x-2 truncate">${note.stage === "seed" ? `${validate_component(Sprout, "Sprout").$$render(
      $$result,
      {
        class: "w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
      },
      {},
      {}
    )}` : `${note.stage === "growing" ? `${validate_component(Leaf, "Leaf").$$render(
      $$result,
      {
        class: "w-3.5 h-3.5 text-sky-400 flex-shrink-0"
      },
      {},
      {}
    )}` : `${validate_component(Tree_deciduous, "TreeDeciduous").$$render(
      $$result,
      {
        class: "w-3.5 h-3.5 text-purple-400 flex-shrink-0"
      },
      {},
      {}
    )}`}`} ${editingNoteId === note.id ? `<input type="text" class="px-1 py-0.5 bg-garden-surface border border-emerald-500 text-white rounded text-xs focus:outline-none"${add_attribute("value", editingNoteTitle, 0)}> <button class="text-emerald-400 hover:text-white">${validate_component(Check, "Check").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} </button>` : `<span class="truncate">${escape(note.title)}</span>`}</div> <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-1 hover:text-sky-400 transition-colors" title="Renombrar nota">${validate_component(Pen, "Edit2").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <button class="p-1 text-garden-muted hover:text-red-400 transition-colors" title="Eliminar">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3 h-3" }, {}, {})} </button></div> </div>`;
  })}</div></div></div>  ${``}`;
});
const ZETTELKASTEN_MAP = {
  seed: {
    label: "Nota Efímera (Fleeting)",
    shortLabel: "Efímera",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    desc: "Ideas rápidas y fragmentos capturados al instante."
  },
  growing: {
    label: "Nota de Literatura (Literature)",
    shortLabel: "Literatura",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    desc: "Resúmenes de lecturas y citas organizadas."
  },
  evergreen: {
    label: "Nota Permanente (Permanent)",
    shortLabel: "Permanente",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    desc: "Síntesis atómicas y conceptos interconectados."
  }
};
const NotionEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stageMeta;
  let extractedLinks;
  let { note } = $$props;
  let { allNotes = [] } = $$props;
  let { onUpdateNote } = $$props;
  let { onNavigateToSlug } = $$props;
  let { isRightPanelOpen = true } = $$props;
  let { onToggleRightPanel = () => {
  } } = $$props;
  let textareaElement;
  let wikilinkQuery = "";
  if ($$props.note === void 0 && $$bindings.note && note !== void 0) $$bindings.note(note);
  if ($$props.allNotes === void 0 && $$bindings.allNotes && allNotes !== void 0) $$bindings.allNotes(allNotes);
  if ($$props.onUpdateNote === void 0 && $$bindings.onUpdateNote && onUpdateNote !== void 0) $$bindings.onUpdateNote(onUpdateNote);
  if ($$props.onNavigateToSlug === void 0 && $$bindings.onNavigateToSlug && onNavigateToSlug !== void 0) $$bindings.onNavigateToSlug(onNavigateToSlug);
  if ($$props.isRightPanelOpen === void 0 && $$bindings.isRightPanelOpen && isRightPanelOpen !== void 0) $$bindings.isRightPanelOpen(isRightPanelOpen);
  if ($$props.onToggleRightPanel === void 0 && $$bindings.onToggleRightPanel && onToggleRightPanel !== void 0) $$bindings.onToggleRightPanel(onToggleRightPanel);
  stageMeta = ZETTELKASTEN_MAP[note.stage] || ZETTELKASTEN_MAP.seed;
  renderMarkdown(note.content || "");
  extractedLinks = extractWikilinks(note.content || "");
  allNotes.filter((n) => n.id !== note.id && (n.title.toLowerCase().includes(wikilinkQuery.toLowerCase()) || n.slug.toLowerCase().includes(wikilinkQuery.toLowerCase())));
  return `<div class="h-full flex flex-col bg-garden-main overflow-y-auto"> <div class="px-6 py-3 border-b border-garden-border/60 glass-panel flex items-center justify-between flex-shrink-0"> <div class="flex items-center space-x-1 bg-garden-surface p-0.5 rounded-xl border border-garden-border text-xs"><button class="${"px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors " + escape(
    note.stage === "seed" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40" : "text-garden-muted hover:text-white",
    true
  )}" title="Etapa Efímera (Seed)">${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span class="hidden md:inline" data-svelte-h="svelte-gozlb8">Efímera</span></button> <button class="${"px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors " + escape(
    note.stage === "growing" ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40" : "text-garden-muted hover:text-white",
    true
  )}" title="Etapa Literatura (Growing)">${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-3.5 h-3.5 text-sky-400" }, {}, {})} <span class="hidden md:inline" data-svelte-h="svelte-1m12iho">Literatura</span></button> <button class="${"px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-colors " + escape(
    note.stage === "evergreen" ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40" : "text-garden-muted hover:text-white",
    true
  )}" title="Etapa Permanente (Evergreen)">${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-3.5 h-3.5 text-purple-400" }, {}, {})} <span class="hidden md:inline" data-svelte-h="svelte-1wnqxkm">Permanente</span></button></div>  <div class="flex items-center space-x-2"><div class="flex items-center bg-garden-surface p-0.5 rounded-xl border border-garden-border text-xs"><button class="${"px-3 py-1 rounded-lg transition-colors flex items-center space-x-1.5 " + escape(
    "bg-garden-card text-white font-bold shadow-sm",
    true
  )}">${validate_component(Pen_line, "Edit3").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span data-svelte-h="svelte-786bm0">Editor Markdown</span></button> <button class="${"px-3 py-1 rounded-lg transition-colors flex items-center space-x-1.5 " + escape(
    "text-garden-muted hover:text-white",
    true
  )}">${validate_component(Eye, "Eye").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-ekeke2">Vista Renderizada</span></button></div>  <button class="${"px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border " + escape(
    note.is_public ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" : "bg-garden-surface text-garden-muted border-garden-border",
    true
  )}">${note.is_public ? `${validate_component(Globe, "Globe").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span class="hidden sm:inline" data-svelte-h="svelte-cgppi7">Pública</span>` : `${validate_component(Lock, "Lock").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})} <span class="hidden sm:inline" data-svelte-h="svelte-1d6wqxf">Privada</span>`}</button> ${note.is_public ? `<button class="p-1.5 rounded-xl bg-garden-surface border border-garden-border text-garden-muted hover:text-white text-xs transition-colors" title="Copiar URL pública">${`${validate_component(Link_2, "Link2").$$render($$result, { class: "w-3.5 h-3.5" }, {}, {})}`}</button>` : ``}  ${!isRightPanelOpen ? `<button class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border bg-garden-surface text-sky-300 border-sky-500/40 hover:bg-sky-500/20" title="Mostrar Inspector de Conexiones">${validate_component(Network, "Network").$$render($$result, { class: "w-3.5 h-3.5 text-sky-400" }, {}, {})} <span class="hidden sm:inline" data-svelte-h="svelte-1uhiopj">Conexiones</span></button>` : ``}</div></div>  <div class="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 flex-grow flex flex-col relative"> <div class="mb-6 space-y-2"><div class="flex items-center space-x-2 text-xs text-garden-muted font-mono">${note.stage === "seed" ? `${validate_component(Sprout, "Sprout").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})}` : `${note.stage === "growing" ? `${validate_component(Leaf, "Leaf").$$render($$result, { class: "w-4 h-4 text-sky-400" }, {}, {})}` : `${validate_component(Tree_deciduous, "TreeDeciduous").$$render($$result, { class: "w-4 h-4 text-purple-400" }, {}, {})}`}`} <span>Zettelkasten / ${escape(stageMeta.shortLabel)}</span></div> <input type="text" placeholder="Título de la nota..." class="w-full bg-transparent text-3xl sm:text-4xl font-extrabold text-white focus:outline-none placeholder:text-garden-muted/40 tracking-tight border-b border-transparent focus:border-garden-border pb-1"${add_attribute("value", note.title, 0)}></div>  <div class="mb-6 text-[11px] text-garden-muted font-mono bg-garden-surface/60 px-3 py-1.5 rounded-xl border border-garden-border/40 flex items-center justify-between" data-svelte-h="svelte-1laqmjs"><span>Escribe sintaxis Markdown: <code class="text-emerald-400 font-bold"># Título</code>, <code class="text-emerald-400 font-bold">## Título 2</code>, <code class="text-emerald-400 font-bold">- Viñeta</code>, <code class="text-emerald-400 font-bold">&gt; Cita</code>, <code class="text-emerald-400 font-bold">[[Nota]]</code></span> <span class="text-emerald-400 font-sans font-semibold">Live Editor</span></div>  ${``}  ${`<textarea placeholder="Comienza a escribir en Markdown aquí... Usa # para títulos, - para viñetas, > para citas o [[ para wikilinks." class="w-full flex-grow min-h-[400px] bg-transparent text-slate-100 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-relaxed p-2"${add_attribute("this", textareaElement, 0)}>${escape(note.content || "")}</textarea>`}  ${extractedLinks.length > 0 ? `  <div class="mt-12 pt-6 border-t border-garden-border/60"><h4 class="text-xs font-bold text-white mb-3 flex items-center space-x-2">${validate_component(Network, "Network").$$render($$result, { class: "w-4 h-4 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-ryyzuu">Conexiones Zettelkasten ([[...]]) en este documento:</span></h4> <div class="flex flex-wrap gap-2">${each(extractedLinks, (link) => {
    return `<a${add_attribute("href", `#${link.slug}`, 0)}${add_attribute("data-slug", link.slug, 0)} class="wikilink px-3 py-1 rounded-xl bg-garden-surface border border-garden-border text-xs text-emerald-300 font-medium flex items-center space-x-1 hover:border-emerald-500 transition-colors cursor-pointer"><span class="text-emerald-400 font-mono" data-svelte-h="svelte-1mui4tr">[[</span> <span>${escape(link.displayTitle)}</span> <span class="text-emerald-400 font-mono" data-svelte-h="svelte-1cacx0v">]]</span> </a>`;
  })}</div></div>` : ``}</div></div>`;
});
function buildLocalGraphNodes(current, list) {
  if (!current) return [];
  const connectedTitles = /* @__PURE__ */ new Set();
  const wikilinkRegex = /\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g;
  let match;
  while ((match = wikilinkRegex.exec(current.content)) !== null) {
    connectedTitles.add(match[1].trim().toLowerCase());
  }
  const connectedNotes = list.filter((n) => n.id !== current.id && (connectedTitles.has(n.title.toLowerCase()) || n.content.toLowerCase().includes(current.title.toLowerCase())));
  const nodes = [
    {
      id: current.id,
      title: current.title,
      slug: current.slug,
      stage: current.stage,
      val: 14
    }
  ];
  connectedNotes.forEach((n) => {
    nodes.push({
      id: n.id,
      title: n.title,
      slug: n.slug,
      stage: n.stage,
      val: 10
    });
  });
  return nodes;
}
const LocalGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localNodes;
  let { activeNote } = $$props;
  let { allNotes = [] } = $$props;
  let svgElement;
  let container;
  function buildLocalGraphLinks(current, list) {
    if (!current) return [];
    const links = [];
    localNodes.forEach((n) => {
      if (n.id !== current.id) {
        links.push({ source: current.id, target: n.id });
      }
    });
    return links;
  }
  function initSimulation() {
    return;
  }
  if ($$props.activeNote === void 0 && $$bindings.activeNote && activeNote !== void 0) $$bindings.activeNote(activeNote);
  if ($$props.allNotes === void 0 && $$bindings.allNotes && allNotes !== void 0) $$bindings.allNotes(allNotes);
  localNodes = buildLocalGraphNodes(activeNote, allNotes);
  buildLocalGraphLinks(activeNote);
  {
    if (activeNote || allNotes) {
      setTimeout(initSimulation, 50);
    }
  }
  return `<div class="w-full h-[220px] rounded-xl bg-garden-surface/80 border border-garden-border relative overflow-hidden flex flex-col justify-between"${add_attribute("this", container, 0)}><div class="absolute top-2 left-2.5 z-10 flex items-center space-x-1.5 text-[10px] text-garden-muted font-mono bg-garden-card/80 px-2 py-0.5 rounded border border-garden-border"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> <span>Grafo Local: ${escape(localNodes.length)} nodos</span></div> <button class="absolute top-2 right-2 z-10 p-1 rounded bg-garden-card/80 border border-garden-border text-garden-muted hover:text-white transition-colors text-xs" title="Reorganizar Grafo">${validate_component(Refresh_cw, "RefreshCw").$$render($$result, { class: "w-3 h-3" }, {}, {})}</button> <svg class="w-full h-full"${add_attribute("this", svgElement, 0)}></svg></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeNote;
  let extractedLinks;
  let backlinks;
  let folders = [
    {
      id: "f1",
      user_id: "u1",
      name: "1_Efimeras",
      parent_id: null,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "f2",
      user_id: "u1",
      name: "2_Literatura",
      parent_id: null,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "f3",
      user_id: "u1",
      name: "3_Permanentes",
      parent_id: null,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  let notes = [
    {
      id: "n1",
      user_id: "u1",
      folder_id: "f3",
      title: "Bienvenido a tu Zettelkasten Digital",
      slug: "bienvenido-a-tu-zettelkasten-digital",
      content: `# Bienvenido a tu Zettelkasten Digital

Este es tu espacio no lineal estilo Notion para cultivar conocimiento.

## Principios Zettelkasten:
- Registra ideas rápidas como **Notas Efímeras**.
- Resume fuentes externas en **Notas de Literatura** como [[Metodologia Zettelkasten]].
- Enlaza síntesis autónomas mediante **Notas Permanentes** usando [[wikilinks]].

## Conceptos Enlazados:
- [[Metodologia Zettelkasten]]
- [[Idea: Grafos D3 con SvelteKit]]`,
      stage: "evergreen",
      is_public: true,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "n2",
      user_id: "u1",
      folder_id: "f2",
      title: "Metodologia Zettelkasten",
      slug: "metodologia-zettelkasten",
      content: `# Metodología Zettelkasten

El sistema de fichas creado por Niklas Luhmann que inspiró el flujo de enlaces bidireccionales.

- Cada nota debe ser atómica (una sola idea).
- Enlaza conceptos clave como [[Bienvenido a tu Zettelkasten Digital]].`,
      stage: "growing",
      is_public: true,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "n3",
      user_id: "u1",
      folder_id: "f1",
      title: "Idea: Grafos D3 con SvelteKit",
      slug: "idea-grafos-d3-con-sveltekit",
      content: `# Idea: Grafos D3 con SvelteKit

Apunte rápido sobre el renderizado de force simulation usando SVGs reactivos y d3.drag() para interactividad tipo Obsidian.

Relacionado con [[Bienvenido a tu Zettelkasten Digital]].`,
      stage: "seed",
      is_public: false,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  let activeNoteId = "n1";
  let isRightPanelOpen = true;
  function handleSelectNote(id) {
    activeNoteId = id;
  }
  function handleNavigateToSlug(targetSlug) {
    const found = notes.find((n) => n.slug === targetSlug || slugify(n.title) === targetSlug);
    if (found) {
      activeNoteId = found.id;
    } else {
      const newTitle = targetSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const newId = `n_${Date.now()}`;
      const newNote = {
        id: newId,
        user_id: "u1",
        folder_id: "f1",
        title: newTitle,
        slug: targetSlug,
        content: `# ${newTitle}

Nota creada automáticamente al pulsar [[${newTitle}]].`,
        stage: "seed",
        is_public: false,
        created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
      };
      notes = [newNote, ...notes];
      activeNoteId = newId;
    }
  }
  function handleCreateNote(folderId, stage) {
    const newId = `n_${Date.now()}`;
    const newNote = {
      id: newId,
      user_id: "u1",
      folder_id: folderId || "f1",
      title: "Nueva Nota Zettelkasten",
      slug: `nueva-nota-${Date.now().toString().slice(-4)}`,
      content: `# Nueva Nota

Escribe tus ideas aquí y conecta otros conceptos usando [[Nombre de Nota]].`,
      stage: stage || "seed",
      is_public: false,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    };
    notes = [newNote, ...notes];
    activeNoteId = newId;
  }
  function handleCreateFolder(name, parentId) {
    const newFolder = {
      id: `f_${Date.now()}`,
      user_id: "u1",
      name,
      parent_id: parentId || null,
      created_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    };
    folders = [...folders, newFolder];
  }
  function handleDeleteNote(id) {
    notes = notes.filter((n) => n.id !== id);
    if (activeNoteId === id && notes.length > 0) {
      activeNoteId = notes[0].id;
    }
  }
  function handleUpdateNote(updatedNote) {
    notes = notes.map((n) => n.id === updatedNote.id ? { ...updatedNote } : n);
  }
  function handleMoveNoteToFolder(noteId, targetFolderId) {
    notes = notes.map((n) => n.id === noteId ? { ...n, folder_id: targetFolderId } : n);
  }
  function handleRenameFolder(folderId, newName) {
    folders = folders.map((f) => f.id === folderId ? { ...f, name: newName } : f);
  }
  function handleRenameNote(noteId, newTitle) {
    notes = notes.map((n) => n.id === noteId ? {
      ...n,
      title: newTitle,
      slug: slugify(newTitle)
    } : n);
  }
  activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];
  extractedLinks = activeNote ? extractWikilinks(activeNote.content) : [];
  backlinks = activeNote ? notes.filter((n) => n.id !== activeNote.id && n.content.toLowerCase().includes(activeNote.title.toLowerCase())) : [];
  return `${$$result.head += `<!-- HEAD_svelte-1o2d624_START -->${$$result.title = `<title>Dashboard Zettelkasten | OpenGarden</title>`, ""}<!-- HEAD_svelte-1o2d624_END -->`, ""} <div class="h-[calc(100vh-4.1rem)] flex overflow-hidden bg-garden-main"> <aside class="${escape(
    "w-64 sm:w-72",
    true
  ) + " transition-all duration-300 glass-panel border-r border-garden-border flex flex-col flex-shrink-0 relative z-20"}"><div class="flex-grow overflow-hidden">${validate_component(FolderTree, "FolderTree").$$render(
    $$result,
    {
      folders,
      notes,
      activeNoteId,
      onSelectNote: handleSelectNote,
      onCreateNote: handleCreateNote,
      onCreateFolder: handleCreateFolder,
      onDeleteNote: handleDeleteNote,
      onMoveNoteToFolder: handleMoveNoteToFolder,
      onRenameFolder: handleRenameFolder,
      onRenameNote: handleRenameNote
    },
    {},
    {}
  )}</div>  <div class="p-3 border-t border-garden-border/60 text-xs text-garden-muted flex items-center justify-between"><a href="/u/demo" target="_blank" class="hover:text-emerald-400 flex items-center space-x-1 transition-colors font-medium">${validate_component(Globe, "Globe").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-ukeqg7">Jardín Público</span> ${validate_component(Arrow_up_right, "ArrowUpRight").$$render($$result, { class: "w-3 h-3" }, {}, {})}</a> <button class="p-1 rounded hover:bg-garden-surface text-garden-muted hover:text-white" title="Ocultar Sidebar">${validate_component(Panel_left_close, "PanelLeftClose").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div></aside>  <main class="flex-grow flex flex-col min-w-0 bg-garden-main relative"> ${``} ${activeNote ? `${validate_component(NotionEditor, "NotionEditor").$$render(
    $$result,
    {
      note: activeNote,
      allNotes: notes,
      isRightPanelOpen,
      onToggleRightPanel: () => isRightPanelOpen = !isRightPanelOpen,
      onUpdateNote: handleUpdateNote,
      onNavigateToSlug: handleNavigateToSlug
    },
    {},
    {}
  )}` : ``}</main>  <aside class="${escape(
    isRightPanelOpen ? "w-72 sm:w-80" : "w-0 opacity-0 overflow-hidden",
    true
  ) + " transition-all duration-300 glass-panel border-l border-garden-border flex flex-col flex-shrink-0 relative"}"> <div class="p-3 border-b border-garden-border/60 flex items-center justify-between"><div class="flex items-center bg-garden-surface p-0.5 rounded-lg border border-garden-border text-xs"><button class="${"px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 " + escape(
    "bg-garden-card text-white font-bold",
    true
  )}">${validate_component(Network, "Network").$$render($$result, { class: "w-3.5 h-3.5 text-emerald-400" }, {}, {})} <span data-svelte-h="svelte-1uc4yqe">Grafo Local</span></button> <button class="${"px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 " + escape(
    "text-garden-muted hover:text-white",
    true
  )}">${validate_component(Link_2, "Link2").$$render($$result, { class: "w-3.5 h-3.5 text-sky-400" }, {}, {})} <span>Menciones (${escape(backlinks.length)})</span></button></div> <button class="p-1 rounded hover:bg-garden-surface text-garden-muted hover:text-white transition-colors" title="Ocultar Panel">${validate_component(Panel_right_close, "PanelRightClose").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div> <div class="p-4 space-y-6 overflow-y-auto flex-grow"> ${`<div class="space-y-4"><div class="text-xs font-bold text-white flex items-center justify-between" data-svelte-h="svelte-9bhxgj"><span>Vista de Nodos Enlazados</span> <span class="text-[10px] text-garden-muted font-mono">Arrastra para mover</span></div> ${activeNote ? `${validate_component(LocalGraph, "LocalGraph").$$render($$result, { activeNote, allNotes: notes }, {}, {})}` : ``}  <div><h4 class="text-xs font-bold text-white mb-2 flex items-center justify-between"><span data-svelte-h="svelte-1lsztax">Enlaces Salientes</span> <span class="text-[10px] bg-garden-surface px-1.5 py-0.5 rounded text-emerald-400 font-mono">${escape(extractedLinks.length)}</span></h4> ${extractedLinks.length === 0 ? `<p class="text-xs text-garden-muted/70 italic" data-svelte-h="svelte-g1gs53">No hay wikilinks en este documento.</p>` : `<div class="space-y-1">${each(extractedLinks, (link) => {
    return `<button class="w-full text-left p-2 rounded-lg bg-garden-surface/80 hover:bg-garden-card border border-garden-border/60 text-xs text-emerald-300 font-medium flex items-center justify-between transition-colors"><span class="truncate"><span class="text-emerald-400 font-mono" data-svelte-h="svelte-1mui4tr">[[</span>${escape(link.displayTitle)}<span class="text-emerald-400 font-mono" data-svelte-h="svelte-1cacx0v">]]</span></span> <span class="text-[10px] text-garden-muted" data-svelte-h="svelte-wiao9k">Ir →</span> </button>`;
  })}</div>`}</div></div> `}</div></aside></div>`;
});
export {
  Page as default
};
