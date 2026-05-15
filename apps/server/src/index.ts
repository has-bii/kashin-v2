import 'dotenv/config'

import { createApp } from '@/app'
import { loadConfig } from '@/config'
import { createAuth } from '@/lib/auth'
import { createSessionGuard } from '@/middleware/require-session'
import { createAuthModule } from '@/modules/auth'
import { createCategoryModule } from '@/modules/category'
import { createHealthModule } from '@/modules/health'

const config = loadConfig()
const auth = createAuth(config.auth)
const sessionGuard = createSessionGuard(auth)

const app = createApp(config, [
  createAuthModule(auth),
  createHealthModule(),
  createCategoryModule(sessionGuard),
])

app.get('/', (c) => c.text('Hello Hono!'))

export default app
