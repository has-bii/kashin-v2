import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { withPrisma } from './lib/prisma'
import { injectSession } from './middleware/session'
import { ServerConfig } from './config'
import { AppContext } from './types'

export function createApp(config: ServerConfig) {
  const app = new Hono<AppContext>()

  app.use(logger())

  app.use(
    cors({
      origin: [config.mobileUrl, config.desktopUrl],
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
  )

  // Global middleware — available on every route
  app.use(withPrisma)
  app.use(injectSession)

  app.notFound((c) => c.text('Not Found', 404))
  app.onError((err, c) => c.text(err.message, 500))

  return app
}
