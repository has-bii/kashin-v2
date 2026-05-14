export type ServerConfig = {
  mobileUrl: string
  desktopUrl: string
  nodeEnv: string
}

export function loadConfig(): ServerConfig {
  return {
    mobileUrl: process.env.MOBILE_URL || 'http://localhost:5173',
    desktopUrl: process.env.DESKTOP_URL || 'http://localhost:5174',
    nodeEnv: process.env.NODE_ENV || 'development',
  }
}
