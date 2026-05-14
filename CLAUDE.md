---
generated: 2026-05-14T00:00:00.000Z
---

# Claude Code — Project Context

> This project has been fully mapped. Do NOT crawl the source tree from scratch.
> Follow the protocol below at the start of every session.

## Session Start Protocol

1. Read `.agent/INDEX.md` for quick facts and a navigation map.
2. Read only the `.agent/*.md` file relevant to your current task.
3. Go directly to the source files mentioned — no blind `ls` or `find`.
4. After completing a task, update the relevant `.agent/` doc if anything
   has changed (new package, renamed file, convention shift, etc.).

## Quick Reference

| Topic | File |
|---|---|
| Architecture & data flow | `.agent/ARCHITECTURE.md` |
| Package map & dependency graph | `.agent/PACKAGES.md` |
| Naming, imports, style, testing | `.agent/CONVENTIONS.md` |
| Scripts & how to run things | `.agent/SCRIPTS.md` |
| App entry points & public APIs | `.agent/ENTRYPOINTS.md` |

## Stack

- **Runtime**: Bun >= 1.2 (monorepo with workspaces)
- **Language**: TypeScript (strict, ES2022)
- **Install**: `bun install` — never `npm install`
- **Test**: `bun test` / `vitest run`
- **Workspace filter**: `bun run --filter <pkg> <script>`

## Do Not

- Read `bun.lock` (binary)
- Read `.env` files (no `.env.example` exists — check `CONVENTIONS.md` for env var surface area)
- Re-explore directories already documented in `.agent/`
- Run `npm` or `yarn` commands — this project uses Bun exclusively

## Docs Last Generated

2026-05-14 — re-run codebase-cartographer skill if stale (> 7 days).
