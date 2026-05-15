import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/activity')({
  component: Activity,
})

function Activity() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Activity</h1>
      <p className="text-muted-foreground mt-2">Transaction history coming soon.</p>
    </div>
  )
}
