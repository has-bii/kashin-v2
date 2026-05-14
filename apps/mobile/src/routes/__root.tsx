import type { AuthSession } from '@kashin/features/lib/auth-client'
import '@kashin/ui/globals.css'
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
  return <Outlet />
}
