---
generated: 2026-05-16T00:00:00.000Z
---

# Conventions

## File & Folder Naming
- Source files: `kebab-case` (`auth-client.ts`, `require-session.ts`, `prisma-error.ts`)
- React components: `PascalCase` files (`LoginPage.tsx`, `CardHeader.tsx`, `BalanceCard.tsx`)
- Directories: `kebab-case` (`middleware/`, `routes/auth`, `modules/category`)
- shadcn components: `kebab-case` in `src/components/ui/` (`button.tsx`, `card.tsx`, `badge.tsx`)
- Feature modules: `kebab-case` dirs with `lib/`, `mutation/`, `query/` subdirs (`category/`)

## Import Paths
- **server**: `@server/*` → `./src/*`, `@kashin/database/*`, `@kashin/schema/*`
- **mobile**: `@/*` → `./src/*`, `@kashin/ui/*`, `@kashin/features/*`
- **features**: `@kashin/features/*` → `./src/*`, `@kashin/schema/*`, `@kashin/ui/*`
- **schema**: `@kashin/schema/*` → `./src/*`
- **ui**: `@kashin/ui/*` → `./src/*`
- Workspace deps use `workspace:*` protocol

## TypeScript
- Strict mode across all packages
- Target: ES2022 (mobile), ESNext (server, database, features, ui, schema)
- Module: ESNext / Preserve, bundler resolution
- Root tsconfig: noUnusedLocals, noUnusedParameters, noImplicitReturns
- Database/features/ui/schema: noUncheckedIndexedAccess, noImplicitOverride

## Testing
- **mobile**: Vitest (`vitest run`)
- **server/database/features/ui/schema**: no test scripts yet
- Test file pattern: not established

## Code Style
- **Formatter**: Prettier with `@trivago/prettier-plugin-sort-imports` + `prettier-plugin-tailwindcss`
- **Linter**: ESLint (mobile only, via `@tanstack/eslint-config`)
- **No Biome**
- Format command: `bun run format` (root) or per-package

## Error Handling
- Server: Hono `app.onError` → text response with err.message
- Server: `mapPrismaError()` → maps P2002→409, P2025→404, etc.
- Auth: `HTTPException(401)` via `requireSession` middleware
- Database: throws on missing `DATABASE_URL`

## Environment Variables
- **server**: `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `MOBILE_URL`, `DESKTOP_URL`, `DOMAIN`, `NODE_ENV`
- **database**: `DATABASE_URL`, `NODE_ENV`
- **mobile**: `VITE_API_URL`
- No `.env.example` — see `config.ts` (server) or source (features)

## Git
- Branch/commit conventions: not detected

## Feature Module Pattern (features pkg)
- `lib/api.ts` — Hono client helper (fetch wrapper)
- `mutation/*.mutation.ts` — TanStack Query mutation hooks
- `query/*.query.ts` — TanStack Query query hooks
- Uses `@kashin/schema` for type-safe request/response validation
