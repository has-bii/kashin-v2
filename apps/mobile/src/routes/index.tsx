import { authClient } from '@kashin/features/lib/auth-client'
import { Button } from '@kashin/ui/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data, isPending } = authClient.useSession()

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Button>Testing</Button>
      {isPending && <p>Loading...</p>}
      {data && <p>Logged in as {data.user.name}</p>}
    </div>
  )
}
