# Changelog — archolith.dev

## 2026-07-20 — Reposition launch around `menhir`, demote `archolith-context`

Site previously led with `archolith-context` (the proxy) as the flagship and showed
`menhir` as a dimmed "coming" slab. Launch is menhir, so the narrative was inverted.

- `hero/sliceDefinitions.js` — rewrote all slices as **one layer per product**: L0 `menhir` (launch), L1 `archolith-filter`, L2 `archolith-skree`, L3 `archolith-peira`, L4 `archolith-context` (coming). Five slices, down from six. Layers name products; menhir's internals (code graph, lifecycle) are described inside its own slice rather than split across layers.
- `hero/ArcholithHero.js` — new headline ("Agents that / remember / their work."), tagline, brand kicker, and four beats; primary CTA now points at `#system` instead of the demo. Headline is hard-broken to three lines: the copy column renders ~348px at 64px bold, so any line longer than roughly "what they" wraps — keep replacement lines at or under that width or the headline silently grows a fourth line.
- `hero/archolith-hero.css` — realigned plate-texture selectors to the product slice ids (`surface`→`audit`, `memory`→`menhir`, `foundation`→`bench`, `proxy` reassigned to the blue plate). Removed the orphaned green `session`/`lifecycle` block. Textures are authored per accent color; accents were assigned to preserve each pairing. Note the pre-existing state was already mismatched — 3 of 6 slices had no texture at all — so all five now resolve.
- `index.html` — new `<title>` + meta description; problem section reframed from replay cost to cold-start memory loss (4 new stat cells); mechanism sequence retargeted from the 5-step proxy pipeline to the 5-step memory pipeline; architecture stack is one slab per product mirroring the hero order, leading with `menhir` badged `launch` and ending with `archolith-context` badged `coming`; demo reframed from token-cost comparison to cold-start-vs-recall; install heading now leads with menhir self-host requirements; hidden quickstart rewritten for menhir; footer tagline, product order, and docs links updated. Bumped hero cache-buster to `?v=20260720a`.
- `README.md`, `.agent/architecture.md` — product table and section descriptions updated to the new ordering.
- `.agent/data_models.md` — corrected the slice field list (it documented `description`/`layer`/`state`, none of which exist) and documented the `id` ↔ `data-slice-key` ↔ CSS-texture coupling.

**Not done:** no public install path for menhir — its README still says "Private — not currently open source", so the install section keeps the working archolith-skree commands and states that menhir's public install lands with the release. Demo figures are labelled illustrative rather than benchmarked.

## 2026-07-08 — Fix visible paths for launch readiness

- `index.html` — Fixed 3 install script URLs from `main`→`master` (default branch); changed 4 broken `github.com/Archolith/menhir` footer links to plain text (repo not public); fixed polyform license URL (removed trailing slash, was 404); fixed archolith-peira link to `ctharvey/archolith-bench`.
- `README.md` — Fixed umbrella link from `ctharvey/archolith` (404) to `Archolith/archolith-context`; fixed 3 install script URLs from `main`→`master`.

## 2026-07-08 — Align durable memory naming: `menhir` not `archolith-menhir`

- `index.html` — replaced 3 `archolith-menhir` references with `menhir` (architecture slab, footer products list, footer docs list).
- `hero/sliceDefinitions.js` — replaced `archolith-menhir` with `menhir` in memory layer note.

## 2026-07-08 — Public product rename to Archolith Skree

- Verified site already uses `archolith-skree` in system section, install section, footer, and README.
- Remaining `archolith-mcp-audit` references are all GitHub repo URLs (allowed per compatibility contract).
- Quickstart section remains hidden; Gemini CLI deprecation note preserved in install copy.

## 2026-07-08 — archolith-skree installer copy

- `index.html` — added a visible install section for the new archolith-skree one-command installer covering Claude Code, Codex, and OpenCode while leaving the broader context quickstart hidden.
- `README.md` and `.agent/architecture.md` — documented the public audit installer copy and current content-section order.

## 2026-07-07 — Launch readiness cleanup and git-first deploy

- `index.html` — removed unsupported proxy headline numbers, replaced dead launch links, applied `archolith-<name>` public labels, removed public first-run prompts, removed Google Analytics, linked privacy notice, added hero asset cache-busting, and added a main landmark with a skip-to-content link.
- `hero/ArcholithHero.js` and `hero/archolith-hero.css` — added reduced-motion behavior that disables scroll/key-driven hero motion and renders the strata as a static layout.
- `.agent/architecture.md` and `README.md` — replaced stale PageSpeed TBD entries with a 2026-07-07 local Lighthouse baseline.
- `screenshots/` — kept four current public visual references and moved 40 design-iteration PNGs to the umbrella archive.
- `logos/` — kept the five named logo candidates plus `README.md` and moved 4 exploration variants plus 2 logo utility HTML files to the umbrella archive.
- `privacy.html` — added privacy notice disclosing Cloudflare analytics/logging and no-sale/no-sharing posture.
- `hero/ArcholithHero.js` and `hero/sliceDefinitions.js` — updated CTA targets, evidence-pending copy, and public family labels.
- `hero/sliceDefinitions.ts` — deleted dead diverged TypeScript design artifact; `sliceDefinitions.js` is the live source of truth.
- `hero/SliceAnnotations.js` — deleted dead annotation script and removed unused annotation CSS/docs references.
- `scripts/deploy.ps1` — added git-first static deploy script with payload preview and clean-tree guard.
- `README.md`, `.agent/architecture.md`, `.agent/data_models.md`, and `.agent/workflows/code_conventions.md` — documented the deploy script, current analytics posture, launch-state constraints, hero asset cache-busting rule, reduced-motion behavior, Lighthouse baseline, screenshot/logo curation rules, and live JS-only hero data source.

## 2026-07-05 — Correct experimental positioning and Menhir naming

- Replaced `archolith-memory` references with `menhir` across the homepage, hero, logo matrix, and docs.
- Removed unsupported predictive-prefetch claims and labeled graph-assembled context as experimental.
- Updated contributor and repository documentation for the current static-site workflow and product surface.

## 2026-06-03 — Perf: self-host fonts, fix CLS, non-blocking font load

- `fonts/` — added 38 WOFF2 files (5 families, latin + latin-ext subsets, 839 KB total)
- `fonts/fonts.css` — self-hosted @font-face declarations replacing Google Fonts CDN
- `index.html` — removed `preconnect` hints and Google Fonts `<link>` tags; replaced with `<link rel="stylesheet" href="fonts/fonts.css">`
- `index.html` — added `#archolith-hero-root { min-height: 430vh }` (desktop) and `calc(100vh + 620px)` (mobile <980px) to eliminate CLS from JS-mounted hero
- `yawn.deploy/Caddyfile` — set `Cache-Control: public, max-age=31536000, immutable` for `.woff2/.woff/.ttf` files on `archolith.dev`

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
