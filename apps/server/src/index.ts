import 'dotenv/config'

import { createApp } from '@/app'
import { loadConfig } from '@/config'
import authRouter from '@/modules/auth'
import category from '@/modules/category'
import health from '@/modules/health'

const config = loadConfig()
const app = createApp(config)

// Mount route groups
app.route('/health', health)
app.route('/api/auth', authRouter)
app.route('/category', category)

app.get('/', (c) => c.text('Hello Hono!'))

export default app
