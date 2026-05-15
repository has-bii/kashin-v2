import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { Separator } from '@kashin/ui/components/ui/separator'
import {
  IconBus,
  IconCash,
  IconCoin,
  IconDeviceTv,
  IconShoppingCart,
  IconToolsKitchen2,
} from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

import { formatIDR, formatRelativeTime } from './format'

interface Transaction {
  id: string
  merchant: string
  description: string | null
  amount: number
  type: 'expense' | 'income'
  category: string
  date: Date
}

interface RecentTransactionsCardProps {
  transactions: Transaction[]
}

const categoryIcons: Record<string, Icon> = {
  Dining: IconToolsKitchen2,
  Transit: IconBus,
  Groceries: IconShoppingCart,
  Entertainment: IconDeviceTv,
  Salary: IconCash,
}

export function RecentTransactionsCard({ transactions }: RecentTransactionsCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {transactions.map((tx) => {
            const Icon = categoryIcons[tx.category] ?? IconCoin
            const isExpense = tx.type === 'expense'
            return (
              <div key={tx.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <Icon size={16} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{tx.merchant}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <span
                    className={`text-sm font-medium tabular-nums ${isExpense ? 'text-destructive' : 'text-primary'}`}
                  >
                    {isExpense ? '-' : '+'}
                    {formatIDR(tx.amount)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatRelativeTime(tx.date)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        <Separator className="my-2" />
        <Link to="/activity" className="text-primary text-xs font-medium">
          See all activity →
        </Link>
      </CardContent>
    </Card>
  )
}
