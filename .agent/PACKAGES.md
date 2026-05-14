---
generated: 2026-05-14T00:00:00.000Z
---

# Package Map

| Package | Path | Type | Entry | Purpose |
|---------|------|------|-------|---------|
| mobile | apps/mobile/ | app | src/main.tsx | React SPA with TanStack Router, Vite, Tailwind v4 |
| server | apps/server/ | app | src/index.ts | Hono API server on Bun runtime |
| @kashin/database | packages/database/ | library | src/index.ts, src/client.ts | Prisma ORM + PostgreSQL adapter, DB singleton |
| @kashin/features | packages/features/ | library | src/lib/* | Feature modules — currently auth client hooks |
| @kashin/ui | packages/ui/ | library | src/lib/*, src/components/* | Shared UI components — shadcn/Radix/Tailwind |

## Dependency Graph
- **mobile** → [@kashin/ui, @kashin/features]
- **server** → [@kashin/database]
- **@kashin/database** → [prisma, pg, @prisma/adapter-pg, @vercel/functions]
- **@kashin/features** → [better-auth/react, react]
- **@kashin/ui** → [radix-ui, class-variance-authority, tailwind-merge, clsx, @tabler/icons-react]

## Shared Packages
| Package | Imported by | Purpose |
|---------|-------------|---------|
| @kashin/ui | mobile | Shared UI components |
| @kashin/features | mobile | Auth client hooks |
| @kashin/database | server | DB access + Prisma types |
| better-auth | server, @kashin/features | Auth server + client |
