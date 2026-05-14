---
generated: 2026-05-14T00:00:00.000Z
---

# Entry Points

## Application Entry Points

### server (Hono API)
- **Entry**: `apps/server/src/index.ts`
- **Framework**: Hono
- **Runtime**: Bun (with `--hot` for dev)
- **Default port**: Not explicitly set (Bun default or set via env)
- **How to start**: `bun run --filter server dev` or `bun dev` (root)
- **Route groups**:
  - `/health` — health check endpoints (`/health`, `/health/database`)
  - `/api/auth` — better-auth handler (all methods on `/*`)
  - `/` — root greeting

### mobile (React SPA)
- **Entry**: `apps/mobile/src/main.tsx`
- **Framework**: React 19 + TanStack Router + Vite
- **How to start**: `bun run --filter mobile dev` or `bun dev` (root)
- **Port**: 5173
- **Routing**: File-based via TanStack Router (`src/routes/`)
- **Current routes**:
  - `/` — Home page (shows auth session info)
  - `__root.tsx` — Root layout (imports `@kashin/ui/globals.css`)

## Library Public APIs

### @kashin/database
- **Entry**: `packages/database/src/index.ts`
- **Exports**:
  - `prisma` — Singleton PrismaClient instance
  - All Prisma generated types via `./generated/prisma/client`
- **Sub-path**: `@kashin/database/client` → `src/client.ts` (raw client, usually not needed directly)

### @kashin/features
- **Entry**: `packages/features/src/lib/*` (wildcard export)
- **Exports**:
  - `@kashin/features/lib/auth-client` → `authClient` (better-auth React client with `useSession` hook)

### @kashin/ui
- **Entry**: Multiple sub-path exports
- **Exports**:
  - `@kashin/ui/globals.css` — Global Tailwind styles
  - `@kashin/ui/lib/utils` → `cn()` helper (clsx + tailwind-merge)
  - `@kashin/ui/components/ui/*` — UI components (currently: `Button`)
  - `@kashin/ui/components/*` — Top-level components
  - `@kashin/ui/hooks/*` — Custom React hooks

## CLI Tools
None detected — no `bin` fields in any package.json.

## Background Jobs / Workers
None detected.
