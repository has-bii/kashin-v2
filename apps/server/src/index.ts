import { Hono } from 'hono'
import { logger } from 'hono/logger'

import health from './health'

const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound((c) => {
  return c.text('Not Found', 404)
})

app.onError((err, c) => {
  return c.text(err.message, 500)
})

app.route("/health", health)

export default app
