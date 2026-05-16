import type { GetCategoryInput } from '@kashin/schema/category'
import { queryOptions } from '@tanstack/react-query'

import { categoryApi } from '../lib/api'

export const CATEGORY_QUERY_KEY = 'category' as const

export const getCategoriesQueryOptions = (query: GetCategoryInput) => {
  return queryOptions({
    queryKey: [CATEGORY_QUERY_KEY, query],
    queryFn: async () => {
      const res = await categoryApi.index.$get({
        query,
      })

      const data = await res.json()

      return data
    },
  })
}
