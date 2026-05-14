import { authClient } from '@kashin/features/lib/auth-client'
import { Button } from '@kashin/ui/components/ui/button'
import { Alert, AlertDescription } from '@kashin/ui/components/ui/alert'
import { Card, CardContent, CardFooter, CardHeader } from '@kashin/ui/components/ui/card'
import { IconLoader } from '@tabler/icons-react'

import { useCallback, useState } from 'react'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

interface Props {
  error?: string
}

export function LoginPage({ error }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(error || null)

  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true)
    setLocalError(null)

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${import.meta.env.VITE_APP_URL}/`,
        errorCallbackURL: `${import.meta.env.VITE_APP_URL}/login`,
      })
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="bg-accent/40 flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold shadow-sm">
            K
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight">Welcome to Kashin</h1>
            <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Button variant="outline" size="lg" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? (
              <IconLoader className="size-4 animate-spin" />
            ) : (
              <GoogleIcon className="size-4" />
            )}
            {isLoading ? 'Redirecting…' : 'Sign in with Google'}
          </Button>

          {localError && (
            <Alert variant="destructive">
              <AlertDescription>{localError}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-muted-foreground text-center text-xs leading-relaxed">
            By signing in, you agree to our{' '}
            <a href="/terms" className="hover:text-foreground underline underline-offset-2">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="hover:text-foreground underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
