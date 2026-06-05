# archolith.dev — Architecture

## Overview

archolith.dev is the marketing homepage for the Archolith suite — a set of self-hosted context compression tools for LLMs. The site is a single-page static HTML file with vanilla JavaScript components. No build system, no framework, no server-side rendering.

The site currently presents five Archolith products:
1. **archolith-context** (alpha) — Two-pass curator with circuit breaker and token budget; OpenAI-compatible proxy on port 9800
2. **archolith-filter** (alpha) — Layer 0 pre-filter pipeline; nine format-switch strategies for token reduction
3. **archolith-audit** (alpha) — MCP token usage audit system; waste detection and report cards
4. **archolith-bench** (benchmark) — Reproducible benchmark suite; generates the headline savings numbers
5. **archolith-memory** (coming) — Future long-term memory layer already represented on the homepage

The hero section features an interactive scroll-excavation animation built with vanilla JS that reveals geological strata layers as the user scrolls, each representing a product/suite layer.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Static HTML5 |
| Styling | Hand-written CSS (no preprocessor) |
| Scripting | Vanilla JavaScript (no framework) |
| Fonts | Self-hosted WOFF2 — Space Grotesk, IBM Plex Sans, IBM Plex Serif, IBM Plex Mono, JetBrains Mono (latin + latin-ext subsets, `fonts/` dir, served with `Cache-Control: immutable`) |
| Hosting | Caddy `file_server` on VPS (147.93.132.141), Cloudflare proxy |
| Analytics | Google Analytics (gtag.js, tag G-4MPBP8827S) |
| Build | None — deploy `index.html` + assets as-is |
| TLS | Let's Encrypt via Caddy auto-HTTPS (Cloudflare Full strict) |

## Data Flow

```
User loads index.html
│
├── CSS loaded: inline styles + hero/archolith-hero.css + fonts/fonts.css (self-hosted)
├── Nav logo SVG preloaded via <link rel="preload">
├── Hero JS deferred (preserves execution order):
│   ├── sliceDefinitions.js → layer definitions (name, depth, measure)
│   ├── SliceAnnotations.js → per-layer annotation data
│   ├── StrataSlice.js → individual strata band component
│   ├── StrataField.js → full strata field orchestration
│   └── ArcholithHero.js → mounts hero into #archolith-hero-root
│
├── DOMContentLoaded fires:
│   ├── Hero mount (ArcholithHero.mount)
│   └── Type system switcher (3 presets: grotesk / sans / serif)
│
└── Google Analytics (gtag.js, async)
```

## Performance Optimizations

| Technique | Detail |
|-----------|--------|
| Font CSS non-blocking | `<link rel="preload" as="style" onload>` for `fonts/fonts.css` — eliminates render-blocking |
| Nav logo preload | `<link rel="preload" as="image">` for `logos/05-strata-column.svg` (S5, LCP candidate) |
| Deferred hero scripts | All 5 hero JS files use `defer` to preserve execution order without blocking HTML parse |
| Consolidated inline JS | Three separate IIFEs merged into single `DOMContentLoaded` listener (ensures deferred scripts are available) |
| Self-hosted fonts | `fonts/fonts.css` + 38 WOFF2 files (latin + latin-ext only); no cross-origin font fetch |
| Hero space reservation | `#archolith-hero-root { min-height: 430vh }` prevents CLS from JS-mounted hero |

### PageSpeed Baseline (mobile, 2026-06-02)

| Metric | Value | Rating |
|--------|-------|--------|
| FCP | 2.9s | Poor |
| LCP | 4.2s | Poor |
| TBT | 150ms | Okay |
| CLS | 0 | Good |
| SI | 4.8s | Poor |

### PageSpeed After Optimizations (mobile, 2026-06-03)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| FCP | 2.7s | TBD | Self-hosted fonts + non-blocking load |
| LCP | 2.7s | TBD | Same |
| TBT | 50ms | TBD | |
| CLS | 1.001 | ~0 | Hero min-height reserves space |
| SI | 2.7s | TBD | |

### Remaining Optimization Opportunities

- **Inline critical CSS** — extract nav + hero first-paint CSS into `<style>` in `<head>` (already partially done — inline `<style>` block exists)
- **Cache-busting query strings** — add `?v=` to JS/CSS includes to avoid Cloudflare/browser cache staleness on updates

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
4. **Architecture** — 5-slab product stack (context, rtk, audit, bench, memory)
5. **Demo** — Side-by-side benchmark comparison (direct vs. proxy)
6. **Quickstart** — Hidden via `display:none` (pre-launch)
7. **Footer** — Links neutralized to `href="#"` (pre-launch)

## Deployment

### VPS Deployment

The site is served from the yawn VPS via Caddy's built-in `file_server`, not a separate Docker container.

| Item | Value |
|------|-------|
| VPS IP | `147.93.132.141` (user: `thron`) |
| VPS files | `/var/www/html/archolith-dev/` (mounted into Caddy at `/srv/static/archolith-dev`) |
| Caddy block | `archolith.dev` site block in `/srv/yawn/projects/yawn.deploy/Caddyfile` |
| Caddy container | `yawndeploy-caddy-1` |
| Compose dir | `/srv/yawn/projects/yawn.deploy/` |
| DNS | Cloudflare proxied (orange cloud); A record → VPS IP |
| TLS | Let's Encrypt auto-provisioned by Caddy; Cloudflare SSL mode: Full (strict) |
| Cache | Caddy sets `Cache-Control: max-age=300` on `@assets` route; Cloudflare caches JS/CSS aggressively (`max-age=14400`) |
| Volume mount | Uses existing `/var/www/html:/srv/static:ro` in docker-compose.yml — no separate volume needed |

### Deploy Workflow

1. Edit files locally in the git repo
2. Commit and push to `https://github.com/Archolith/archolith.dev.git`
3. Copy updated files to VPS: `scp index.html thron@147.93.132.141:/var/www/html/archolith-dev/`
4. No container restart needed — Caddy serves files directly from disk

### Cloudflare Cache Notes

- Cloudflare caches JS/CSS aggressively. After deploying updated files, purge the CF cache or wait for revalidation.
- Caddy ETag changes on file update, but CF may serve stale content until revalidation.

### Pre-Launch State

- All outbound links neutralized to `href="#"` (nav GitHub link, hero CTA buttons, footer links)
- Quickstart section hidden via `display:none`
- When repos go public: restore links, unhide quickstart, update `href="#"` to real URLs

## External Dependencies

- **Google Analytics** — gtag.js (tag `G-4MPBP8827S`), loaded async.
- No other external dependencies. Fonts are self-hosted (see Tech Stack).
