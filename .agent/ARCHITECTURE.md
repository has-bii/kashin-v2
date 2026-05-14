---
generated: 2026-05-14T00:00:00.000Z
refresh_after: 7d
---

# Architecture

## Project Type
Bun monorepo — 5 packages total: 2 apps (mobile, server), 3 libraries (database, features, ui)

## Repository Layout
```
kashin-v2/
├── apps/
│   ├── mobile/          # React SPA (TanStack Router + Vite + Tailwind v4)
│   └── server/          # Hono API server (Bun runtime)
├── packages/
│   ├── database/        # Prisma ORM + PostgreSQL adapter
│   ├── features/        # Feature modules (auth client)
│   └── ui/              # Shared UI components (Radix + shadcn + Tailwind)
├── .agent/              # Agent documentation (this folder)
├── package.json         # Root workspace config
├── tsconfig.json        # Shared TypeScript config
└── bun.lock             # Bun lockfile (binary)
```

## Data Flow
```
mobile (React SPA)
  → @kashin/features (auth client)
    → server (Hono API, port 3000)
      → @kashin/database (Prisma + PostgreSQL)
      → better-auth (session management)

mobile (React SPA)
  → @kashin/ui (shared components, Tailwind v4)
```

## Key Abstractions

1. **Server AppContext** (`apps/server/src/types.ts`) — Hono context with typed variables: `user`, `session`, `prisma`. All routes use this.

2. **Prisma Singleton** (`packages/database/src/client.ts`) — Single PrismaClient instance with `globalThis` dedup for dev hot-reload. Uses `PrismaPg` adapter with connection pooling. Vercel `attachDatabasePool` in production.

3. **Session Middleware** (`apps/server/src/middleware/session.ts`) — Injects `user`/`session` from better-auth into every request. `require-session.ts` provides auth-gating middleware.

4. **Better-Auth** (`apps/server/src/lib/auth.ts`) — Auth provider with Prisma adapter. Google OAuth + cookie-based sessions (5 min cache, cross-subdomain cookies).

5. **Auth Client** (`packages/features/src/lib/auth-client.ts`) — Client-side auth hooks via `better-auth/react`. Consumed by mobile app.

6. **UI Component Library** (`packages/ui/`) — shadcn-based components using Radix primitives, class-variance-authority for variants, Tailwind v4 for styling.

## External Integrations
| Integration | Package | Purpose |
|-------------|---------|---------|
| PostgreSQL | @kashin/database | Primary datastore |
| Google OAuth | server (better-auth) | Social login |
| Vercel serverless | @kashin/database | Connection pooling in production |
