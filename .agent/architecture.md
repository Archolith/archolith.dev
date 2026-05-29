# archolith.dev — Architecture

## Overview

archolith.dev is the marketing homepage for the Archolith suite — a set of self-hosted context compression tools for LLMs. The site is a single-page static HTML file with vanilla JavaScript components. No build system, no framework, no server-side rendering.

The site presents three Archolith products:
1. **archolith-proxy** (stable) — OpenAI-compatible proxy on port 9800 that curates context instead of replaying full history
2. **archolith-memory** (stable) — Temporal knowledge graph on Neo4j with fact extraction via gpt-4.1-mini
3. **archolith-filter** (roadmap) — Post-assembly compression, dedup, token budgets

The hero section features an interactive scroll-excavation animation built with vanilla JS that reveals geological strata layers as the user scrolls, each representing a product/suite layer.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Static HTML5 |
| Styling | Hand-written CSS (no preprocessor) |
| Scripting | Vanilla JavaScript (no framework) |
| Fonts | Google Fonts — Space Grotesk, IBM Plex Sans, IBM Plex Serif, IBM Plex Mono, JetBrains Mono |
| Hosting | Static file serving (no server required) |
| Build | None — deploy `index.html` + assets as-is |

## Data Flow

```
User loads index.html
       │
       ├── CSS loaded: inline styles + hero/archolith-hero.css
       ├── Google Fonts loaded via <link>
       ├── Hero JS loaded:
       │   ├── sliceDefinitions.js  → layer definitions (name, depth, measure)
       │   ├── SliceAnnotations.js  → per-layer annotation data
       │   ├── StrataSlice.js       → individual strata band component
       │   ├── StrataField.js       → full strata field orchestration
       │   └── ArcholithHero.js     → mounts hero into #archolith-hero-root
       │
       ├── Logo switcher (5 SVG variants, client-side toggle)
       └── Type system switcher (3 presets: grotesk / sans / serif)
```

## Key Components

### Hero — Scroll Excavation (`hero/`)

The signature visual element. A 420vh scrollable section where geological strata bands compress/expand based on scroll position. The active band expands (1.7x flex), passed bands compress (0.6x flex, 0.4 opacity), and future bands show "(coming)" labels.

- `ArcholithHero.js` — Mounts the hero component, creates DOM structure
- `StrataField.js` — Orchestrates all strata bands, handles scroll events
- `StrataSlice.js` — Individual band component with CSS clip-paths and textures
- `SliceAnnotations.js` — Per-layer annotation data (label, description, measure)
- `sliceDefinitions.js` / `.ts` — Layer definitions (6 layers: 3 built products + 3 future)

### Logo System (`logos/`)

5 SVG logo candidates ranked in `logos/README.md`:
1. **K8** — Dropping keystone (primary, narrative strongest)
2. **K2** — Minimal keystone (best for favicon)
3. **K1** — Classic keystone (safest primary mark)
4. **D4** — Doorway (non-keystone branch)
5. **S5** — Strata column (supporting-system mark)

Plus 3 variants (05a, 05b, 05c, 05d) and utility HTML files:
- `showcase.html` — Visual comparison of all logos
- `color-matrix.html` — Color variant testing

### Logo Switcher

Client-side logo switcher in `index.html`. Toggles `data-logo` attribute on `<body>`, swaps nav logo and hero logo `src`, updates active button state. 5 options: k8, k2, k1, doorway, strata.

### Type System Switcher

Three typography presets toggled via `data-type` attribute on `<body>`:
- **grotesk** (default): Space Grotesk display + IBM Plex Sans body
- **sans**: All IBM Plex Sans
- **serif**: IBM Plex Serif display + IBM Plex Sans body

### Content Sections

1. **Hero** — Scroll-excavation strata animation
2. **Problem** — "The broken model" — linear replay cost stats
3. **Mechanism** — 5-step proxy pipeline (receive → query → assemble → forward → extract)
4. **Architecture** — 3-slab product stack (proxy, memory, filter)
5. **Demo** — Side-by-side benchmark comparison (direct vs. proxy)
6. **Quickstart** — 5-line setup instructions
7. **Footer** — Products, docs, source links

## Configuration / Environment Variables

None — this is a fully static site with no server-side configuration.

## External Dependencies

- **Google Fonts CDN** — loads 5 font families at runtime. If CDN is unreachable, falls back to system-ui/monospace.
- **GitHub** — links to `https://github.com/archolith/archolith-proxy` in nav and footer.
- No other external dependencies.
