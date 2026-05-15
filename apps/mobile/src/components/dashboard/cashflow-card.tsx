import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@kashin/ui/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kashin/ui/components/ui/select'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import * as React from 'react'

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--primary)',
  },
  spending: {
    label: 'Spending',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig

type TimeRange = '3' | '6' | '12'

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '3', label: 'Last 3 months' },
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
]

interface CashflowCardProps {
  data: { month: string; income: number; spending: number }[]
}

export function CashflowCard({ data }: CashflowCardProps) {
  // Client-side filtering based on selected range
  const [range, setRange] = React.useState<TimeRange>('3')
  const filtered = data.slice(-Number(range))

  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Cashflow</CardTitle>
          <Select value={range} onValueChange={(v) => setRange(v as TimeRange)}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[180px] w-full">
          <BarChart data={filtered} barCategoryGap="20%">
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={false} width={0} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spending" fill="var(--color-spending)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <ChartLegend content={<ChartLegendContent />} />
      </CardContent>
    </Card>
  )
}
