export type AuthConfig = {
  baseURL: string
  googleClientId: string
  googleClientSecret: string
  domain: string
  trustedOrigins: string[]
  cookieCacheMaxAge: number
}

export type ServerConfig = {
  mobileUrl: string
  desktopUrl: string
  nodeEnv: string
  auth: AuthConfig
}

export function loadConfig(): ServerConfig {
  return {
    mobileUrl: process.env.MOBILE_URL || 'http://localhost:5173',
    desktopUrl: process.env.DESKTOP_URL || 'http://localhost:5174',
    nodeEnv: process.env.NODE_ENV || 'development',
    auth: {
      baseURL: process.env.BETTER_AUTH_URL!,
      googleClientId: process.env.GOOGLE_CLIENT_ID!,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      domain: process.env.DOMAIN || 'localhost',
      trustedOrigins: [
        process.env.MOBILE_URL || 'http://localhost:5173',
        process.env.DESKTOP_URL || 'http://localhost:5174',
      ],
      cookieCacheMaxAge: 5 * 60, // 5 minutes
    },
  }
}
