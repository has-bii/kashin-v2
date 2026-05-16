---
generated: 2026-05-16T00:00:00.000Z
---

# Entry Points

## Application Entry Points

### server (apps/server)
- **File**: `src/index.ts`
- **Framework**: Hono
- **Start**: `bun run --hot src/index.ts` (dev) or `bun dist/index.js` (prod)
- **Creates**: Hono app via `createApp(config, modules)` factory
- **Modules**: auth (`/api/auth/*`), category (`/api/categories`), health (`/health`)
- **Route pattern**: each module exports `{ path, router }` — registered by `createApp`

### mobile (apps/mobile)
- **File**: `src/main.tsx`
- **Framework**: React 19 + Vite + TanStack Router + TanStack Query
- **Start**: `vite dev --port 5173`
- **Router**: `src/router.tsx` → `routeTree.gen.ts` (auto-generated)
- **Route layout**:
  - `__root.tsx` — root layout
  - `login.tsx` — login page
  - `_authenticated.tsx` — auth guard (requires session)
  - `_authenticated/_tabbed.tsx` — tabbed layout with `bottom-nav.tsx`
  - `_authenticated/_tabbed/index.tsx` — dashboard (home)
  - `_authenticated/_tabbed/activity.tsx` — transaction activity
  - `_authenticated/_tabbed/add-transaction.tsx` — add transaction
  - `_authenticated/_tabbed/ai-sync.tsx` — AI email sync
  - `_authenticated/_tabbed/settings.tsx` — settings
  - `privacy.tsx`, `terms.tsx` — legal pages

## Library Public APIs

### @kashin/database
- **Entry**: `src/index.ts` → re-exports `prisma` from `./client` + all from `./generated/prisma/client`
- **Client entry**: `src/client.ts` → singleton PrismaClient with pg adapter
- **Exports map**: `"."` → `./src/index.ts`, `"./client"` → `./src/client.ts`

### @kashin/schema
- **Entry**: wildcard `"/*"` → `./src/*`
- **Key exports**: `categorySchemas` from `@kashin/schema/category`, `TransactionTypeSchema` from `@kashin/schema/enum`
- **Dep**: Zod v4

### @kashin/features
- **Exports map**: `"./lib/*"` → `./src/lib/*`, `"./auth/*"` → `./src/auth/*`, `"./category/*"` → `./src/category/*`
- **Key exports**:
  - `authClient` from `@kashin/features/lib/auth-client`
  - `LoginPage` from `@kashin/features/auth/components/LoginPage`
  - Category queries: `useCategories` from `@kashin/features/category/query/get-categories.query`
  - Category mutations: `useCreateCategory`, `useUpdateCategory`, `useDeleteCategory`

### @kashin/ui
- **Exports map**: `"./globals.css"`, `"./lib/*"`, `"./components/*"`, `"./components/ui/*"`, `"./hooks/*"`
- **Key exports**: `cn` from `@kashin/ui/lib/utils`
- **Components**: Button, Card, Input, Label, Alert, Badge, Chart, Progress, Select, Separator, Skeleton
- **Styles**: `@kashin/ui/globals.css` — Tailwind v4 + shadcn theme variables

## CLI Tools
None.

## Background Jobs / Workers
None.
