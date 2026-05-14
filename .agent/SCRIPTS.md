---
generated: 2026-05-14T00:00:00.000Z
---

# Scripts Reference

## Root Scripts
| Script | Command | What it does |
|--------|---------|-------------|
| `dev` | `bun run --filter '*' dev` | Start all apps in dev mode |
| `build` | `bun run --filter '*' build` | Build all apps |
| `test` | `bun run --filter '*' test` | Run all tests |
| `lint` | `bun run --filter '*' lint` | Lint all apps |
| `typecheck` | `bun run --filter '*' typecheck` | Typecheck all apps |
| `format` | `prettier --write .` | Format entire repo |
| `format:check` | `prettier --check .` | Check formatting |
| `db:generate` | `bun run --filter @kashin/database db:generate` | Generate Prisma client |
| `db:migrate` | `bun run --filter @kashin/database db:migrate` | Run Prisma dev migration |
| `db:deploy` | `bun run --filter @kashin/database db:deploy` | Deploy Prisma migrations |

## Per-Package Scripts

### mobile
| Script | Command |
|--------|---------|
| `dev` | `vite dev --port 5173` |
| `build` | `vite build` |
| `preview` | `vite preview` |
| `test` | `vitest run` |
| `lint` | `eslint` |
| `format` | `prettier --write . && eslint --fix` |

### server
| Script | Command |
|--------|---------|
| `dev` | `bun run --hot src/index.ts` (hot-reload) |
| `build` | `bun build src/index.ts --outdir dist --target node` |
| `start` | `bun dist/index.js` |

### @kashin/database
| Script | Command |
|--------|---------|
| `db:generate` | `prisma generate` |
| `db:migrate` | `prisma migrate dev` |
| `db:deploy` | `prisma migrate deploy` |

## Bun-Specific
- No `bunfig.toml` — uses default Bun settings
- Runtime: Bun >= 1.2 (specified in root `engines` field)
- Lockfile: `bun.lock` (text format, not binary `bun.lockb`)
- Workspace syntax: `bun run --filter <pkg> <script>`
- Server dev uses `bun run --hot` for hot module reloading
