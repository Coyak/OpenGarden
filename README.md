# 🌱 OpenGarden — Plataforma SaaS Digital Garden as a Service (DGaaS)

[![Framework](https://img.shields.io/badge/Framework-SvelteKit%202.0-FF3E00.svg)](https://kit.svelte.dev)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8.svg)](https://tailwindcss.com)
[![Graph](https://img.shields.io/badge/Data%20Viz-D3.js%20(Force%20Simulation)-F9A03F.svg)](https://d3js.org)
[![Backend](https://img.shields.io/badge/Backend-Supabase%20(PostgreSQL%20%2B%20RLS)-3ECF8E.svg)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**OpenGarden** es una plataforma SaaS de vanguardia orientada al cultivo no lineal del conocimiento (*Digital Garden as a Service*). Diseñada bajo la metodología **Zettelkasten**, permite redactar en Markdown con formato estilo Notion, interconectar conceptos mediante enlaces bidireccionales (`[[wikilinks]]`), visualizar el conocimiento en un grafo de red interactivo con D3.js y publicar espacios públicos o privados en la web.

---

## 🌟 Características Principales

### 🌿 1. Metodología Zettelkasten & Clasificación Atómica
- **Notas Efímeras (Seed / 🌱)**: Captura rápida de pensamientos, conceptos embrionarios y notas al vuelo.
- **Notas de Literatura (Growing / 🌿)**: Resúmenes sintetizados de fuentes externas, lecturas y referencias bibliográficas.
- **Notas Permanentes (Evergreen / 🌲)**: Conocimiento autónomo, atómico e interconectado a largo plazo.
- **Iconografía Vectorial Novedosa**: Sistema 100% libre de emojis utilizando únicamente iconos SVG oficiales de `lucide-svelte` (`Sprout`, `Leaf`, `TreeDeciduous`).

### ⚡ 2. Editor Markdown en Tiempo Real Estilo Notion
- **Soporte Completo GFM (GitHub Flavored Markdown)**:
  - Encabezados amplios (`# H1`, `## H2`, `### H3`).
  - Listas ordenadas, desordenadas (`- `) y listas de tareas (`- [ ]`, `- [x]`).
  - Bloques de cita (`> `) con borde verde salvia y código fuente (`` `code` ``, ```` ````).
  - Tablas estilizadas (`| Col 1 | Col 2 |`) e imágenes responsivas (`![Alt](url)`).
  - Enlaces externos con apertura segura en ventana independiente.
- **Detección Instantánea de Sintaxis**: Formateo fluido al presionar `Enter` o cambiar de bloque.
- **Autocompletado de `[[wikilinks]]`**: Al escribir `[[`, despliega un menú flotante en vivo para enlazar notas existentes.

### 🕸️ 3. Motor de Grafo Interactivo D3.js (Obsidian-Style)
- **Visualización de Redes**: Representación física con simulación de fuerzas (`d3-force`) de nodos y enlaces bidireccionales.
- **Manipulación e Interactividad**: Arrastre libre de nodos (`d3-drag`), zoom, resaltado de conexiones entrantes/salientes y cálculo dinámico de backlinks.
- **Inspector de Conexiones**: Panel lateral deslizable con selector de pestañas entre *Grafo Local* y *Menciones / Backlinks*.

### 📁 4. Gestor de Archivos Fluido con Drag & Drop Nativo
- **Reorganización en Tiempo Real**: Arrastra notas entre carpetas con auto-expansión reactiva de la carpeta receptora.
- **Soporte para "Notas Sueltas"**: Permite soltar archivos en la raíz desasignando su carpeta (`folder_id = null`) con actualización inmutable instantánea de los contadores.
- **Menú Unificado de Creación (`+`)**: Creación rápida de notas filtradas por etapa Zettelkasten o creación de nuevas categorías.

### 🌐 5. Publicación Pública & Marca Personal (DGaaS)
- **URL Pública Personalizada**: Publicación de jardines digitales en `/u/[username]`.
- **Seguridad RLS en Supabase**: Políticas de acceso a nivel de fila (*Row Level Security*) para diferenciar notas públicas de borradores privados.
- **Motor de Temas Orgánicos**: Alternancia entre paletas de color con CSS variables (`Obsidian Sage`, `Forest Warm`, `Sakura Slate`, `Cyberpunk Minimal`).

---

## 🛠️ Tech Stack & Arquitectura

```
                       ┌──────────────────────────────────────────┐
                       │          Cliente Web SvelteKit 2         │
                       │   TypeScript + Tailwind CSS + Lucide     │
                       └────────────────────┬─────────────────────┘
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼                                           ▼
       ┌─────────────────────────────┐             ┌─────────────────────────────┐
       │   Motor Editor & Parser GFM │             │   Visualizador de Grafo D3  │
       │   Marked + Wikilink Engine  │             │   d3-force + d3-drag (SVG)  │
       └─────────────────────────────┘             └─────────────────────────────┘
                                            │  Supabase Auth / REST API
                                            ▼
                       ┌──────────────────────────────────────────┐
                       │       Base de Datos Persistente          │
                       │     PostgreSQL + Supabase RLS Policies   │
                       └──────────────────────────────────────────┘
```

| Capa | Tecnología |
| :--- | :--- |
| **Frontend Framework** | SvelteKit 2.0, TypeScript, Vite |
| **Estilos & UI** | Tailwind CSS, Lucide Svelte (Iconos Vectoriales SVG) |
| **Visualización de Datos** | D3.js (`d3-force`, `d3-drag`, `d3-selection`) |
| **Parser Markdown** | Marked (GFM Specification), Wikilink Custom Parser |
| **Backend & Base de Datos** | Supabase (PostgreSQL, Supabase Auth, Row Level Security) |

---

## 📁 Estructura del Proyecto

```text
OpenGarden/
├── .gitignore              # Exclusiones de Git (node_modules, .env, build, .svelte-kit)
├── README.md               # Documentación principal del proyecto
├── package.json            # Dependencias y scripts del proyecto
├── svelte.config.js        # Configuración del SvelteKit Adapter
├── tailwind.config.cjs     # Configuración de Tailwind CSS con temas dinámicos
├── vite.config.ts          # Configuración del servidor de desarrollo Vite
├── supabase/
│   └── schema.sql          # Esquema de base de datos PostgreSQL, RLS y disparadores
└── src/
    ├── app.css             # Estilos globales, variables CSS de temas y tipografía GFM Notion
    ├── lib/
    │   ├── components/
    │   │   ├── editor/
    │   │   │   ├── NotionEditor.svelte     # Editor Markdown GFM con autocompletado [[wikilinks]]
    │   │   │   └── NotionBlockEditor.svelte# Componente alternativo por bloques
    │   │   ├── graph/
    │   │   │   └── LocalGraph.svelte       # Grafo interactivo D3.js para la barra lateral
    │   │   ├── landing/
    │   │   │   ├── GardenConcept.svelte    # Sección explicativa Zettelkasten
    │   │   │   ├── GraphDemo.svelte       # Grafo interactivo de la portada (Landing)
    │   │   │   └── Hero.svelte            # Encabezado principal de la landing page
    │   │   └── navigation/
    │   │       └── FolderTree.svelte       # Navegador de carpetas con Drag & Drop reactivo
    │   ├── supabase/
    │   │   └── client.ts                   # Inicialización del cliente Supabase browser/SSR
    │   ├── types/
    │   │   └── database.types.ts           # Definiciones TypeScript de notas, carpetas y grafos
    │   └── utils/
    │       ├── markdown.ts                # Renderizador completo GFM Marked
    │       └── wikilinks.ts               # Extractor de wikilinks y generador de slugs
    └── routes/
        ├── +layout.svelte                # Layout global con Header y selector de temas
        ├── +page.svelte                  # Landing page de presentación
        ├── app/
        │   └── +page.svelte              # Dashboard principal de gestión Zettelkasten
        ├── login/
        │   └── +page.svelte              # Vista de inicio de sesión
        ├── onboarding/
        │   └── +page.svelte              # Asistente de bienvenida para nuevos usuarios
        ├── register/
        │   └── +page.svelte              # Registro de usuarios
        └── u/
            └── [username]/
                └── +page.svelte          # Vista pública del Jardín Digital
```

---

## 🚀 Guía de Instalación y Ejecución Rápida

### 1. Clonar el repositorio e instalar dependencias

```bash
# Clonar repositorio
git clone https://github.com/Coyak/OpenGarden.git
cd OpenGarden

# Instalar dependencias del proyecto
npm install
```

### 2. Configurar las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en la plantilla:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-supabase
```

### 3. Configurar la Base de Datos Supabase (PostgreSQL)

Ejecuta las sentencias contenidas en `supabase/schema.sql` desde el Editor SQL de tu panel Supabase para crear las tablas, índices y políticas de seguridad RLS.

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Accede a la aplicación en tu navegador en: **`http://localhost:5173`**

### 5. Verificar Tipos y Compilar para Producción

```bash
# Diagnóstico de TypeScript / Svelte
npm run check

# Compilación bundle de producción
npm run build
```

---

## 🗄️ Esquema de Base de Datos (Supabase PostgreSQL)

El sistema utiliza 4 tablas interrelacionadas con políticas **Row-Level Security (RLS)**:

- `profiles`: Perfil de usuario con `username`, `display_name`, `avatar_url` y `bio`.
- `folders`: Estructura jerárquica de categorías y carpetas (`parent_id`).
- `notes`: Documentos Zettelkasten con `stage` (`seed`, `growing`, `evergreen`), `title`, `slug`, `content` e `is_public`.
- `note_links`: Registro de conexiones bidireccionales extraídas de los `[[wikilinks]]`.

---

## 📡 Referencia de Rutas de la Aplicación

| Ruta | Descripción | Acceso |
| :--- | :--- | :--- |
| `/` | Landing Page con demostración interactiva de grafo D3 | Público |
| `/login` | Inicio de sesión mediante email/OAuth GitHub | Público |
| `/register` | Creación de cuenta de usuario | Público |
| `/onboarding` | Asistente de configuración inicial del jardín | Autenticado |
| `/app` | Dashboard principal de edición Zettelkasten y navegador | Autenticado |
| `/u/[username]` | Vista pública del Jardín Digital del usuario | Público |

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Siéntete libre de utilizarlo, modificarlo y contribuir al ecosistema del conocimiento libre.
