import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
import { marked } from "marked";
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function slugify(text) {
  return text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function extractWikilinks(content) {
  const regex = /\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[0];
    const targetTitle = match[1].trim();
    const displayTitle = match[2] ? match[2].trim() : targetTitle;
    links.push({
      raw,
      targetTitle,
      displayTitle,
      slug: slugify(targetTitle)
    });
  }
  return links;
}
marked.setOptions({
  gfm: true,
  breaks: true
});
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  const titleAttr = title ? `title="${title}"` : "";
  const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"));
  const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}" ${titleAttr} ${target} class="markdown-link">${text}</a>`;
};
renderer.image = function(href, title, text) {
  const titleAttr = title ? `title="${title}"` : "";
  return `<img src="${href}" alt="${text || ""}" ${titleAttr} class="markdown-img rounded-xl my-4 border border-garden-border max-w-full h-auto shadow-md" />`;
};
renderer.table = function(header, body) {
  return `<div class="overflow-x-auto my-4">
    <table class="w-full text-xs text-left border-collapse border border-garden-border rounded-xl">
      <thead class="bg-garden-surface text-white font-bold uppercase tracking-wider border-b border-garden-border">
        ${header}
      </thead>
      <tbody class="divide-y divide-garden-border/60 bg-garden-card/40">
        ${body}
      </tbody>
    </table>
  </div>`;
};
renderer.tablerow = function(content) {
  return `<tr>${content}</tr>`;
};
renderer.tablecell = function(content, flags) {
  const type = flags.header ? "th" : "td";
  const align = flags.align ? `text-${flags.align}` : "";
  return `<${type} class="px-3 py-2 ${align} border-r border-garden-border/40 last:border-r-0">${content}</${type}>`;
};
renderer.checkbox = function(checked) {
  return `<input type="checkbox" ${checked ? "checked" : ""} disabled class="mr-2 rounded text-emerald-500 accent-emerald-500 pointer-events-none" />`;
};
renderer.code = function(code, infostring) {
  const languageClass = infostring ? `language-${infostring}` : "";
  return `<pre class="bg-garden-surface border border-garden-border rounded-xl p-4 my-4 overflow-x-auto text-xs font-mono text-emerald-300"><code class="${languageClass}">${code}</code></pre>`;
};
renderer.codespan = function(code) {
  return `<code class="bg-garden-surface/80 border border-garden-border px-1.5 py-0.5 rounded text-emerald-300 font-mono text-xs">${code}</code>`;
};
marked.use({ renderer });
function renderMarkdown(markdown) {
  if (!markdown) return "";
  const parsedWikilinks = markdown.replace(/\[\[(.*?)\]\]/g, (match, inner) => {
    const parts = inner.split("|");
    const targetTitle = parts[0].trim();
    const displayTitle = parts[1] ? parts[1].trim() : targetTitle;
    const targetSlug = slugify(targetTitle);
    return `<a href="#${targetSlug}" class="wikilink font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 transition-colors cursor-pointer" data-slug="${targetSlug}" title="Ir a la nota: ${displayTitle}">[[${displayTitle}]]</a>`;
  });
  try {
    return marked.parse(parsedWikilinks);
  } catch (err) {
    console.error("Error parsing markdown:", err);
    return parsedWikilinks;
  }
}
export {
  Search as S,
  extractWikilinks as e,
  renderMarkdown as r,
  slugify as s
};
