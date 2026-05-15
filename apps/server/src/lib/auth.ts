import { prisma } from '@kashin/database/client'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth/minimal'

import type { AuthConfig } from '@/config'

export function createAuth(config: AuthConfig) {
  return betterAuth({
    baseURL: config.baseURL,
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    socialProviders: {
      google: {
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: config.cookieCacheMaxAge,
        strategy: 'compact',
      },
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: config.domain,
      },
      database: {
        generateId: false,
      },
    },
    trustedOrigins: config.trustedOrigins,
  })
}

export type AuthInstance = ReturnType<typeof createAuth>
