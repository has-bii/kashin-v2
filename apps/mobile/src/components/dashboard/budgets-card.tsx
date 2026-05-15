import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { IconBus, IconCoin, IconShoppingCart, IconToolsKitchen2 } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

import { formatIDRCompact } from './format'

interface Budget {
  category: string
  icon: string
  spent: number
  limit: number
}

interface BudgetsCardProps {
  budgets: Budget[]
  month: string
}

const iconMap: Record<string, Icon> = {
  IconToolsKitchen2: IconToolsKitchen2,
  IconBus: IconBus,
  IconShoppingCart: IconShoppingCart,
}

function getProgressColor(pct: number): string {
  if (pct > 80) return 'bg-destructive'
  if (pct > 60) return 'bg-chart-4'
  return 'bg-primary'
}

export function BudgetsCard({ budgets, month }: BudgetsCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Budgets</CardTitle>
          <span className="text-muted-foreground text-xs">{month}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {budgets.map((budget) => {
          const pct = Math.round((budget.spent / budget.limit) * 100)
          const Icon = iconMap[budget.icon] ?? IconCoin
          return (
            <div key={budget.category} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm">{budget.category}</span>
                </div>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {formatIDRCompact(budget.spent)}/{formatIDRCompact(budget.limit)}
                </span>
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full transition-all ${getProgressColor(pct)}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
        <button className="text-primary text-xs font-medium">See all budgets →</button>
      </CardContent>
    </Card>
  )
}
