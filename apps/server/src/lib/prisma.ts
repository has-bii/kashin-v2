import { prisma } from '@kashin/database'
import { Context, Next } from 'hono'

function withPrisma(c: Context, next: Next) {
  if (!c.get('prisma')) {
    c.set('prisma', prisma)
  }
  return next()
}

export { withPrisma }
