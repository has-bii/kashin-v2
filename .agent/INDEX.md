---
generated: 2026-05-16T00:00:00.000Z
---

# Agent Index — Read This First

This project has been mapped. Do NOT explore the source tree from scratch.
Read the relevant doc below for the context you need, then go to the source.

## Quick Facts
- **Type**: Bun monorepo
- **Packages**: 6 (2 apps, 4 libraries)
- **Apps**: server (Hono API), mobile (React/Vite web)
- **Libraries**: @kashin/database (Prisma), @kashin/schema (Zod), @kashin/features (auth + category), @kashin/ui (shadcn)
- **Main language**: TypeScript (strict)
- **Test runner**: Vitest (mobile only)
- **DB**: PostgreSQL via Prisma
- **Auth**: better-auth (Google OAuth, cookie sessions)
- **State mgmt**: TanStack Query (mobile)
- **UI**: shadcn/radix-vega + Tailwind v4 + Tabler icons
- **Last mapped**: 2026-05-16

## Navigation

| I need to know... | Read |
|---|---|
| Overall structure & data flow | `.agent/ARCHITECTURE.md` |
| What each package does & deps | `.agent/PACKAGES.md` |
| Naming, imports, style rules | `.agent/CONVENTIONS.md` |
| How to run / build / test | `.agent/SCRIPTS.md` |
| Where the app boots / exports | `.agent/ENTRYPOINTS.md` |
| UI design language & visual guidelines | `DESIGN.md` |

## Staleness
If any doc's `generated` date is older than its `refresh_after` value,
re-run the cartographer skill on that area only.
