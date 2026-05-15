import {
  IconHome,
  IconHomeFilled,
  IconPlus,
  IconReceipt,
  IconReceiptFilled,
  IconSettings,
  IconSettingsFilled,
  IconSparkles,
  IconSparklesFilled,
} from '@tabler/icons-react'
import { Link, useLocation } from '@tanstack/react-router'

const tabs = [
  {
    to: '/' as const,
    label: 'Home',
    icon: IconHome,
    iconFilled: IconHomeFilled,
  },
  {
    to: '/activity' as const,
    label: 'Activity',
    icon: IconReceipt,
    iconFilled: IconReceiptFilled,
  },
  {
    to: '/add-transaction' as const,
    label: 'Add',
    icon: IconPlus,
    isCenter: true,
  },
  {
    to: '/ai-sync' as const,
    label: 'AI Sync',
    icon: IconSparkles,
    iconFilled: IconSparklesFilled,
  },
  {
    to: '/settings' as const,
    label: 'Settings',
    icon: IconSettings,
    iconFilled: IconSettingsFilled,
  },
] as const

export function BottomNav() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="border-border bg-background fixed bottom-0 z-50 mx-auto h-20 w-full max-w-3xl border-t">
      <div className="mx-auto flex h-16 items-center justify-around px-6">
        {tabs.map((tab) => {
          if ('isCenter' in tab) {
            return (
              <Link key={tab.to} to={tab.to} className="h-full" aria-label={tab.label}>
                <div className="bg-primary text-primary-foreground -mt-7 flex h-14 w-14 items-center justify-center rounded-full shadow-lg">
                  <tab.icon size={24} aria-hidden="true" />
                </div>
              </Link>
            )
          }

          const active = isActive(tab.to)
          const Icon = active ? tab.iconFilled : tab.icon

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex h-full w-14 flex-col items-center justify-center"
              aria-label={tab.label}
            >
              <Icon
                size={20}
                className={active ? 'text-primary' : 'text-muted-foreground'}
                aria-hidden="true"
              />
              <span
                className={`mt-1 text-xs whitespace-nowrap ${active ? 'text-primary font-bold' : 'text-muted-foreground font-medium'}`}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
