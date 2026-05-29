# Code Conventions — archolith.dev

## Style

### HTML

- **Indent**: 2 spaces
- **Max line length**: None enforced, but keep CSS property lines readable
- **Doctype**: HTML5 (`<!DOCTYPE html>`)
- **Single-page**: All content in `index.html` — no multi-page routing
- **Comments**: Use `<!-- ============ SECTION NAME ============ -->` separators

### CSS

- **Indent**: 2 spaces
- **Custom properties**: Define all colors, fonts, and spacing in `:root` CSS variables
- **Section comments**: Use `/* ============ SECTION NAME ============ */` separators
- **Naming**: BEM-like convention — `.block__element--modifier` where practical
  - `.nav__brand`, `.nav__links`, `.hero-copy__tagline`, `.stats__cell`, `.slab--primary`, `.slab--future`
- **State classes**: `.is-active`, `.is-passed`, `.is-future` — no `active` or `selected` standalone
- **Responsive**: Mobile-first breakpoints at 560px and 900px
- **No preprocessors**: Pure CSS, no Sass/Less/PostCSS

### JavaScript

- **No framework**: Vanilla JS only
- **No modules**: Scripts loaded via `<script>` tags (no bundler)
- **IIFE pattern**: Use `void function() { ... }();` for each self-contained feature
- **No ES modules**: Keep browser compatibility broad
- **DOM manipulation**: Direct `document.getElementById`, `querySelector`, `classList`
- **Event handling**: `addEventListener` — no inline `onclick`

## Naming

| Element | Convention | Example |
|---------|------------|---------|
| CSS classes | BEM-like lowercase | `.hero-copy__layer-idx`, `.slab__badge--stable` |
| CSS custom properties | kebab-case with `--` prefix | `--f-display`, `--band-bg`, `--ink-mute` |
| JS variables | camelCase | `heroRoot`, `navLogo`, `activeLabel` |
| Data attributes | kebab-case | `data-layer="0"`, `data-logo="strata"`, `data-type="grotesk"` |
| SVG files | Numbered kebab-case | `01-k8-dropping-keystone.svg` |
| Screenshots | kebab-case with version prefix | `v05-bold-L0.png`, `v03-split-scroll1.png` |

## File Organization

```
archolith.dev/
├── index.html              # Single-page site (all sections + inline styles)
├── hero/
│   ├── archolith-hero.css  # Hero section styles (strata bands, scroll mechanics)
│   ├── ArcholithHero.js    # Hero mount point and initialization
│   ├── StrataField.js      # Full strata field orchestration (scroll events)
│   ├── StrataSlice.js      # Individual strata band component
│   ├── SliceAnnotations.js # Per-layer annotation data
│   ├── sliceDefinitions.js # Layer definitions (JS)
│   └── sliceDefinitions.ts # Layer definitions (TypeScript source, not used at runtime)
├── logos/
│   ├── 01-k8-dropping-keystone.svg    # Primary logo
│   ├── 02-k2-minimal-keystone.svg     # Favicon-scale
│   ├── 03-k1-classic-keystone.svg     # Classic mark
│   ├── 04-doorway.svg                 # Doorway variant
│   ├── 05-strata-column.svg           # Strata variant
│   ├── 05a-wider-shift.svg           # Exploration variants
│   ├── 05b-wider-shift-mark.svg
│   ├── 05c-squat-wide.svg
│   ├── 05d-gap-visible.svg
│   ├── README.md                      # Logo ranking and notes
│   ├── showcase.html                  # Visual comparison page
│   └── color-matrix.html             # Color variant tester
└── screenshots/
    └── *.png                         # Design iteration screenshots
```

## Testing

No automated test suite — this is a visual/interactive site. Validation approach:

- **Manual browser testing**: Chrome, Firefox, Safari at 3 breakpoints (560px, 900px, 1300px+)
- **Screenshot comparisons**: Keep screenshots in `screenshots/` for visual regression reference
- **HTML validation**: Use W3C validator or browser dev tools
- **Accessibility**: Verify keyboard navigation, color contrast, and screen reader behavior
- **Performance**: Lighthouse audit for LCP, CLS, and FID
