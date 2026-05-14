---
generated: 2026-05-15T00:00:00.000Z
---

# Entry Points

## Application Entry Points

### server (apps/server)
- **File**: `src/index.ts`
- **Framework**: Hono
- **Start**: `bun run --hot src/index.ts` (dev) or `bun dist/index.js` (prod)
- **Creates**: Hono app via `createApp(config)` factory
- **Routes**: `/health`, `/api/auth/*`, `/`

### mobile (apps/mobile)
- **File**: `src/main.tsx`
- **Framework**: React 19 + Vite + TanStack Router
- **Start**: `vite dev --port 5173`
- **Router**: `src/router.tsx` → `routeTree.gen.ts` (auto-generated)
- **Route files**: `src/routes/__root.tsx`, `src/routes/login.tsx`, `src/routes/_authenticated.tsx`, etc.

## Library Public APIs

### @kashin/database
- **Entry**: `src/index.ts` → re-exports `prisma` from `./client` + all from `./generated/prisma/client`
- **Client entry**: `src/client.ts` → singleton PrismaClient with pg adapter
- **Exports map**: `"."` → `./src/index.ts`, `"./client"` → `./src/client.ts`

### @kashin/features
- **Exports map**: `"./lib/*"` → `./src/lib/*`, `"./auth/*"` → `./src/auth/*`
- **Key exports**: `authClient` from `@kashin/features/lib/auth-client`, `LoginPage` from `@kashin/features/auth/components/LoginPage`

### @kashin/ui
- **Exports map**: `"./globals.css"`, `"./lib/*"`, `"./components/*"`, `"./components/ui/*"`, `"./hooks/*"`
- **Key exports**: `cn` from `@kashin/ui/lib/utils`, `Button`, `Card`, `Input`, `Label`, `Alert` from `@kashin/ui/components/ui/*`
- **Styles**: `@kashin/ui/globals.css` — Tailwind v4 + shadcn theme variables

## CLI Tools
None.

## Background Jobs / Workers
None.
