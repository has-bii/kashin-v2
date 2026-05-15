import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

import type { AuthInstance } from '@/lib/auth'
import type { AppContext } from '@/types'

export function createSessionGuard(auth: AuthInstance) {
  return createMiddleware<AppContext>(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    c.set('user', session.user)
    c.set('session', session.session)
    await next()
  })
}
