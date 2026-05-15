---
generated: 2026-05-15T14:50:00.000Z
refresh_after: 7d
---

# Architecture

## Project Type
Bun monorepo — 5 packages, 2 apps (server + mobile web), 3 libraries (database, features, ui).

## Repository Layout
```
kashin-v2/
├── apps/
│   ├── server/          # Hono API server (auth, health)
│   └── mobile/          # React + Vite web app (TanStack Router)
├── packages/
│   ├── database/        # Prisma client + schema (PostgreSQL)
│   ├── features/        # Shared feature modules (auth pages, clients)
│   └── ui/              # Shared UI kit (shadcn/radix-vega components)
├── CLAUDE.md            # Agent auto-load
├── DESIGN.md            # Design system guide
├── package.json         # Root workspace config
└── tsconfig.json        # Root TS config
```

## Data Flow
```
mobile (React/Vite) ──HTTP──> server (Hono) ──Prisma──> PostgreSQL
       │                           │
       ├── @kashin/ui              └── @kashin/database
       └── @kashin/features              └── pg adapter
```

- **mobile** → imports `@kashin/ui` (components), `@kashin/features` (auth pages, auth client)
- **server** → imports `@kashin/database` (prisma client)
- **features** → imports `@kashin/ui` (components for auth pages)
- **database** → standalone Prisma + pg, no internal deps

## Key Abstractions

| Concept | Where | What |
|---------|-------|------|
| `AppContext` | `apps/server/src/types.ts` | Hono typed context with user, session, prisma |
| `auth` | `apps/server/src/lib/auth.ts` | better-auth server instance (Google OAuth, cookie sessions) |
| `authClient` | `packages/features/src/lib/auth-client.ts` | better-auth React client for mobile |
| `prisma` | `packages/database/src/client.ts` | Singleton PrismaClient with pg adapter + Vercel pool attach |
| `createApp` | `apps/server/src/app.ts` | Factory fn: Hono app with CORS, logger, prisma, session middleware |
| `cn()` | `packages/ui/src/lib/utils.ts` | `clsx` + `twMerge` utility for class merging |

## External Integrations

| Integration | Owner Package | Details |
|-------------|---------------|---------|
| PostgreSQL | `@kashin/database` | Prisma ORM, pg driver, Vercel pool in prod |
| Google OAuth | `apps/server` | better-auth social provider |
| Vercel Functions | `@kashin/database` | `@vercel/functions` pool attach in production |
| shadcn/ui | `packages/ui` | radix-vega style, tabler icons, neutral base |
| Tailwind CSS v4 | `packages/ui`, `apps/mobile` | CSS-first config via `globals.css` |