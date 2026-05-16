import type { CategoryRouteType } from '@kashin/api/category'
import { hc } from 'hono/client'

export const categoryApi = hc<CategoryRouteType>(`${import.meta.env.VITE_API_URL}/category`)
