import { Button } from '@kashin/ui/components/ui/button'
import { IconArrowLeft } from '@tabler/icons-react'

interface Props {
  onBack: () => void
}

export function PrivacyPage({ onBack }: Props) {
  return (
    <div className="bg-background min-h-svd">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-8 -ml-2">
          <IconArrowLeft className="size-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2 text-sm">Last updated: May 14, 2026</p>

        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us:</p>
          <ul>
            <li>
              <strong>Account information:</strong> Your name, email address, and profile photo
              (provided by your sign-in provider).
            </li>
            <li>
              <strong>Financial data:</strong> Expense records, budgets, and financial transactions
              you enter into the Service.
            </li>
            <li>
              <strong>Usage data:</strong> Information about how you use the Service, including
              pages visited, features used, and interaction patterns.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve the Service</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage trends to improve user experience</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties.
            This does not include trusted third parties who assist us in operating the Service, so
            long as they agree to keep this information confidential.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information. However, no method of transmission over the Internet or electronic storage
            is 100% secure.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes
            outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>7. Third-Party Services</h2>
          <p>
            The Service may use third-party services such as Google Sign-In for authentication.
            These services have their own privacy policies, and we encourage you to review them.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            The Service is not intended for children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@kashin.app">support@kashin.app</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
