import { authClient } from '@kashin/features/lib/auth-client'
import { Button } from '@kashin/ui/components/ui/button'

export function LoginPage() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${import.meta.env.VITE_APP_URL}/`,
      errorCallbackURL: `${import.meta.env.VITE_APP_URL}/login`,
    })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to Kashin</h1>
        <p className="text-balance text-muted-foreground">Sign in to your account</p>
      </div>
      <Button onClick={handleGoogleSignIn} size="lg">
        Sign in with Google
      </Button>
    </div>
  )
}
