import { Hono } from 'hono'

import { auth } from '../lib/auth'
import { AppContext } from '../types'

const authRoutes = new Hono<AppContext>()

authRoutes.on(['POST', 'GET'], '/*', (c) => {
  return auth.handler(c.req.raw)
})

export default authRoutes
