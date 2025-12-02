"use client"

import { TrendingUp, TrendingDown, Target, Users, Award, Loader2, AlertCircle } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCLP, getPlanLabel } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  AreaChartInteractive,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  RadarChartComponent,
  RadialChartComponent
} from "@/components/charts"
import {
  transformRevenueData,
  transformProjectData,
  transformQuoteTrendData,
  transformRevenueDistributionData,
  transformPerformanceData,
  transformProgressData
} from "@/lib/chart-data"

export function BusinessIntelligence() {
  const metricsQuery = useQuery(api.quotes.getMetrics)

  // Handle loading state
  if (metricsQuery === undefined) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              Cargando métricas...
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-[400px]">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Handle error state
  if (metricsQuery === null) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <AlertCircle className="w-4 h-4" />
              Error al cargar datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No se pudieron cargar las métricas. Por favor, intenta nuevamente.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const metrics = metricsQuery

  // Transform data for charts
  const revenueData = transformRevenueData(metrics)
  const projectData = transformProjectData(metrics)
  const quoteTrendData = transformQuoteTrendData(metrics)
  const revenueDistributionData = transformRevenueDistributionData(metrics)
  const performanceData = transformPerformanceData(metrics)
  const progressData = transformProgressData(metrics)

  const revenueChange = metrics.previousMonthRevenue > 0
    ? Math.round(
        ((metrics.monthlyRevenue - metrics.previousMonthRevenue) / metrics.previousMonthRevenue) * 100,
      )
    : 0
  const isPositive = revenueChange >= 0

  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            Rendimiento General
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <span className="font-bold">{metrics.clientSatisfaction.toFixed(1)}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
          </div>

          {/* Plan Performance */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Por Plan</span>
            {metrics.planStats.length > 0 ? (
              metrics.planStats.map((stat) => (
                <div key={stat.plan} className="flex items-center gap-2 text-sm">
                  <span className="w-20 truncate text-muted-foreground">{getPlanLabel(stat.plan)}</span>
                  <Progress value={stat.winRate} className="flex-1 h-2" />
                  <span className="w-10 text-right font-mono text-xs">{stat.winRate}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No hay datos de planes disponibles</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
        <AreaChartInteractive data={revenueData} />
        <BarChartComponent data={projectData} />
        <LineChartComponent data={quoteTrendData} />
        <PieChartComponent data={revenueDistributionData} />
        <RadarChartComponent data={performanceData} />
        <RadialChartComponent data={progressData} />
      </div>
    </div>
  )
}
