import type { AuthInstance } from '@server/lib/auth'
import { Hono } from 'hono'

export function createAuthModule(auth: AuthInstance) {
  const router = new Hono()

  router.on(['POST', 'GET'], '/*', (c) => {
    return auth.handler(c.req.raw)
  })

  return { path: '/api/auth' as const, router }
}
