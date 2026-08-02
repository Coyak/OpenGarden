# OpenGarden 🌱 — Digital Garden as a Service (DGaaS)

> A modern, non-linear knowledge platform built with SvelteKit, D3.js, Tailwind CSS, and Supabase. Cultivate your thoughts with Zettelkasten methodology, bidirectionally linked notes (`[[wikilinks]]`), Notion-style live block editing, and an interactive knowledge graph.

---

## ✨ Core Features

- 🌿 **Zettelkasten Methodology System**: Organize notes into atomic stages:
  - 🌱 **Seed Notes (Fleeting / Efímeras)**: Rapid capture of thoughts and ideas.
  - 🌿 **Literature Notes (Literatura)**: Summaries of external sources and readings.
  - 🌲 **Evergreen Notes (Permanentes)**: Autonomous, synthesized knowledge.
- ⚡ **Notion-Style Live Markdown Editor**: Write with full GFM specification support, instant `#`, `##`, `-`, `>`, and `[[wikilink]]` parsing, live preview toggles, and autocompletion popovers.
- 🕸️ **Interactive Obsidian-Style D3 Force Graph**: Visualize bidirectionally connected notes in an interactive, draggable network graph (`LocalGraph.svelte` & `GraphDemo.svelte`).
- 📁 **Fluid File Manager**: Drag and drop notes between custom categories and root "Notas Sueltas" with instant reactivity and auto-expanding folders.
- 🌐 **Public Digital Garden Publishing**: Share your public garden with clean URLs (`/u/[username]`) protected by Supabase Row-Level Security (RLS).
- 🎨 **Multi-Theme Aesthetic System**: Organic paper-dark themes tailored for focus (`Obsidian Sage`, `Forest Warm`, `Sakura Slate`, `Cyberpunk Minimal`).

---

## 🚀 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) + TypeScript + Vite
- **Styling**: Tailwind CSS + `lucide-svelte` icons (0% emojis, 100% vector SVG icons)
- **Data Visualization**: [D3.js](https://d3js.org/) Force Simulation (`d3-force`, `d3-drag`, `d3-selection`)
- **Markdown Processing**: Marked GFM Parser with custom Wikilink plugins
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Supabase Auth + Row-Level Security)

---

## 🛠️ Project Structure

```text
OpenGarden/
├── src/
│   ├── app.css                       # Global CSS, Obsidian dark themes & GFM typography
│   ├── lib/
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   └── NotionEditor.svelte     # Live GFM Markdown block editor with [[wikilinks]]
│   │   │   ├── graph/
│   │   │   │   └── LocalGraph.svelte       # Note-level interactive network graph
│   │   │   ├── landing/
│   │   │   │   ├── GardenConcept.svelte    # Zettelkasten introduction section
│   │   │   │   ├── GraphDemo.svelte       # Hero interactive force graph
│   │   │   │   └── Hero.svelte            # Landing page hero
│   │   │   └── navigation/
│   │   │       └── FolderTree.svelte       # Drag & drop folder hierarchy
│   │   ├── types/
│   │   │   └── database.types.ts           # Supabase & Zettelkasten TypeScript schemas
│   │   └── utils/
│   │       ├── markdown.ts                # Full GFM marked renderer wrapper
│   │       └── wikilinks.ts               # Wikilink parser & slug generator
│   └── routes/
│       ├── +layout.svelte                # Navigation header & theme provider
│       ├── +page.svelte                  # Landing page
│       ├── app/                          # Main Zettelkasten User Dashboard
│       ├── login/                        # Auth Login page
│       ├── onboarding/                   # Onboarding wizard
│       └── u/[username]/                 # Public Digital Garden view
└── supabase/
    └── schema.sql                        # PostgreSQL table schemas & RLS policies
```

---

## 🚦 Getting Started Locally

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/opengarden.git
   cd opengarden
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Type Check & Build Production Bundle:**
   ```bash
   npm run check
   npm run build
   ```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
