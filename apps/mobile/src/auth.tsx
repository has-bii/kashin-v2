import { authClient } from '@kashin/features/lib/auth-client'
import type { AuthSession } from '@kashin/features/lib/auth-client'
import { IconLoader } from '@tabler/icons-react'

import { createContext, useContext } from 'react'

interface AuthState {
  user: AuthSession['user'] | null
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-flex items-center gap-1.5">
          <IconLoader className="animate-spin" /> Loading...
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user: data?.user || null }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
