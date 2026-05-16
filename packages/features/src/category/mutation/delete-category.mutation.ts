import { useMutation } from '@tanstack/react-query'

import { categoryApi } from '../lib/api'

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (categoryId: string) => {
      const res = await categoryApi[':id'].$delete({
        param: { id: categoryId },
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
