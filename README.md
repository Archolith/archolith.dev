# archolith.dev

Marketing homepage for the [archolith&trade;](https://github.com/ctharvey/archolith) suite — self-hosted context compression tools for LLMs. A single-page static HTML site with a signature scroll-excavation hero animation.

## Quick Start

```bash
# Serve locally
python -m http.server 8080

# Or open directly
open index.html   # macOS
start index.html  # Windows
```

No build step. No framework. No dependencies.

## Products Featured

| Product | Layer | Status |
|---------|-------|--------|
| archolith-context | L4 — Proxy | Experimental alpha |
| archolith-filter | L0–L2 — RTK | Alpha |
| archolith-audit | L3 — Audit | Alpha |
| archolith-bench | Bench | Active |
| menhir | L5 — Memory | Current memory direction |

## Documentation

| File | Purpose |
|------|---------|
| [.agent/README.md](.agent/README.md) | Agent context, deployment, maintenance rules |
| [.agent/architecture.md](.agent/architecture.md) | Site architecture, tech stack, perf optimizations |
| [.agent/data_models.md](.agent/data_models.md) | JavaScript data structures, CSS custom properties |
| [.agent/CHANGELOG.md](.agent/CHANGELOG.md) | Running log of changes |

## Deploy

Files are served from the yawn VPS via Caddy `file_server`. See [.agent/architecture.md](.agent/architecture.md) → Deployment for full details.

```bash
scp index.html thron@147.93.132.141:/var/www/html/archolith-dev/
```

## License

Source-available under the PolyForm Noncommercial License 1.0.0.

archolith&trade; is a trademark of Charles Harvey.
