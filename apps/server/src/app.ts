import type { ServerConfig } from '@server/config'
import type { AppModule } from '@server/types'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

export function createApp(config: ServerConfig, modules: AppModule[]) {
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

  app.notFound((c) => c.text('Not Found', 404))
  app.onError((err, c) => c.text(err.message, 500))

  for (const { path, router } of modules) {
    app.route(path, router)
  }

  return app
}
