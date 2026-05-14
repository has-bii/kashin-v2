import { Hono } from 'hono'

import { AppContext } from './types'

const health = new Hono<AppContext>()

health.get('/', (c) => {
  return c.json({ status: 'up' })
})

health.get('/database', async (c) => {
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
