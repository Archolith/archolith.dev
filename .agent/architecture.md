# archolith.dev — Architecture

## Overview

archolith.dev is the marketing homepage for the Archolith suite — self-hosted graph memory and context tooling for AI agents. The site is a single-page static HTML file with vanilla JavaScript components. No build system, no framework, no server-side rendering.

Launch positioning leads with **menhir**. `archolith-context` is presented as a future research direction, not the flagship.

The hero and the architecture stack both run **one layer per product**, in the same order.
Layers map to products, never to sub-components of a single product.

The site currently presents five Archolith products:
1. **menhir** (launch) — Graph-based long-term memory on Neo4j + Graphiti, served over MCP; includes the code graph and retention lifecycle
2. **archolith-filter** (alpha) — Layer 0 pre-filter pipeline; nine format-switch strategies for token reduction
3. **archolith-skree** (beta install path) — MCP token usage audit system; waste detection and report cards
4. **archolith-bench** (benchmark) — Reproducible benchmark suite; keeps public claims tied to tracked evidence
5. **archolith-context** (coming) — Curated-context proxy at the request boundary; experimental, not part of launch

The hero section features an interactive scroll-excavation animation built with vanilla JS that reveals geological strata layers as the user scrolls, each representing a product/suite layer.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Static HTML5 |
| Styling | Hand-written CSS (no preprocessor) |
| Scripting | Vanilla JavaScript (no framework) |
| Fonts | Self-hosted WOFF2 — Space Grotesk, IBM Plex Sans, IBM Plex Serif, IBM Plex Mono, JetBrains Mono (latin + latin-ext subsets, `fonts/` dir, served with `Cache-Control: immutable`) |
| Hosting | Caddy `file_server` on VPS (147.93.132.141), Cloudflare proxy |
| Analytics | Cloudflare dashboard/Web Analytics only; no on-page Google Analytics tag |
| Build | None — deploy `index.html` + assets as-is |
| TLS | Let's Encrypt via Caddy auto-HTTPS (Cloudflare Full strict) |

## Data Flow

```
User loads index.html
│
├── CSS loaded: inline styles + hero/archolith-hero.css?v=20260707a + fonts/fonts.css (self-hosted)
├── Nav logo SVG preloaded via <link rel="preload">
├── Hero JS deferred (preserves execution order):
│   ├── sliceDefinitions.js → layer definitions (name, depth, measure)
│   ├── StrataSlice.js → individual strata band component
│   ├── StrataField.js → full strata field orchestration
│   └── ArcholithHero.js → mounts hero into #archolith-hero-root
│
├── DOMContentLoaded fires:
│   ├── Hero mount (ArcholithHero.mount)
│   └── Type system switcher (3 presets: grotesk / sans / serif)
│
└── Cloudflare remains in the request path for hosting, security, logs, and optional Web Analytics
```

## Performance Optimizations

| Technique | Detail |
|-----------|--------|
| Font CSS non-blocking | `<link rel="preload" as="style" onload>` for `fonts/fonts.css` — eliminates render-blocking |
| Nav logo preload | `<link rel="preload" as="image">` for `logos/05-strata-column.svg` (S5, LCP candidate) |
| Deferred hero scripts | All 5 hero JS files use `defer` to preserve execution order without blocking HTML parse |
| Consolidated inline JS | Three separate IIFEs merged into single `DOMContentLoaded` listener (ensures deferred scripts are available) |
| Self-hosted fonts | `fonts/fonts.css` + 38 WOFF2 files (latin + latin-ext only); no cross-origin font fetch |
| Hero space reservation | `#archolith-hero-root { min-height: 430vh }` prevents desktop CLS from JS-mounted hero; mobile Lighthouse CLS measured 0.072 |

### PageSpeed Baseline (mobile, 2026-06-02)

| Metric | Value | Rating |
|--------|-------|--------|
| FCP | 2.9s | Poor |
| LCP | 4.2s | Poor |
| TBT | 150ms | Okay |
| CLS | 0 | Good |
| SI | 4.8s | Poor |

### Lighthouse After Optimizations (mobile, local lab, 2026-07-07)

Measured with Lighthouse 13.4.0 against `http://127.0.0.1:8765/` using the default mobile profile in HeadlessChrome 149. This is a local lab measurement, not a production PageSpeed Insights / Cloudflare edge result.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Performance score | n/a | 93 | Launch-acceptable mobile lab score |
| FCP | 2.7s | 1.4s | Self-hosted fonts + non-blocking load |
| LCP | 2.7s | 3.0s | Needs improvement; hero content is still the primary paint path |
| TBT | 50ms | 0ms | No blocking task issue in local lab |
| CLS | 1.001 | 0.072 | Good; remaining shift comes from JS-mounted mobile hero layout |
| SI | 2.7s | 1.4s | Improved |

