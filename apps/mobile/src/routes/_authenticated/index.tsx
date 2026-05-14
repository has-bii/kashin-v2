import { authClient } from '@kashin/features/lib/auth-client'
import { Button } from '@kashin/ui/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Home,
})

function Home() {
  const navigate = Route.useNavigate()
  const { auth } = Route.useRouteContext()
  const { refetch } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut()
    await refetch()
    navigate({
      to: '.',
    })
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Kashin</h1>
      {auth.user && <p>Logged in as {auth.user.name}</p>}
      <Button onClick={handleLogout} variant="destructive">
        Sign out
      </Button>
    </div>
  )
}
