import { marked } from 'marked';
import { slugify } from './wikilinks';

// Configure marked with full GFM (GitHub Flavored Markdown) support
marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

// Custom Link Renderer (Supports standard markdown links [text](url))
renderer.link = function (href: string, title: string | null | undefined, text: string) {
  const titleAttr = title ? `title="${title}"` : '';
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${href}" ${titleAttr} ${target} class="markdown-link">${text}</a>`;
};

// Custom Image Renderer (![alt](url))
renderer.image = function (href: string, title: string | null | undefined, text: string) {
  const titleAttr = title ? `title="${title}"` : '';
  return `<img src="${href}" alt="${text || ''}" ${titleAttr} class="markdown-img rounded-xl my-4 border border-garden-border max-w-full h-auto shadow-md" />`;
};

// Custom Table Renderer (| Col 1 | Col 2 |)
renderer.table = function (header: string, body: string) {
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

renderer.tablerow = function (content: string) {
  return `<tr>${content}</tr>`;
};

renderer.tablecell = function (content: string, flags: { header?: boolean; align?: 'center' | 'left' | 'right' | null }) {
  const type = flags.header ? 'th' : 'td';
  const align = flags.align ? `text-${flags.align}` : '';
  return `<${type} class="px-3 py-2 ${align} border-r border-garden-border/40 last:border-r-0">${content}</${type}>`;
};

// Custom Checkbox / Task List Item Renderer (- [ ] or - [x])
renderer.checkbox = function (checked: boolean) {
  return `<input type="checkbox" ${checked ? 'checked' : ''} disabled class="mr-2 rounded text-emerald-500 accent-emerald-500 pointer-events-none" />`;
};

// Custom Code Block Renderer (```lang ... ```)
renderer.code = function (code: string, infostring: string | undefined) {
  const languageClass = infostring ? `language-${infostring}` : '';
  return `<pre class="bg-garden-surface border border-garden-border rounded-xl p-4 my-4 overflow-x-auto text-xs font-mono text-emerald-300"><code class="${languageClass}">${code}</code></pre>`;
};

// Custom Inline Code Renderer (`code`)
renderer.codespan = function (code: string) {
  return `<code class="bg-garden-surface/80 border border-garden-border px-1.5 py-0.5 rounded text-emerald-300 font-mono text-xs">${code}</code>`;
};

marked.use({ renderer });

/**
 * Render raw Markdown text to HTML with custom [[wikilinks]] parsing.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  // Parse [[wikilinks]] before passing to marked
  // Replaces [[Target Title]] or [[Target Title|Custom Label]] with wikilink HTML
  const parsedWikilinks = markdown.replace(/\[\[(.*?)\]\]/g, (match, inner) => {
    const parts = inner.split('|');
    const targetTitle = parts[0].trim();
    const displayTitle = parts[1] ? parts[1].trim() : targetTitle;
    const targetSlug = slugify(targetTitle);

    return `<a href="#${targetSlug}" class="wikilink font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 transition-colors cursor-pointer" data-slug="${targetSlug}" title="Ir a la nota: ${displayTitle}">[[${displayTitle}]]</a>`;
  });

  try {
    return marked.parse(parsedWikilinks) as string;
  } catch (err) {
    console.error('Error parsing markdown:', err);
    return parsedWikilinks;
  }
}
