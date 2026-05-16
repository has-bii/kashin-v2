import type { CreateCategoryInput } from '@kashin/schema/category'
import { useMutation } from '@tanstack/react-query'

import { categoryApi } from '../lib/api'

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const res = await categoryApi.index.$post({
        json: input,
      })

      return await res.json()
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
