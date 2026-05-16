import { HTTPException } from 'hono/http-exception'

type PrismaErrorCode = string

interface ErrorMapping {
  status: number
  message: string
}

const errorMap = new Map<PrismaErrorCode, ErrorMapping>([
  ['P2002', { status: 409, message: 'Unique constraint violation' }],
  ['P2025', { status: 404, message: 'Record not found' }],
])

interface PrismaError {
  code: string
}

export function throwIfKnown(err: PrismaError, override?: Partial<ErrorMapping>): never {
  const mapping = errorMap.get(err.code)
  if (mapping) {
    throw new HTTPException((override?.status ?? mapping.status) as 400, {
      message: override?.message ?? mapping.message,
    })
  }
  throw err
}
