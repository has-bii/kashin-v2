import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth/minimal'

import 'dotenv/config'

import { prisma } from '../lib/prisma'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL as string,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
      strategy: 'compact',
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.DOMAIN || 'localhost',
    },
    database: {
      generateId: false,
    },
  },
  trustedOrigins: [
    process.env.MOBILE_URL || 'http://localhost:5173',
    process.env.DESKTOP_URL || 'http://localhost:5174',
  ],
})
