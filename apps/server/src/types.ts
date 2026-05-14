import type { PrismaClient } from '@kashin/database/index'

export type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient
  }
}
