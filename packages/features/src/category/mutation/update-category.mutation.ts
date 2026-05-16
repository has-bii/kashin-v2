import type { UpdateCategoryInput } from '@kashin/schema/category'
import { useMutation } from '@tanstack/react-query'

import { categoryApi } from '../lib/api'

export const useUpdateCategoryMutation = (id: string) => {
  return useMutation({
    mutationFn: async (input: UpdateCategoryInput) => {
      const res = await categoryApi[':id'].$patch({
        param: { id },
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
