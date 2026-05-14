---
name: codebase-cartographer
description: >
  Explores a codebase once and generates persistent, structured documentation
  so the agent never needs to re-explore the same project in future sessions.
  Use this skill whenever the user opens a new project, asks the agent to
  "understand the codebase", "document the project", "map the architecture",
  or when no `.agent/` documentation folder exists yet. Also trigger when the
  user says things like "learn the project first", "get familiar with the repo",
  "don't keep re-reading the files", or "generate project docs for the agent".
  Specifically optimized for Bun monorepos (workspaces, `bun.lockb`, `bunfig.toml`),
  but works on any JavaScript/TypeScript project. Also generates a root `CLAUDE.md`
  so Claude Code picks up the project context automatically on every session start.
version: 1.0.0
target: bun-monorepo
output_dir: .agent
---

# Codebase Cartographer

A skill that explores a project **once**, writes structured documentation into
`.agent/`, and gives future agent sessions a fast, reliable map of the codebase
— no repeated directory crawling required.

---

## When to Run

Run a **full exploration** when:
- `.agent/` does not exist, or
- `.agent/ARCHITECTURE.md` is missing or older than 7 days, or
- The user explicitly asks to refresh / re-map the project.

Run a **partial refresh** (only affected docs) when:
- A specific area changed (e.g. new package added → refresh `PACKAGES.md` only).

In all other cases, **read from `.agent/` directly** instead of exploring.

---

## Phase 1 — Orient (Run First)

Before any deep reading, get the lay of the land:

```bash
# 1. Top-level structure
ls -1

# 2. Confirm it's a Bun monorepo
cat package.json | grep -E '"workspaces"|"name"|"scripts"' 
cat bunfig.toml 2>/dev/null || echo "No bunfig.toml"

# 3. List all workspace packages
bun pm ls --all 2>/dev/null || find . -name "package.json" \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" | sort

# 4. Check for existing agent docs
ls .agent/ 2>/dev/null || echo "No .agent/ folder found — full exploration needed"
```

Use the output to decide the scope of exploration before reading any source file.

---

## Phase 2 — Explore

Work through these layers **in order**. Read only what is necessary to answer
each question — do not dump entire files into context unless they are small
(< 80 lines).

### 2.1 Root Configuration

| File | What to extract |
|---|---|
| `package.json` | workspace globs, root scripts, engines field |
| `bunfig.toml` | install config, registry overrides, test settings |
| `bun.lockb` | existence only (do NOT read binary) |
| `tsconfig.json` / `tsconfig.base.json` | path aliases, strict flags, target |
| `.eslintrc*` / `biome.json` | linting rules in use |
| `turbo.json` / `nx.json` | task pipeline if monorepo tooling is present |
| `.env.example` | env var surface area (never read `.env`) |

### 2.2 Package Inventory

For each workspace package found in Phase 1:

```bash
cat <pkg>/package.json   # name, version, scripts, dependencies, exports
ls <pkg>/src 2>/dev/null || ls <pkg>/lib 2>/dev/null
```

Classify each package as one of:
`app` | `service` | `library` | `tooling` | `config`

### 2.3 Entry Points & Public API

For each package, identify:
- Main entry (`main`, `module`, or `exports` field in `package.json`)
- Read the entry file — note exported symbols, not their implementation
- For apps/services: identify the server start, CLI entry, or framework bootstrap

### 2.4 Shared Internals

Look for cross-cutting patterns:
```bash
# Shared packages consumed by most others
grep -r '"@<scope>/' packages/*/package.json 2>/dev/null | \
  awk -F'"' '{print $2}' | sort | uniq -c | sort -rn | head -20
```

### 2.5 Conventions Detection

Scan a representative sample (3–5 files per type) to detect:

- **Naming**: `kebab-case` files? `PascalCase` components? `camelCase` utils?
- **Import style**: absolute aliases (`@app/`) vs relative (`../`)
- **Framework**: React / Vue / Hono / Elysia / vanilla / other
- **Test runner**: `bun test`, Vitest, Jest — check `scripts.test`
- **Code style**: Biome, ESLint+Prettier, or none
- **Error handling**: thrown errors, Result types, or unhandled
- **Async pattern**: async/await, observables, callbacks

---

## Phase 3 — Write Documentation

Create the `.agent/` directory and write **all** files below. Each file must
start with a `generated` frontmatter so the agent knows when it was last
written.

```bash
mkdir -p .agent
```

