import { LoginPage } from '@kashin/features/auth/components/LoginPage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      error: search.error as string | undefined,
    }
  },
  beforeLoad: ({ context }) => {
    if (context.auth.user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: Component,
})

function Component() {
  const { error } = Route.useSearch()

  return <LoginPage error={error} />
}
