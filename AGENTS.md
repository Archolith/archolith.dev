# AGENTS.md

## Project Instructions For Coding Agents

1. Before making changes, read the guidance files in `.agent/`.
2. Start with `.agent/README.md` for project workflow and conventions.
3. Use `.agent/data_models.md` for entity and schema expectations.
4. Use `.agent/architecture.md` for system design and external API context.
5. Check `.agent/workflows/` for task-specific runbooks before executing operational actions.
6. If there is a conflict between code and `.agent` docs, call it out explicitly and ask for clarification.

## Scope

These instructions apply to the entire repository.

## Development

```bash
# Serve locally (any static file server)
python -m http.server 8080

# Or open directly
start index.html
```

No build step, no framework, no dependencies. Just HTML, CSS, and vanilla JavaScript.

## Code Style

- 4 spaces indent for JS/CSS/HTML
- CSS custom properties in `:root` for design tokens
- Vanilla JS only — no frameworks
- Self-hosted fonts in `fonts/` with `Cache-Control: immutable`
- Fonts use WOFF2 format, latin + latin-ext subsets only

## Project-Specific Notes

- This is a **static marketing site** — single `index.html` with hand-written CSS and vanilla JS.
- Deployment target: Caddy `file_server` on VPS (147.93.132.141), behind Cloudflare proxy.
- The hero animation (`hero/`) is the signature visual — scroll-excavation strata bands.
- Logo candidates are ranked in `logos/README.md`. Primary mark is K8 (dropping keystone).
- Pre-launch state: all outbound links neutralized to `href="#"`, quickstart hidden.
- Launch copy must label `archolith-context` experimental and use `menhir` for durable memory references.
- Cloudflare caches JS/CSS aggressively. Purge CF cache or wait for revalidation after deploys.
- No server-side state. No database. No API. Everything is client-side DOM and CSS toggles.