### 3.1 `.agent/ARCHITECTURE.md`

```markdown
---
generated: <ISO-8601 date>
refresh_after: 7d
---

# Architecture

## Project Type
<!-- e.g. "Bun monorepo — 6 packages, 2 apps, 4 libraries" -->

## Repository Layout
<!-- ASCII tree of top-level dirs + one-line description each -->

## Data Flow
<!-- How data moves between packages at a high level. Use a simple
     directed list: PackageA → PackageB → PackageC -->

## Key Abstractions
<!-- 3-8 concepts the agent must know: what they are, where they live -->

## External Integrations
<!-- APIs, DBs, queues, third-party SDKs — package that owns each -->
```

### 3.2 `.agent/PACKAGES.md`

```markdown
---
generated: <ISO-8601 date>
---

# Package Map

| Package | Path | Type | Entry | Purpose |
|---------|------|------|-------|---------|
| @scope/name | packages/name | library | src/index.ts | One-line purpose |

## Dependency Graph
<!-- Which packages import which. List internal deps only. -->
<!-- Format: package-a → [package-b, package-c] -->

## Shared Packages
<!-- List packages imported by 3+ others — these are load-bearing -->
```

### 3.3 `.agent/CONVENTIONS.md`

```markdown
---
generated: <ISO-8601 date>
---

# Conventions

## File & Folder Naming
<!-- e.g. "All source files: kebab-case. React components: PascalCase." -->

## Import Paths
<!-- e.g. "Use @app/* aliases defined in tsconfig.base.json. Never ../../../" -->

## TypeScript
<!-- strict mode? notable compiler options? shared tsconfig location? -->

## Testing
<!-- Test runner, file naming pattern (*.test.ts?), co-located or separate? -->

## Code Style
<!-- Formatter + linter, config file location, auto-format on save? -->

## Error Handling
<!-- Pattern in use across the project -->

## Environment Variables
<!-- Where defined, how accessed, validation library if any -->

## Git
<!-- Branch naming, commit message format, PR conventions if detectable -->
```

### 3.4 `.agent/SCRIPTS.md`

```markdown
---
generated: <ISO-8601 date>
---

# Scripts Reference

## Root Scripts
<!-- From root package.json — list name + what it does -->
| Script | Command | What it does |
|--------|---------|-------------|

## Per-Package Scripts
<!-- Only non-obvious ones that differ from root -->

## Bun-Specific
<!-- bunfig.toml settings that affect dev workflow -->
<!-- e.g. custom registry, install frozen, test timeout -->
```

### 3.5 `.agent/ENTRYPOINTS.md`

```markdown
---
generated: <ISO-8601 date>
---

# Entry Points

## Application Entry Points
<!-- For each app/service: file path, framework, how to start it -->

## Library Public APIs
<!-- For each library: entry file, what it exports at a glance -->

## CLI Tools
<!-- Any bin entries in package.json -->

## Background Jobs / Workers
<!-- If any -->
```

### 3.6 `.agent/INDEX.md` ← Agent Start-Here File

This is the navigation guide to all detailed docs. `CLAUDE.md` (below) points
here so Claude Code lands in the right place automatically.

```markdown
---
generated: <ISO-8601 date>
---

# Agent Index — Read This First

This project has been mapped. Do NOT explore the source tree from scratch.
Read the relevant doc below for the context you need, then go to the source.

## Quick Facts
- **Type**: Bun monorepo
- **Packages**: N packages (list them)
- **Apps**: (list app packages)
- **Main language**: TypeScript / JavaScript
- **Test runner**: bun test / vitest / ...
- **Last mapped**: <date>

## Navigation
| I need to know... | Read |
|---|---|
| Overall structure & data flow | `.agent/ARCHITECTURE.md` |
| What each package does | `.agent/PACKAGES.md` |
| Naming, imports, style rules | `.agent/CONVENTIONS.md` |
| How to run / build / test | `.agent/SCRIPTS.md` |
| Where the app boots / exports | `.agent/ENTRYPOINTS.md` |

## Staleness
If any doc's `generated` date is older than its `refresh_after` value,
re-run the cartographer skill on that area only.
```

### 3.7 `CLAUDE.md` ← Claude Code Auto-Loaded File

Written at the **project root** (not inside `.agent/`). Claude Code reads this
file automatically at the start of every session, making it the ideal hook to
load agent context without any manual step.

Keep this file **short and directive** — its job is to orient Claude Code fast
and point to the detailed docs, not to duplicate them.

