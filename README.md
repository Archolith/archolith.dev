# archolith.dev

Homepage for [**menhir**](https://github.com/Archolith/menhir), self-hosted graph memory for AI agents from [archolith&trade;](https://github.com/Archolith). A single-page static HTML site with a signature scroll-excavation hero animation.

## Quick Start

```bash
# Serve locally
python -m http.server 8080

# Or open directly
open index.html   # macOS
start index.html  # Windows
```

No build step. No framework. No dependencies.

## What the Site Covers

The site covers menhir only (v0.3.0). Other Archolith projects stay off it until they are
ready. The hero and the system section show the same five menhir layers in the same order:
memory, recall, code graph, governance, lifecycle.

## Content Sync

Body copy for sections 01-09 is written from [`menhir/README.md`](https://github.com/Archolith/menhir#readme),
last checked against menhir 0.3.0. When that README changes materially, update the site in
the same pass so the two stay aligned. Figures on the page are verified against the menhir
repo rather than copied from prose: tool count from the tool lists in `menhir.mcp.tools`
(62 in 0.3.0), resources from `menhir.mcp.resources.RESOURCE_TYPES`, and preset weights from
`domain/recall.py`.

## Install menhir

menhir is public and self-hosted. The site shows the working path:

```bash
python -m pip install archolith-menhir
menhir up --compose-neo4j --provider openai
```

## Documentation

| File | Purpose |
|------|---------|
| [.agent/README.md](.agent/README.md) | Agent context, deployment, maintenance rules |
| [.agent/architecture.md](.agent/architecture.md) | Site architecture, tech stack, perf optimizations |
| [.agent/data_models.md](.agent/data_models.md) | JavaScript data structures, CSS custom properties |
| [.agent/CHANGELOG.md](.agent/CHANGELOG.md) | Running log of changes |

## Deploy

Files are served from the VPS via Caddy `file_server`. See [.agent/architecture.md](.agent/architecture.md) → Deployment for full details.

Deploy is git-first by default: commit the site change, push it, then copy the static payload.

Set `ARCHOLITH_VPS_HOST` to the VPS address first. It is kept out of this public repo.

```powershell
.\scripts\deploy.ps1 -PlanOnly
.\scripts\deploy.ps1
```

The script refuses to deploy a dirty working tree unless `-AllowDirty` is passed for an intentional test deploy. It copies `index.html`, `privacy.html`, favicons, fonts, hero assets, and logos to `/var/www/html/archolith-dev/`.

Hero JS/CSS references use a date-based `?v=` cache-busting value. Bump that value in `index.html` whenever launch-visible hero assets change.

## Performance

Current local Lighthouse baseline is documented in [.agent/architecture.md](.agent/architecture.md). The 2026-07-07 local mobile run scored 93, with FCP 1.4s, LCP 3.0s, TBT 0ms, CLS 0.072, and Speed Index 1.4s. Rerun against the deployed Cloudflare URL after launch-visible deploys.

## License

This site is source-available under the PolyForm Noncommercial License 1.0.0. menhir itself
is Apache-2.0.

archolith&trade; is a trademark of Charles Harvey.
