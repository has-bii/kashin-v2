import { z } from 'zod/v4'

export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE'])
