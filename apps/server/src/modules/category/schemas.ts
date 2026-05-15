import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().max(50).optional(),
  color: z.string().max(7).optional(),
})

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  icon: z.string().max(50).nullable().optional(),
  color: z.string().max(7).nullable().optional(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
