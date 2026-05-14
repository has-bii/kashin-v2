import { Hono } from 'hono'

import withPrisma from './lib/prisma'
import { ContextWithPrisma } from './types'

const health = new Hono<ContextWithPrisma>()

health.get('/', (c) => {
  return c.json({ status: 'up' })
})

health.get('/database', withPrisma, async (c) => {
  try {
    const prisma = c.get('prisma')
    await prisma.$queryRaw`SELECT 1`
    return c.json({ status: 'up' })
  } catch (e) {
    console.error(e)
    return c.json({ status: 'down' }, 500)
  }
})

export default health
