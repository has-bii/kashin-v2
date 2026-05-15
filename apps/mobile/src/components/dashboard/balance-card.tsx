import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { Separator } from '@kashin/ui/components/ui/separator'

import { formatIDR } from './format'

interface BalanceCardProps {
  total: number
  accounts: { name: string; balance: number }[]
  month: string
}

export function BalanceCard({ total, accounts, month }: BalanceCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs font-normal tracking-wider uppercase">
          Total Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold tabular-nums">{formatIDR(total)}</span>
          <span className="text-muted-foreground text-xs">{month}</span>
        </div>
        <Separator />
        <div className="divide-y">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <span className="text-muted-foreground text-sm">{account.name}</span>
              <span className="text-sm font-medium tabular-nums">{formatIDR(account.balance)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
