"use client"

import { TrendingUp, TrendingDown, Target, Users, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useData } from "@/lib/data-context"
import { formatCLP, getPlanLabel } from "@/lib/utils"
import { cn } from "@/lib/utils"

export function BusinessIntelligence() {
  const { metrics } = useData()

  const revenueChange = Math.round(
    ((metrics.monthlyRevenue - metrics.previousMonthRevenue) / metrics.previousMonthRevenue) * 100,
  )
  const isPositive = revenueChange >= 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Revenue */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Ingresos Mensuales</span>
            <span className={cn("text-xs flex items-center gap-0.5", isPositive ? "text-success" : "text-destructive")}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {revenueChange}%
            </span>
          </div>
          <span className="font-bold text-xl">{formatCLP(metrics.monthlyRevenue)}</span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-1.5 mb-1">
              <Target className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Margen</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="font-bold text-lg">{metrics.profitMargin}%</span>
              <span className="text-xs text-muted-foreground mb-0.5">/ 35%</span>
            </div>
            <Progress value={metrics.profitMargin} max={35} className="h-1 mt-1" />
          </div>

          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Conversión</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="font-bold text-lg">{metrics.quoteConversion}%</span>
              <span className="text-xs text-muted-foreground mb-0.5">/ 70%</span>
            </div>
            <Progress value={metrics.quoteConversion} max={70} className="h-1 mt-1" />
          </div>
        </div>

        {/* Client Satisfaction */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm">Satisfacción</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">{metrics.clientSatisfaction}</span>
            <span className="text-muted-foreground">/5</span>
          </div>
        </div>

        {/* Plan Performance */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Por Plan</span>
          {metrics.planStats.map((stat) => (
            <div key={stat.plan} className="flex items-center gap-2 text-sm">
              <span className="w-20 truncate text-muted-foreground">{getPlanLabel(stat.plan)}</span>
              <Progress value={stat.winRate} className="flex-1 h-2" />
              <span className="w-10 text-right font-mono text-xs">{stat.winRate}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
