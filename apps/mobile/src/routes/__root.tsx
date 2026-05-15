import type { AuthSession } from '@kashin/features/lib/auth-client'
import '@kashin/ui/globals.css'
import { cn } from '@kashin/ui/lib/utils'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

interface AuthState {
  user: AuthSession['user'] | null
}

interface RouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className={cn(import.meta.env.DEV && 'bg-black')}>
      <div className="bg-background mx-auto min-h-dvh max-w-3xl">
        <Outlet />
      </div>
    </div>
  )
}
