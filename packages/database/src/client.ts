import { PrismaPg } from '@prisma/adapter-pg'
import { attachDatabasePool } from '@vercel/functions'
import { Pool } from 'pg'

import { PrismaClient } from './generated/prisma/client'

import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString: DATABASE_URL })

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
