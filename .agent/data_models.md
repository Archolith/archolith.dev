# archolith.dev — Data Models

This is a static HTML/CSS/JS site with no database, no API, and no server-side state. The "data models" are the JavaScript data structures that drive the interactive components.

## Logo Data (inline in index.html)

```javascript
var logos = {
  k8:      { short: "K8",  label: "K8 · dropping keystone",    path: "logos/01-k8-dropping-keystone.svg" },
  k2:      { short: "K2",  label: "K2 · minimal keystone",     path: "logos/02-k2-minimal-keystone.svg" },
  k1:      { short: "K1",  label: "K1 · classic keystone",     path: "logos/03-k1-classic-keystone.svg" },
  doorway: { short: "D4",  label: "D4 · doorway",             path: "logos/04-doorway.svg" },
  strata:  { short: "S5",  label: "S5 · strata column",       path: "logos/05-strata-column.svg" },
};
```

## Slice Definitions (`hero/sliceDefinitions.js`)

Defines the geological strata layers used in the scroll-excavation hero. **One slice per product**, ordered shallow → deep. Slices map to products, never to sub-components of a single product. Each slice has:
- `id` — unique identifier; emitted as `data-slice-key` by `StrataSlice.js`
- `layerId` — display label (`L0`–`L5`) shown in ticks, readout, and layer card
- `name` — display name
- `accent` — hex accent driving `--slice-accent` and the active seam/dot color
- `depth` — depth annotation (cosmetic)
- `measure` — right-aligned metric annotation
- `summary` — one-line hook shown on the active layer card
- `detail` — longer description shown on the active layer card
- `note` — product attribution line (e.g. `menhir / graph memory`)

**Coupling to watch:** `archolith-hero.css` defines per-slice plate textures via
`.strata-slice[data-slice-key="<id>"] .strata-slice__plate`. Renaming a slice `id`
silently drops its texture unless the matching CSS selector is renamed too. The
textures are authored per accent color, so keep `id` ↔ `accent` ↔ selector aligned.
Current ids: `menhir`, `filter`, `audit`, `bench`, `proxy` — five slices, five selectors,
no orphans on either side.

## CSS Custom Properties

The type system and color palette are driven by CSS custom properties on `:root` and `<body>`:

```css
:root {
  --bg: #0f141c;
  --bg-2: #161d28;
  --ink: #d6dde8;
  --accent: #6c8fbe;
  --f-display: "Space Grotesk", system-ui, sans-serif;
  --f-body: "IBM Plex Sans", system-ui, sans-serif;
  --f-mono: "JetBrains Mono", ui-monospace, monospace;
  --f-ui: "IBM Plex Mono", ui-monospace, monospace;
}
```

Type system overrides via `body[data-type]`:
- `data-type="grotesk"` → Space Grotesk display (default)
- `data-type="sans"` → IBM Plex Sans display
- `data-type="serif"` → IBM Plex Serif display

## Enums

No formal enums. State is managed via CSS classes:
- `.is-active` — expanded band in hero
- `.is-passed` — compressed/receded band
- `.is-future` — dimmed band with "(coming)" label
- `.is-reduced-motion` — hero scroll section mounted without scroll/key motion bindings when `prefers-reduced-motion: reduce` is active

## Repository Reference

No database. All state is client-side DOM and CSS class toggles. Site is fully static — deploy by serving files from any static host.
