import { prisma } from '@kashin/database'
import { Hono } from 'hono'

const health = new Hono()

health.get('/', (c) => {
  return c.json({ status: 'up' })
})

health.get('/database', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return c.json({ status: 'up' })
  } catch (e) {
    return c.json({ status: 'down' }, 500)
  }
})

export default health
