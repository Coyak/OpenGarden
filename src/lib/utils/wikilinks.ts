/**
 * Utility functions for parsing and handling wikilinks [[Note Title]] in Markdown
 */

export interface ExtractedWikilink {
  raw: string;
  targetTitle: string;
  displayTitle: string;
  slug: string;
}

/**
 * Converts a note title into a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '')     // Remove non-alphanumeric chars
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/-+/g, '-');            // Collapse multiple hyphens
}

/**
 * Extracts all [[wikilink]] references from a markdown content block
 */
export function extractWikilinks(content: string): ExtractedWikilink[] {
  const regex = /\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g;
  const links: ExtractedWikilink[] = [];
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

/**
 * Transforms [[wikilinks]] inside markdown into rendered HTML links
 */
export function processWikilinks(
  content: string, 
  baseUrl: string = '', 
  existingSlugs: Set<string> = new Set()
): string {
  return content.replace(/\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g, (match, targetTitle, alias) => {
    const title = targetTitle.trim();
    const display = alias ? alias.trim() : title;
    const slug = slugify(title);
    const href = baseUrl ? `${baseUrl}/${slug}` : `#${slug}`;
    const exists = existingSlugs.size === 0 || existingSlugs.has(slug);
    const linkClass = exists 
      ? 'wikilink text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-medium transition-colors' 
      : 'wikilink wikilink-new text-amber-400 hover:text-amber-300 underline underline-offset-4 border-b border-dashed border-amber-400/50';

    return `<a href="${href}" class="${linkClass}" data-slug="${slug}">${display}</a>`;
  });
}
