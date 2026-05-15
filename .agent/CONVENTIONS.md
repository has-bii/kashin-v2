---
generated: 2026-05-15T14:50:00.000Z
---

# Conventions

## File & Folder Naming
- Source files: `kebab-case` (`auth-client.ts`, `require-session.ts`)
- React components: `PascalCase` files (`LoginPage.tsx`, `CardHeader.tsx`)
- Directories: `kebab-case` (`middleware/`, `routes/auth`)
- shadcn components: `kebab-case` in `src/components/ui/` (`button.tsx`, `card.tsx`)
- Feature modules: `kebab-case` dirs (`auth/components/`)

## Import Paths
- **server**: `@kashin/database/*` → `../../packages/database/src/*`
- **mobile**: `@/*` → `./src/*`, `@kashin/ui/*`, `@kashin/features/*`
- **features**: `@kashin/features/*` → `./src/*`, `@kashin/ui/*` → `../ui/src/*`
- **ui**: `@kashin/ui/*` → `./src/*`
- Workspace deps use `workspace:*` protocol

## TypeScript
- Strict mode across all packages
- Target: ES2022 (mobile), ESNext (server, database, features, ui)
- Module: ESNext / Preserve, bundler resolution
- Root tsconfig: noUnusedLocals, noUnusedParameters, noImplicitReturns
- Server: no extra lint flags
- Database/features/ui: noUncheckedIndexedAccess, noImplicitOverride

## Testing
- **mobile**: Vitest (`vitest run`)
- **server/database/features/ui**: no test scripts yet
- Test file pattern: not established

## Code Style
- **Formatter**: Prettier with `@trivago/prettier-plugin-sort-imports` + `prettier-plugin-tailwindcss`
- **Linter**: ESLint (mobile only, via `@tanstack/eslint-config`)
- **No Biome**
- Format command: `bun run format` (root) or per-package

## Error Handling
- Server: Hono `app.onError` → text response with err.message
- Auth: `HTTPException(401)` via `requireSession` middleware
- Database: throws on missing `DATABASE_URL`

## Environment Variables
- **server**: `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `MOBILE_URL`, `DESKTOP_URL`, `DOMAIN`, `NODE_ENV`
- **database**: `DATABASE_URL`, `NODE_ENV`
- **mobile**: `VITE_API_URL`
- No `.env.example` — see `config.ts` (server) or source (features)

## Git
- Branch/commit conventions: not detected