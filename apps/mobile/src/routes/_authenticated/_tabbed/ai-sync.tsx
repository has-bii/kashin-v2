import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/ai-sync')({
  component: AiSync,
})

function AiSync() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">AI Sync</h1>
      <p className="text-muted-foreground mt-2">Email sync coming soon.</p>
    </div>
  )
}