```markdown
---
generated: <ISO-8601 date>
---

# Claude Code — Project Context

> This project has been fully mapped. Do NOT crawl the source tree from scratch.
> Follow the protocol below at the start of every session.

## Session Start Protocol

1. Read `.agent/INDEX.md` for quick facts and a navigation map.
2. Read only the `.agent/*.md` file relevant to your current task.
3. Go directly to the source files mentioned — no blind `ls` or `find`.
4. After completing a task, update the relevant `.agent/` doc if anything
   has changed (new package, renamed file, convention shift, etc.).

## Quick Reference

| Topic | File |
|---|---|
| Architecture & data flow | `.agent/ARCHITECTURE.md` |
| Package map & dependency graph | `.agent/PACKAGES.md` |
| Naming, imports, style, testing | `.agent/CONVENTIONS.md` |
| Scripts & how to run things | `.agent/SCRIPTS.md` |
| App entry points & public APIs | `.agent/ENTRYPOINTS.md` |

## Stack

- **Runtime**: Bun (monorepo with workspaces)
- **Language**: TypeScript
- **Install**: `bun install` — never `npm install`
- **Test**: `bun test`
- **Workspace filter**: `bun run --filter <pkg> <script>`

## Do Not

- Read `bun.lockb` (binary)
- Read `.env` files (use `.env.example` only)
- Re-explore directories already documented in `.agent/`
- Run `npm` or `yarn` commands — this project uses Bun exclusively

## Docs Last Generated

<ISO-8601 date> — re-run codebase-cartographer skill if stale (> 7 days).
```

---

## Phase 4 — Verify

After writing all files, do a quick sanity check:

```bash
ls -lh .agent/
head -5 CLAUDE.md
```

Then confirm to the user:
> "Documentation written to `.agent/` and `CLAUDE.md` created at the project
> root. Claude Code will now load project context automatically on every
> session start — no codebase crawling needed."

---

## Phase 5 — Future Session Protocol

**Claude Code** reads `CLAUDE.md` automatically — no manual step needed. It
instructs the agent to then load `.agent/INDEX.md` and navigate from there.

**Other agents** (without Claude Code's auto-read): start every session with:

1. `cat CLAUDE.md` — get stack facts, do-nots, and the navigation map
2. `cat .agent/INDEX.md` — full navigation to detailed docs
3. Read only the specific `.agent/*.md` file relevant to the task
4. Go directly to the source file mentioned — do not `ls` or `find` aimlessly
5. After the task, update the relevant `.agent/` doc if anything changed

---

## Bun Monorepo — Specific Notes

| Topic | Guidance |
|---|---|
| **Workspaces** | Defined in root `package.json` → `workspaces` array or glob |
| **Install** | `bun install` (reads `bun.lockb`); never run `npm install` |
| **Run scripts** | `bun run <script>` or `bun <file>` directly |
| **Test** | `bun test` — looks for `*.test.ts` / `*.spec.ts` by default |
| **Workspace filter** | `bun run --filter <pkg-name> <script>` |
| **Add dep to pkg** | `bun add <dep> --cwd packages/<name>` |
| **Lockfile** | `bun.lockb` is binary — never read or edit manually |
| **bunfig.toml** | Project-level Bun config — always check this for registry/install overrides |

---

## Output Checklist

Before finishing, confirm all files exist:

- [ ] `CLAUDE.md` ← project root
- [ ] `.agent/INDEX.md`
- [ ] `.agent/ARCHITECTURE.md`
- [ ] `.agent/PACKAGES.md`
- [ ] `.agent/CONVENTIONS.md`
- [ ] `.agent/SCRIPTS.md`
- [ ] `.agent/ENTRYPOINTS.md`

If any file could not be written due to missing information, write it with a
`<!-- TODO: could not determine -->` placeholder rather than skipping it.

---

## Maintenance Rules

| Event | Action |
|---|---|
| New package added | Update `.agent/PACKAGES.md` and `.agent/ARCHITECTURE.md` |
| New root script | Update `.agent/SCRIPTS.md` |
| Convention change (e.g. formatter swap) | Update `.agent/CONVENTIONS.md` |
| Stack change (e.g. new runtime/framework) | Update `CLAUDE.md` stack section |
| Major refactor | Re-run full exploration |
| `generated` older than `refresh_after` | Re-run exploration for that doc |

Commit both `CLAUDE.md` and `.agent/` to version control so the whole team
and every agent session benefits.
