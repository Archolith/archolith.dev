# archolith.dev

Marketing homepage for the [archolith&trade;](https://github.com/Archolith) suite — self-hosted graph memory and context tooling for AI agents. Launch copy leads with **menhir**, the graph memory system. A single-page static HTML site with a signature scroll-excavation hero animation.

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

One hero layer per product, same order in the architecture stack.

| Product | Layer | Status |
|---------|-------|--------|
| menhir | L0 — Memory | **Launch** |
| archolith-filter | L1 — Filter | Alpha |
| archolith-skree | L2 — Audit | Beta install path |
| archolith-peira | L3 — Bench | Active |
| archolith-context | L4 — Proxy | Coming / research direction |

## Install archolith-skree

The public site links to the one-command audit plugin installer:

```bash
curl -fsSL https://raw.githubusercontent.com/Archolith/archolith-mcp-audit/master/scripts/install.sh | bash -s -- claude
curl -fsSL https://raw.githubusercontent.com/Archolith/archolith-mcp-audit/master/scripts/install.sh | bash -s -- codex
curl -fsSL https://raw.githubusercontent.com/Archolith/archolith-mcp-audit/master/scripts/install.sh | bash -s -- opencode
```

The installer keeps runtime dependencies in managed venvs under `~/.archolith/venvs/` and does not support Gemini CLI.

## Documentation

| File | Purpose |
|------|---------|
| [.agent/README.md](.agent/README.md) | Agent context, deployment, maintenance rules |
| [.agent/architecture.md](.agent/architecture.md) | Site architecture, tech stack, perf optimizations |
| [.agent/data_models.md](.agent/data_models.md) | JavaScript data structures, CSS custom properties |
| [.agent/CHANGELOG.md](.agent/CHANGELOG.md) | Running log of changes |

## Deploy

Files are served from the yawn VPS via Caddy `file_server`. See [.agent/architecture.md](.agent/architecture.md) → Deployment for full details.

Deploy is git-first by default: commit the site change, push it, then copy the static payload.

```powershell
.\scripts\deploy.ps1 -PlanOnly
.\scripts\deploy.ps1
```

The script refuses to deploy a dirty working tree unless `-AllowDirty` is passed for an intentional test deploy. It copies `index.html`, `privacy.html`, favicons, fonts, hero assets, and logos to `/var/www/html/archolith-dev/`.

Hero JS/CSS references use a date-based `?v=` cache-busting value. Bump that value in `index.html` whenever launch-visible hero assets change.

## Performance

Current local Lighthouse baseline is documented in [.agent/architecture.md](.agent/architecture.md). The 2026-07-07 local mobile run scored 93, with FCP 1.4s, LCP 3.0s, TBT 0ms, CLS 0.072, and Speed Index 1.4s. Rerun against the deployed Cloudflare URL after launch-visible deploys.

## License

Source-available under the PolyForm Noncommercial License 1.0.0.

archolith&trade; is a trademark of Charles Harvey.
