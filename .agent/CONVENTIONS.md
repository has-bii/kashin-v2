---
generated: 2026-05-14T00:00:00.000Z
---

# Conventions

## File & Folder Naming
- **Source files**: `camelCase` (e.g., `auth-client.ts`, `routeTree.gen.ts`)
- **React components**: `PascalCase` (e.g., `RootComponent`, `Button`)
- **Route files**: file-based routing under `src/routes/` (e.g., `__root.tsx`, `index.tsx`)
- **Middleware**: `camelCase.ts` (e.g., `session.ts`, `require-session.ts`)
- **Generated code**: `generated/` subfolder (Prisma output)

## Import Paths
- **Internal imports**: Relative paths (no workspace path aliases defined in tsconfig)
- **Workspace packages**: `@kashin/*` (resolved via Bun workspaces)
- **No absolute `@app/*` aliases** — tsconfig.json has no `paths` field

## TypeScript
- **Strict mode**: Yes — `strict: true`
- **Target**: ES2022
- **Module**: ESNext with bundler resolution
- **NoUnusedLocals/Parameters**: Enabled
- **NoImplicitReturns/NoFallthroughCasesInSwitch**: Enabled
- **Shared tsconfig**: Root `tsconfig.json` — no per-package tsconfig files found

## Testing
- **Runner**: Vitest (mobile app has `vitest run` script)
- **File pattern**: `*.test.ts` or `*.spec.ts` (standard Vitest defaults)
- **Server app**: No test script configured

## Code Style
- **Formatter**: Prettier (root `package.json` has `@trivago/prettier-plugin-sort-imports`)
- **Linter**: ESLint (mobile app has `eslint.config.js`)
- **Server app**: No ESLint configured — only Prettier
- **No biome.json** — not using Biome

## Error Handling
- **Server**: Thrown errors handled by Hono `onError` handler → returns `err.message` as 500 text
- **Auth**: HTTPException with 401 for missing sessions
- **Database**: Errors logged to console, returned as JSON `{ status: 'down' }`
- **Client**: No global error boundary detected — component-level error handling only

## Environment Variables
| Variable | Used in | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | @kashin/database | PostgreSQL connection string (required) |
| `BETTER_AUTH_URL` | server | Auth base URL |
| `GOOGLE_CLIENT_ID` | server | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | server | Google OAuth |
| `MOBILE_URL` | server, @kashin/features | Mobile app origin (default: `http://localhost:5173`) |
| `DESKTOP_URL` | server | Desktop app origin (default: `http://localhost:5174`) |
| `VITE_API_URL` | @kashin/features | API base URL for auth client (default: `http://localhost:3000`) |
| `NODE_ENV` | server, @kashin/database | Environment detection |

**Note**: No `.env.example` file exists. Accessed via `dotenv` or `process.env`.

## Git
- **Branch naming**: Not detectable
- **Commit format**: Not detectable
- **PR conventions**: Not detectable
