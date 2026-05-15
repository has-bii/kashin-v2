import 'dotenv/config'

import { createApp } from './app'
import { loadConfig } from './config'
import health from './health'
import authRoutes from './routes/auth'
import categoryRoutes from './routes/categories'

const config = loadConfig()
const app = createApp(config)

// Mount route groups
app.route('/health', health)
app.route('/api/auth', authRoutes)
app.route('/categories', categoryRoutes)

app.get('/', (c) => c.text('Hello Hono!'))

export default app
