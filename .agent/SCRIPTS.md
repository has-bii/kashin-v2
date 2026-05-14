---
generated: 2026-05-15T00:00:00.000Z
---

# Scripts Reference

## Root Scripts

| Script | Command | What it does |
|--------|---------|-------------|
| dev | `bun run --filter '*' dev` | Start all apps in dev mode |
| build | `bun run --filter '*' build` | Build all packages |
| test | `bun run --filter '*' test` | Run all tests |
| lint | `bun run --filter '*' lint` | Lint all packages |
| typecheck | `bun run --filter '*' typecheck` | Type-check all packages |
| format | `prettier --write .` | Format entire monorepo |
| format:check | `prettier --check .` | Check formatting |
| db:generate | `bun run --filter @kashin/database db:generate` | Generate Prisma client |
| db:migrate | `bun run --filter @kashin/database db:migrate` | Run Prisma migrations |
| db:deploy | `bun run --filter @kashin/database db:deploy` | Deploy migrations to production |

## Per-Package Scripts

### server
| Script | Command | What it does |
|--------|---------|-------------|
| dev | `bun run --hot src/index.ts` | Hot-reload dev server |
| build | `bun build src/index.ts --outdir dist --target node` | Build for Node |
| start | `bun dist/index.js` | Run production build |

### mobile
| Script | Command | What it does |
|--------|---------|-------------|
| dev | `vite dev --port 5173` | Vite dev server |
| build | `vite build` | Production build |
| preview | `vite preview` | Preview production build |
| test | `vitest run` | Run tests |
| lint | `eslint` | ESLint check |
| format | `prettier --write . && eslint --fix` | Format + lint fix |
| check | `prettier --check .` | Check formatting |

### @kashin/database
| Script | Command | What it does |
|--------|---------|-------------|
| db:generate | `prisma generate` | Generate Prisma client to src/generated |
| db:migrate | `prisma migrate dev` | Create/apply migrations |
| db:deploy | `prisma migrate deploy` | Apply pending migrations (prod) |

## Bun-Specific
- No `bunfig.toml` — default Bun config
- Engine requirement: `bun >= 1.2`
- TypeScript peer dep: `5.9.3`
- Lockfile: `bun.lock` (not `bun.lockb`)
