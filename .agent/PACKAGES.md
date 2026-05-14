---
generated: 2026-05-15T00:00:00.000Z
---

# Package Map

| Package | Path | Type | Entry | Purpose |
|---------|------|------|-------|---------|
| server | apps/server | app | src/index.ts | Hono API server — auth routes, health check, session middleware |
| mobile | apps/mobile | app | src/main.tsx | React web app — TanStack Router, Vite, shadcn UI |
| @kashin/database | packages/database | library | src/index.ts | Prisma schema + client for PostgreSQL |
| @kashin/features | packages/features | library | src/ (exports map) | Shared feature modules — auth pages, auth client |
| @kashin/ui | packages/ui | library | src/globals.css + exports map | Shared UI kit — shadcn components, utils, global styles |

## Dependency Graph

```
server        → [@kashin/database]
mobile        → [@kashin/ui, @kashin/features]
@kashin/features → [@kashin/ui]
@kashin/ui    → [] (standalone)
@kashin/database → [] (standalone)
```

## Shared Packages

| Package | Imported By | Notes |
|---------|-------------|-------|
| @kashin/ui | mobile, features | Load-bearing — all UI components live here |
| @kashin/database | server | Load-bearing — sole data access layer |
