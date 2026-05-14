---
generated: 2026-05-14T00:00:00.000Z
---

# Agent Index — Read This First

This project has been mapped. Do NOT explore the source tree from scratch.
Read the relevant doc below for the context you need, then go to the source.

## Quick Facts
- **Type**: Bun monorepo (workspaces: `apps/*`, `packages/*`)
- **Packages**: 5 packages — 2 apps (mobile, server), 3 libraries (@kashin/database, @kashin/features, @kashin/ui)
- **Apps**: mobile (React SPA, port 5173), server (Hono API, Bun runtime)
- **Main language**: TypeScript (strict mode, ES2022 target)
- **Test runner**: Vitest (mobile only)
- **DB**: PostgreSQL via Prisma 7
- **Auth**: better-auth (Google OAuth, cookie sessions)
- **UI**: shadcn/Radix/Tailwind v4
- **Last mapped**: 2026-05-14

## Navigation
| I need to know... | Read |
|---|---|
| Overall structure & data flow | `.agent/ARCHITECTURE.md` |
| What each package does | `.agent/PACKAGES.md` |
| Naming, imports, style rules | `.agent/CONVENTIONS.md` |
| How to run / build / test | `.agent/SCRIPTS.md` |
| Where the app boots / exports | `.agent/ENTRYPOINTS.md` |

## Staleness
If any doc's `generated` date is older than its `refresh_after` value (7 days),
re-run the cartographer skill on that area only.
