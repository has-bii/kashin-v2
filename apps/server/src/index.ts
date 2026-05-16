import { createApp } from '@server/app'
import { loadConfig } from '@server/config'
import { createAuth } from '@server/lib/auth'
import { createSessionGuard } from '@server/middleware/require-session'
import { createAuthModule } from '@server/modules/auth'
import { createCategoryModule } from '@server/modules/category'
import { createHealthModule } from '@server/modules/health'

import 'dotenv/config'

const config = loadConfig()
const auth = createAuth(config.auth)
const sessionGuard = createSessionGuard(auth)

const app = createApp(config, [createAuthModule(auth), createHealthModule()])

app.route('/category', createCategoryModule(sessionGuard))

app.get('/', (c) => c.text('Hello Hono!'))

export default app
