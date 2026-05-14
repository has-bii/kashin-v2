import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import health from './health'
import { auth } from './lib/auth'
import { ContextWithSession } from './types'

import 'dotenv/config'

const app = new Hono<ContextWithSession>()

app.use(logger())

app.use(
  cors({
    origin: [
      process.env.MOBILE_URL || 'http://localhost:5173',
      process.env.DESKTOP_URL || 'http://localhost:5174',
    ],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)

app.route('/health', health)

// Session middleware — injects user + session into Hono context
app.use('*', async (c, next) => {
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
})

// Better Auth handler — handles all /api/auth requests
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound((c) => {
  return c.text('Not Found', 404)
})

app.onError((err, c) => {
  return c.text(err.message, 500)
})

export default app
