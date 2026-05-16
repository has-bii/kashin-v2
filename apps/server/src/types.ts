import type { AuthInstance } from '@server/lib/auth'
import type { Hono } from 'hono'

type SessionData = AuthInstance['$Infer']['Session']

export type AppContext = {
  Variables: {
    user: SessionData['user']
    session: SessionData['session']
  }
}

// Hono generic params are covariant — sub-apps with typed context
// aren't assignable to the base Hono type. Use unknown to accept all.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AppModule {
  path: string
  router: Hono<any, any, any>
}
