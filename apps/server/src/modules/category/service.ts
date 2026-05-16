import { prisma } from '@kashin/database'
import type {
  CreateCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from '@kashin/schema/category'
import { throwIfKnown } from '@server/lib/prisma-error'

export abstract class CategoryService {
  static async list(userId: string, query: GetCategoryInput) {
    return prisma.category.findMany({
      where: { userId, ...query },
      orderBy: { name: 'asc' },
    })
  }

  static async create(userId: string, data: CreateCategoryInput) {
    return prisma.category
      .create({ data: { ...data, userId } })
      .catch((err) => throwIfKnown(err, { message: 'Category name already exists' }))
  }

  static async update(userId: string, id: string, data: UpdateCategoryInput) {
    return prisma.category
      .update({ where: { id, userId }, data })
      .catch((err) => throwIfKnown(err, { message: 'Category name already exists' }))
  }

  static async delete(userId: string, id: string) {
    return prisma.category
      .delete({ where: { id, userId } })
      .catch((err) => throwIfKnown(err, { message: 'Category not found' }))
  }
}
