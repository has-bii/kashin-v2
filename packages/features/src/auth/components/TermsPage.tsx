import { Button } from '@kashin/ui/components/ui/button'
import { IconArrowLeft } from '@tabler/icons-react'

interface Props {
  onBack: () => void
}

export function TermsPage({ onBack }: Props) {
  return (
    <div className="bg-background min-h-svd">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-8 -ml-2">
          <IconArrowLeft className="size-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground mt-2 text-sm">Last updated: May 14, 2026</p>

        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Kashin ("the Service"), you accept and agree to be bound by the
            terms and provision of this agreement. If you do not agree to abide by these terms,
            please do not use this service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Kashin provides financial tracking and management tools. The Service allows you to
            create an account, track expenses, manage budgets, and view financial insights.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to accept responsibility for all activities that occur under your account. You
            must immediately notify Kashin of any unauthorized use of your account.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Submit false or misleading information</li>
            <li>Interfere with the proper functioning of the Service</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Kashin
            and are protected by international copyright, trademark, and other intellectual property
            laws.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice, for any
            reason, including breach of these Terms. Upon termination, your right to use the Service
            will immediately cease.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            Kashin shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of the Service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of
            significant changes via email or through the Service. Your continued use of the Service
            after changes constitutes acceptance of the new terms.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:support@kashin.app">support@kashin.app</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
