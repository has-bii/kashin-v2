import type { AuthSession } from '@kashin/features/lib/auth-client'
import '@kashin/ui/globals.css'
import { cn } from '@kashin/ui/lib/utils'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

interface AuthState {
  user: AuthSession['user'] | null
}

interface RouterContext {
  auth: AuthState
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className={cn(import.meta.env.DEV && 'bg-black')}>
      <div className="bg-background mx-auto flex min-h-dvh max-w-3xl flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
