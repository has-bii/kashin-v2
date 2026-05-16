---
generated: 2026-05-16T00:00:00.000Z
---

# Package Map

| Package | Path | Type | Entry | Purpose |
|---------|------|------|-------|---------|
| server | apps/server | app | src/index.ts | Hono API server — modular arch (auth, category, health) |
| mobile | apps/mobile | app | src/main.tsx | React web app — TanStack Router + Query, PWA, tabbed nav |
| @kashin/database | packages/database | library | src/index.ts | Prisma schema + client for PostgreSQL |
| @kashin/schema | packages/schema | library | src/* | Shared Zod validation schemas (category, enums) |
| @kashin/features | packages/features | library | src/ (exports map) | Shared feature modules — auth, category CRUD + queries |
| @kashin/ui | packages/ui | library | src/globals.css + exports map | Shared UI kit — shadcn components, utils, global styles |

## Dependency Graph

```
server            → [@kashin/database, @kashin/schema]
mobile            → [@kashin/ui, @kashin/features]
@kashin/features  → [@kashin/schema, @kashin/ui]
@kashin/ui        → [] (standalone)
@kashin/schema    → [] (standalone, deps: zod)
@kashin/database  → [] (standalone)
```

## Shared Packages

| Package | Imported By | Notes |
|---------|-------------|-------|
| @kashin/schema | server, features | Load-bearing — shared Zod validators, prevents drift |
| @kashin/ui | mobile, features | Load-bearing — all UI components live here |
| @kashin/database | server | Load-bearing — sole data access layer |
