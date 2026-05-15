---
generated: 2026-05-15T00:00:00.000Z
---

## Project Overview

Kashin is an AI-powered personal finance tracker (solo user, mobile-first). AI extracts transactions from user emails, auto-logging them so users don't need to manually input data.

### Key Features

- AI email transaction extraction
- Category management
- Budget tracking
- Bank account overview
- Reports & analytics

### Tech Stack

Bun monorepo: Hono server, React/Vite mobile, Prisma/PostgreSQL DB, better-auth (Google OAuth).

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
| UI design language & visual guidelines | `DESIGN.md` |

## Stack

- **Runtime**: Bun >= 1.2 (monorepo with workspaces)
- **Language**: TypeScript (strict, ES2022)
- **Install**: `bun install` — never `npm install`
- **Test**: `bun test` / `vitest run`
- **Workspace filter**: `bun run --filter <pkg> <script>`
- **Server**: Hono + better-auth + Prisma (PostgreSQL)
- **Mobile**: React 19 + Vite + TanStack Router + shadcn/ui
- **UI**: Tailwind v4, radix-vega, Tabler icons, Inter font

## Do Not

- Read `bun.lock` (binary)
- Read `.env` files (no `.env.example` — check `CONVENTIONS.md` for env var surface area)
- Re-explore directories already documented in `.agent/`
- Run `npm` or `yarn` commands — this project uses Bun exclusively

## Docs Last Generated

2026-05-15 — re-run codebase-cartographer skill if stale (> 7 days).
