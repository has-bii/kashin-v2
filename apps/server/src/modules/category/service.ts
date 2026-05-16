import { prisma } from '@kashin/database'
import type {
  CreateCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from '@kashin/schema/category'
import { HTTPException } from 'hono/http-exception'

export abstract class CategoryService {
  static async list(userId: string, query: GetCategoryInput) {
    return prisma.category.findMany({
      where: { userId, ...query },
      orderBy: { name: 'asc' },
    })
  }

  static async create(userId: string, data: CreateCategoryInput) {
    return prisma.category
      .create({
        data: { ...data, userId },
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          throw new HTTPException(409, { message: 'Category name already exists' })
        }
        throw err
      })
  }

  static async update(userId: string, id: string, data: UpdateCategoryInput) {
    return prisma.category
      .update({
        where: { id, userId },
        data,
      })
      .catch((err) => {
        if (err.code === 'P2025') {
          throw new HTTPException(404, { message: 'Category not found' })
        }
        if (err.code === 'P2002') {
          throw new HTTPException(409, { message: 'Category name already exists' })
        }
        throw err
      })
  }

  static async delete(userId: string, id: string) {
    return prisma.category
      .delete({
        where: { id, userId },
      })
      .catch((err) => {
        if (err.code === 'P2025') {
          throw new HTTPException(404, { message: 'Category not found' })
        }
        throw err
      })
  }
}
