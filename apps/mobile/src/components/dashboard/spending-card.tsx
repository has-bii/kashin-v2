import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { formatIDR, percentChange } from './format'

interface SpendingCardProps {
  current: number
  previous: number
  month: string
}

export function SpendingCard({ current, previous, month }: SpendingCardProps) {
  const change = percentChange(current, previous)
  // Inverse semantics: less spending = good (primary), more spending = bad (destructive)
  const isDown = change <= 0

  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Spending</CardTitle>
          <span className="text-muted-foreground text-xs">{month}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-destructive text-2xl font-bold tabular-nums">-{formatIDR(current)}</p>
        <div className="flex items-center gap-1">
          {isDown ? (
            <IconTrendingDown size={14} className="text-primary" aria-hidden="true" />
          ) : (
            <IconTrendingUp size={14} className="text-destructive" aria-hidden="true" />
          )}
          <span className={`text-xs ${isDown ? 'text-primary' : 'text-destructive'}`}>
            {isDown ? '↓' : '↑'} {Math.abs(change)}% vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
