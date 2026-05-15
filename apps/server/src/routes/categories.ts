import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { requireSession } from '../middleware/require-session'
import { AppContext } from '../types'

const categories = new Hono<AppContext>()

// ── Zod Schemas ──────────────────────────

const createSchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().max(50).optional(),
  color: z.string().max(7).optional(),
})

const updateSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  icon: z.string().max(50).nullable().optional(),
  color: z.string().max(7).nullable().optional(),
})

// ── Middleware ────────────────────────────

categories.use('*', requireSession())

// ── Routes ────────────────────────────────

// List
categories.get('/', async (c) => {
  const user = c.get('user')!
  const prisma = c.get('prisma')

  const list = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { name: 'asc' },
  })

  return c.json(list)
})

// Create
categories.post('/', async (c) => {
  const user = c.get('user')!
  const prisma = c.get('prisma')
  const body = await c.req.json()

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    throw new HTTPException(400, { message: parsed.error.message })
  }

  const category = await prisma.category
    .create({
      data: { ...parsed.data, userId: user.id },
    })
    .catch((err) => {
      if (err.code === 'P2002') {
        throw new HTTPException(409, { message: 'Category name already exists' })
      }
      throw err
    })

  return c.json(category, 201)
})

// Update
categories.patch('/:id', async (c) => {
  const user = c.get('user')!
  const prisma = c.get('prisma')
  const id = c.req.param('id')
  const body = await c.req.json()

  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    throw new HTTPException(400, { message: parsed.error.message })
  }

  const category = await prisma.category
    .update({
      where: { id, userId: user.id },
      data: parsed.data,
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

  return c.json(category)
})

// Delete
categories.delete('/:id', async (c) => {
  const user = c.get('user')!
  const prisma = c.get('prisma')
  const id = c.req.param('id')

  await prisma.category
    .delete({
      where: { id, userId: user.id },
    })
    .catch((err) => {
      if (err.code === 'P2025') {
        throw new HTTPException(404, { message: 'Category not found' })
      }
      throw err
    })

  return c.json({ success: true }, 200)
})

export default categories
