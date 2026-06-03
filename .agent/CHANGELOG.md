# Changelog — archolith.dev

## 2026-06-03 — Docs: update architecture.md and README with deployment and performance details

- Updated `architecture.md` with VPS deployment section (paths, Caddy config, DNS/TLS, Cloudflare cache notes, deploy workflow, pre-launch state)
- Updated `architecture.md` with performance optimizations section (preload, defer, DOMContentLoaded, PageSpeed baseline, remaining opportunities)
- Updated `architecture.md` product list from three to four (context, rtk, bench, filter)
- Updated `architecture.md` data flow to reflect deferred scripts and DOMContentLoaded
- Updated `architecture.md` content sections to note hidden quickstart and neutralized links
- Updated `architecture.md` external dependencies to reflect GA and remove stale GitHub link
- Updated `README.md` with deployment reference pointer

## 2026-06-02 — VPS deployment, content updates, pre-launch neutralization, performance optimizations

- Deployed site to VPS at `/var/www/html/archolith-dev/` via Caddy `file_server`
- Added `archolith.dev` Caddyfile block with security headers and `@assets` cache-control
- Obtained Let's Encrypt cert (grey-cloud DNS dance, then re-enabled Cloudflare proxy)
- Updated site content: four packages, archolith-bench slab, updated context/RTK/mechanism slabs
- Neutralized all outbound links → `href="#"` for pre-launch
- Hidden quickstart section via `display:none`
- Added Google Analytics gtag.js tag (G-4MPBP8827S)
- Performance optimizations: preload fonts CSS, preload nav logo SVG, defer hero scripts, consolidate inline JS into DOMContentLoaded
- Commits: fee8aaf, c98d5e4, 3d7fe9b, 2f9d0d3

## 2026-05-23 — Agent scaffolding and docs population

- Added `.agent/` directory with full project documentation (README, architecture, data_models, code_conventions, CHANGELOG)
- Added LLM instruction files (CLAUDE.md, AGENTS.md, gemini.md, QWEN.md, .cursorrules, .windsurfrules, .clinerules, .github/copilot-instructions.md)
- Added `.githooks/pre-push` and configured `core.hooksPath`
- Populated all `.agent/` docs with real project content

## Prior — Homepage v05

- v05 bold color refinement pass (screenshots: v05-bold-L0 through v05-bold-L5)
- v04 color exploration (screenshots: v04-color-L0 through v04-color-L5)
- v03 texture + split scroll refinement (screenshots: v03-tex, v03-split)

## Prior — Homepage v02

- Scroll-excavation hero with strata bands
- Nav bar and hero integration
- Initial responsive breakpoints

## Prior — Homepage v01

- Initial single-page site with problem, mechanism, architecture, demo, quickstart, footer sections
- Logo system with 5 SVG candidates
- Type system switcher (3 presets)
- Screenshot documentation (v02-hero, v02-live)
