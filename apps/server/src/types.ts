import type { PrismaClient } from '@kashin/database/index'

import type { auth } from './lib/auth'

export type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient
  }
}

export type ContextWithSession = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
    prisma: PrismaClient
  }
}
