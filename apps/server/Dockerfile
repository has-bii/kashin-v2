# ── Stage 1: Build ──
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy all workspace package.json files (lockfile references every workspace)
COPY package.json bun.lock* ./
COPY apps/server/package.json ./apps/server/
COPY apps/mobile/package.json ./apps/mobile/
COPY packages/database/package.json ./packages/database/
COPY packages/features/package.json ./packages/features/
COPY packages/ui/package.json ./packages/ui/

RUN bun install --frozen-lockfile

# Copy source + prisma schema
COPY tsconfig.json ./
COPY apps/server/tsconfig.json ./apps/server/
COPY apps/server/src ./apps/server/src/
COPY packages/database/src ./packages/database/src/
COPY packages/database/prisma ./packages/database/prisma/

# Generate Prisma client + build server (bundles all 417 modules into 1 file)
RUN bun run --filter @kashin/database db:generate && \
    bun run --filter server build

# ── Stage 2: Runner ──
FROM oven/bun:1-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 app && \
    adduser --system --uid 1001 app

COPY --from=builder --chown=app:app /app/apps/server/dist ./dist

USER app
EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "dist/index.js"]
