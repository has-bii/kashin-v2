import { Hono } from 'hono'

import type { AuthInstance } from '@/lib/auth'

export function createAuthModule(auth: AuthInstance) {
  const router = new Hono()

  router.on(['POST', 'GET'], '/*', (c) => {
    return auth.handler(c.req.raw)
  })

  return { path: '/api/auth' as const, router }
}
