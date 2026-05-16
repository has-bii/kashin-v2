import type { AuthInstance } from '@server/lib/auth'
import type { AppContext } from '@server/types'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

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
