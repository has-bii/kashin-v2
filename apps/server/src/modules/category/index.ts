import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { MiddlewareHandler } from 'hono'

import type { AppContext } from '@/types'

import { createCategorySchema, updateCategorySchema } from './schemas'
import { CategoryService } from './service'

export function createCategoryModule(sessionGuard: MiddlewareHandler<AppContext>) {
  const router = new Hono<AppContext>()

  router.use('*', sessionGuard)

  router.get('/', async (c) => {
    const user = c.get('user')
    const data = await CategoryService.list(user.id)

    return c.json(data)
  })

  router.post('/', zValidator('json', createCategorySchema), async (c) => {
    const validated = c.req.valid('json')
    const user = c.get('user')

    const data = await CategoryService.create(user.id, validated)

    return c.json(data, 201)
  })

  router.patch('/:id', zValidator('json', updateCategorySchema), async (c) => {
    const validated = c.req.valid('json')
    const user = c.get('user')
    const id = c.req.param('id')

    const data = await CategoryService.update(user.id, id, validated)

    return c.json(data)
  })

  router.delete('/:id', async (c) => {
    const user = c.get('user')
    const id = c.req.param('id')

    await CategoryService.delete(user.id, id)

    return c.json(null)
  })

  return { path: '/category' as const, router }
}
