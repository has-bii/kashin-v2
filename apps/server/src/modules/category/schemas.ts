import { TransactionTypeSchema } from '@server/schemas/transaction-type.schema'
import { z } from 'zod'

export const getCategorySchema = z.object({
  type: TransactionTypeSchema.optional(),
})

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  type: TransactionTypeSchema,
  icon: z.string().max(50).optional(),
  color: z.string().max(7).optional(),
})

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  type: TransactionTypeSchema.optional(),
  icon: z.string().max(50).nullable().optional(),
  color: z.string().max(7).nullable().optional(),
})

export type GetCategoryInput = z.infer<typeof getCategorySchema>
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