### Lighthouse Desktop Sanity Check (local lab, 2026-07-07)

| Metric | Value |
|--------|-------|
| Performance score | 100 |
| FCP | 0.4s |
| LCP | 0.6s |
| TBT | 0ms |
| CLS | 0.001 |
| SI | 0.4s |

### Remaining Optimization Opportunities

- **Inline critical CSS** — extract nav + hero first-paint CSS into `<style>` in `<head>` (already partially done — inline `<style>` block exists)
- **Cache-busting query strings** — hero JS/CSS uses `?v=20260707a` to avoid Cloudflare/browser cache staleness on launch updates; bump the value whenever launch-visible hero assets change
- **Reduced motion** — `prefers-reduced-motion: reduce` disables scroll/key-driven hero motion and presents the strata as a static layout
- **Production performance check** — rerun Lighthouse/PageSpeed against the deployed Cloudflare URL after the next deploy; current numbers are local-lab only
- **Mobile CLS polish** — current CLS 0.072 is good, but the remaining shift is from the mobile JS-mounted hero replacing the reserved root

## Key Components

### Hero — Scroll Excavation (`hero/`)

The signature visual element. A 420vh scrollable section where geological strata bands compress/expand based on scroll position. The active band expands (1.7x flex), passed bands compress (0.6x flex, 0.4 opacity), and future bands show "(coming)" labels.

- `ArcholithHero.js` — Mounts the hero component, creates DOM structure
- `StrataField.js` — Orchestrates all strata bands, handles scroll events
- `StrataSlice.js` — Individual band component with CSS clip-paths and textures
- `sliceDefinitions.js` — Live layer definitions; no TypeScript source or build step

When `prefers-reduced-motion: reduce` is active, `ArcholithHero.js` skips scroll, spacebar, and smooth-scroll bindings. `archolith-hero.css` then renders the hero as a static non-sticky layout with all strata visible and decorative scan/seam animation disabled.

### Logo System (`logos/`)

5 SVG logo candidates ranked in `logos/README.md`:
1. **K8** — Dropping keystone (primary, narrative strongest)
2. **K2** — Minimal keystone (best for favicon)
3. **K1** — Classic keystone (safest primary mark)
4. **D4** — Doorway (non-keystone branch)
5. **S5** — Strata column (supporting-system mark)

Logo exploration variants and utility HTML files were archived outside the public `archolith.dev` repo on 2026-07-07.

### Logo Switcher

Client-side logo switcher in `index.html`. Toggles `data-logo` attribute on `<body>`, swaps nav logo and hero logo `src`, updates active button state. 5 options: k8, k2, k1, doorway, strata.

### Type System Switcher

Three typography presets toggled via `data-type` attribute on `<body>`:
- **grotesk** (default): Space Grotesk display + IBM Plex Sans body
- **sans**: All IBM Plex Sans
- **serif**: IBM Plex Serif display + IBM Plex Sans body

### Content Sections

The public body content is wrapped in `<main id="main" tabindex="-1">`, with a keyboard-visible skip link before the fixed nav.

1. **Hero** — Scroll-excavation strata animation
2. **Problem** — "The broken model" — cold-start memory loss stats
3. **Mechanism** — 5-step memory pipeline (ingest → extract → anchor → recall → lifecycle)
4. **Architecture** — 5-slab product stack (menhir, filter, skree, peira, context) mirroring the hero order
5. **Demo** — Side-by-side recall comparison (cold start vs. menhir); illustrative, not benchmarked
6. **Install** — Visible archolith-skree one-command installer copy for Claude, Codex, and OpenCode
7. **Quickstart** — Hidden via `display:none` (pre-launch)
8. **Footer** — Links point to current Archolith org/repo/license/privacy targets; `archolith-peira` remains provisional until an org-owned repo exists

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
3. Preview the static payload: `.\scripts\deploy.ps1 -PlanOnly`
4. Copy the static payload to the VPS: `.\scripts\deploy.ps1`
5. No container restart needed — Caddy serves files directly from disk

### Cloudflare Cache Notes

- Hero JS/CSS references include `?v=20260707a`; bump this value when changing launch-visible hero assets.
- Cloudflare caches JS/CSS aggressively. If a file changes without a query-string bump, purge the CF cache or wait for revalidation.
- Caddy ETag changes on file update, but CF may serve stale content until revalidation.

### Pre-Launch State

- Public links point to Archolith org/repo/license/privacy targets where available
- Quickstart section hidden via `display:none`
- First-run instructions are not ready; do not restore "Run it" / "Quickstart" prompts until they are launch-safe

## External Dependencies

- **Cloudflare** — DNS/proxy, TLS edge, caching, request logs, and optional Web Analytics/performance metrics.
- No on-page Google Analytics or advertising tags. Fonts are self-hosted (see Tech Stack).
