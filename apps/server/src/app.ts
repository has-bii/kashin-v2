import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { ServerConfig } from '@/config'
import { withPrisma } from '@/lib/prisma'

export function createApp(config: ServerConfig) {
  const app = new Hono()

  app.use(logger())

  app.use(
    cors({
      origin: [config.mobileUrl, config.desktopUrl],
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'PATCH', 'DELETE'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
  )

  // Global middleware — available on every route
  app.use(withPrisma)

  app.notFound((c) => c.text('Not Found', 404))
  app.onError((err, c) => c.text(err.message, 500))

  return app
}
