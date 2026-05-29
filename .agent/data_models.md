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

Defines the geological strata layers used in the scroll-excavation hero. Each slice has:
- `id` — unique identifier
- `name` — display name
- `description` — short description revealed on active state
- `measure` — depth/unit annotation
- `layer` — numeric index (0–5) controlling CSS `data-layer` color/texture
- `state` — `"active"` | `"passed"` | `"future"` (set dynamically by scroll)

## Slice Annotations (`hero/SliceAnnotations.js`)

Per-layer annotation data paired with slice definitions. Provides expanded descriptions and metadata for the hero copy panel that updates as the user scrolls.

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

## Repository Reference

No database. All state is client-side DOM and CSS class toggles. Site is fully static — deploy by serving files from any static host.
