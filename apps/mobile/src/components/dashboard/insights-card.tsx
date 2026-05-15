import { Card, CardContent, CardHeader, CardTitle } from '@kashin/ui/components/ui/card'
import { IconAlertTriangle, IconBulb, IconSparkles } from '@tabler/icons-react'

interface Insight {
  type: 'tip' | 'warning'
  message: string
}

interface InsightsCardProps {
  insights: Insight[]
}

export function InsightsCard({ insights }: InsightsCardProps) {
  if (insights.length === 0) return null

  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconSparkles size={16} className="text-primary" aria-hidden="true" />
          <CardTitle className="text-base font-medium">Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex gap-2">
            {insight.type === 'tip' ? (
              <IconBulb size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <IconAlertTriangle
                size={16}
                className="text-destructive mt-0.5 shrink-0"
                aria-hidden="true"
              />
            )}
            <p className="text-foreground text-sm">{insight.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
