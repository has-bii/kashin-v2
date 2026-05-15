import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/add-transaction')({
  component: AddTransaction,
})

function AddTransaction() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Add Transaction</h1>
      <p className="text-muted-foreground mt-2">Transaction form coming soon.</p>
    </div>
  )
}
