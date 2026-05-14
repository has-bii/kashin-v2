import { Context } from 'hono'
import { auth } from '../lib/auth'
import { AppContext } from '../types'

export async function injectSession(
  c: Context<AppContext>,
  next: () => Promise<void>,
) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    await next()
    return
  }

  c.set('user', session.user)
  c.set('session', session.session)
  await next()
}
