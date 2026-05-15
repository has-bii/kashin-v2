import { Hono } from 'hono'

import { prisma } from '@kashin/database'

export function createHealthModule() {
  const router = new Hono()

  router.get('/', async (c) => {
    try {
      await prisma.$queryRaw`SELECT 1`
      return c.json({ status: 'up' })
    } catch (e) {
      console.error(e)
      return c.json({ status: 'down' }, 500)
    }
  })

  return { path: '/health' as const, router }
}
