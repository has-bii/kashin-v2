import { zValidator } from '@hono/zod-validator'
import type { AppContext } from '@server/types'
import { Hono } from 'hono'
import type { MiddlewareHandler } from 'hono'

import { createCategorySchema, getCategorySchema, updateCategorySchema } from './schemas'
import { CategoryService } from './service'

export function createCategoryModule(sessionGuard: MiddlewareHandler<AppContext>) {
  return new Hono<AppContext>()
    .use('*', sessionGuard)
    .get('/', zValidator('query', getCategorySchema), async (c) => {
      const query = c.req.valid('query')
      const user = c.get('user')
      const data = await CategoryService.list(user.id, query)

      return c.json(data)
    })
    .post('/', zValidator('json', createCategorySchema), async (c) => {
      const validated = c.req.valid('json')
      const user = c.get('user')

      const data = await CategoryService.create(user.id, validated)

      return c.json(data, 201)
    })
    .patch('/:id', zValidator('json', updateCategorySchema), async (c) => {
      const validated = c.req.valid('json')
      const user = c.get('user')
      const id = c.req.param('id')

      const data = await CategoryService.update(user.id, id, validated)

      return c.json(data)
    })
    .delete('/:id', async (c) => {
      const user = c.get('user')
      const id = c.req.param('id')

      await CategoryService.delete(user.id, id)

      return c.json(null)
    })
}

export type CategoryRouteType = ReturnType<typeof createCategoryModule>
