import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import { requireSession } from '@/middleware/require-session'
import { AppContext } from '@/types'

import { createCategorySchema, updateCategorySchema } from './schemas'
import { CategoryService } from './service'

const router = new Hono<AppContext>()

router.use('*', requireSession)

router.get('/', async (c) => {
  const user = c.get('user')
  const prisma = c.get('prisma')
  const data = await CategoryService.list(user.id, prisma)

  return c.json(data)
})

router.post('/', zValidator('json', createCategorySchema), async (c) => {
  const validated = c.req.valid('json')
  const user = c.get('user')
  const prisma = c.get('prisma')

  const data = await CategoryService.create(user.id, validated, prisma)

  return c.json(data, 201)
})

router.patch('/:id', zValidator('json', updateCategorySchema), async (c) => {
  const validated = c.req.valid('json')
  const user = c.get('user')
  const prisma = c.get('prisma')
  const id = c.req.param('id')

  const data = await CategoryService.update(user.id, id, validated, prisma)

  return c.json(data)
})

router.delete('/:id', async (c) => {
  const user = c.get('user')
  const prisma = c.get('prisma')
  const id = c.req.param('id')

  await CategoryService.delete(user.id, id, prisma)

  return c.json(null)
})

export default router
