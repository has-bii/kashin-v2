import { PrivacyPage } from '@kashin/features/auth/components/PrivacyPage'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: Component,
})

function Component() {
  const navigate = useNavigate()

  return <PrivacyPage onBack={() => navigate({ to: '..' })} />
}
