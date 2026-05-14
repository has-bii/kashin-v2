import type { PrismaClient } from '@kashin/database'

import type { auth } from './lib/auth'

export type AppContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
    prisma: PrismaClient
  }
}
