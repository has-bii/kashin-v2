---
generated: 2026-05-16T00:00:00.000Z
refresh_after: 7d
---

# Architecture

## Project Type
Bun monorepo — 6 packages, 2 apps (server + mobile web), 4 libraries (database, schema, features, ui).

## Repository Layout
```
kashin-v2/
├── apps/
│   ├── server/          # Hono API server — modular architecture
│   └── mobile/          # React + Vite web app (TanStack Router + Query)
├── packages/
│   ├── database/        # Prisma client + schema (PostgreSQL)
│   ├── schema/          # Shared Zod validation schemas (category, enums)
│   ├── features/        # Shared feature modules (auth, category CRUD + queries)
│   └── ui/              # Shared UI kit (shadcn/radix-vega components)
├── CLAUDE.md            # Agent auto-load
├── DESIGN.md            # Design system guide
├── docker-compose.yaml  # Full stack (server + db + mailhog)
├── docker-compose.limited.yaml  # Minimal stack (server + db)
├── package.json         # Root workspace config
└── tsconfig.json        # Root TS config
```

## Data Flow
```
mobile (React/Vite) ──HTTP──> server (Hono modules) ──Prisma──> PostgreSQL
       │                           │
       ├── @kashin/ui              ├── @kashin/database
       ├── @kashin/features        └── @kashin/schema
       └── TanStack Query
```

- **mobile** → imports `@kashin/ui` (components), `@kashin/features` (auth pages, auth client, category queries/mutations)
- **server** → imports `@kashin/database` (prisma client), `@kashin/schema` (Zod validators)
- **features** → imports `@kashin/schema` (shared schemas), `@kashin/ui` (components)
- **schema** → standalone Zod schemas, no internal deps
- **database** → standalone Prisma + pg, no internal deps

## Key Abstractions

| Concept | Where | What |
|---------|-------|------|
| `AppModule` | `apps/server/src/types.ts` | `{ path, router }` — module plugin interface for server |
| `createApp` | `apps/server/src/app.ts` | Factory fn: Hono app with CORS, logger, registers modules |
| `auth` | `apps/server/src/lib/auth.ts` | better-auth server instance (Google OAuth, cookie sessions) |
| `authClient` | `packages/features/src/lib/auth-client.ts` | better-auth React client for mobile |
| `queryClient` | `apps/mobile/src/lib/query-client.ts` | TanStack Query client (60s stale, 5min GC, no retry) |
| `prisma` | `packages/database/src/client.ts` | Singleton PrismaClient with pg adapter + Vercel pool attach |
| `cn()` | `packages/ui/src/lib/utils.ts` | `clsx` + `twMerge` utility for class merging |
| `mapPrismaError` | `apps/server/src/lib/prisma-error.ts` | Maps Prisma known errors to HTTP status codes |

## External Integrations

| Integration | Owner Package | Details |
|-------------|---------------|---------|
| PostgreSQL | `@kashin/database` | Prisma ORM, pg driver, Vercel pool in prod |
| Google OAuth | `apps/server` | better-auth social provider |
| Vercel Functions | `@kashin/database` | `@vercel/functions` pool attach in production |
| shadcn/ui | `packages/ui` | radix-vega style, tabler icons, neutral base |
| Tailwind CSS v4 | `packages/ui`, `apps/mobile` | CSS-first config via `globals.css` |
