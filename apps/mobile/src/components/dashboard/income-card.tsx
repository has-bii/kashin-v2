import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { formatIDR, percentChange } from './format'

interface IncomeCardProps {
  current: number
  previous: number
  month: string
}

export function IncomeCard({ current, previous, month }: IncomeCardProps) {
  const change = percentChange(current, previous)
  const isUp = change >= 0

  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Income</CardTitle>
          <span className="text-muted-foreground text-xs">{month}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-primary text-2xl font-bold tabular-nums">+{formatIDR(current)}</p>
        <div className="flex items-center gap-1">
          {isUp ? (
            <IconTrendingUp size={14} className="text-primary" aria-hidden="true" />
          ) : (
            <IconTrendingDown size={14} className="text-destructive" aria-hidden="true" />
          )}
          <span className={`text-xs ${isUp ? 'text-primary' : 'text-destructive'}`}>
            {isUp ? '↑' : '↓'} {Math.abs(change)}% vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
