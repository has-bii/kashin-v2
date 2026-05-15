import { PrismaClient } from '@kashin/database'
import { HTTPException } from 'hono/http-exception'

import type { CreateCategoryInput, UpdateCategoryInput } from './schemas'

export abstract class CategoryService {
  static async list(userId: string, prisma: PrismaClient) {
    return prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    })
  }

  static async create(userId: string, data: CreateCategoryInput, prisma: PrismaClient) {
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

  static async update(userId: string, id: string, data: UpdateCategoryInput, prisma: PrismaClient) {
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

  static async delete(userId: string, id: string, prisma: PrismaClient) {
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
