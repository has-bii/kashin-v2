import { TermsPage } from '@kashin/features/auth/components/TermsPage'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: Component,
})

function Component() {
  const navigate = useNavigate()

  return <TermsPage onBack={() => navigate({ to: '..' })} />
}
