import { Context, MiddlewareHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { AppContext } from '../types'

export function requireSession(): MiddlewareHandler<AppContext> {
  return async (c: Context<AppContext>, next) => {
    const user = c.get('user')
    const session = c.get('session')

    if (!user || !session) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    await next()
  }
}
