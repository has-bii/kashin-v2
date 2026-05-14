import { PrismaPg } from '@prisma/adapter-pg'
import { attachDatabasePool } from '@vercel/functions'
import { Pool } from 'pg'

import { PrismaClient } from './generated/prisma/client'

const pool = new Pool({ connectionString: process.env.POSTGRES_URL })

if (process.env.NODE_ENV === 'production') {
  attachDatabasePool(pool)
}

const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
