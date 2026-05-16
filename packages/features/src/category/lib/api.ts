import type { CategoryRouteType } from '@server/modules/category'
import { hc } from 'hono/client'

export const categoryApi = hc<CategoryRouteType>(`${import.meta.env.VITE_API_URL}/category`)
