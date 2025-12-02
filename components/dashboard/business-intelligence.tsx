"use client"

import { TrendingUp, TrendingDown, Target, Users, Award } from "lucide-react"
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

// Sample data for charts
const revenueData = [
  { month: "Ene", revenue: 24000000, quotes: 12 },
  { month: "Feb", revenue: 22000000, quotes: 15 },
  { month: "Mar", revenue: 28000000, quotes: 18 },
  { month: "Abr", revenue: 26000000, quotes: 14 },
  { month: "May", revenue: 30000000, quotes: 20 },
  { month: "Jun", revenue: 28500000, quotes: 16 },
]

const projectData = [
  { type: "residential", value: 15000000, count: 8, label: "Residencial" },
  { type: "commercial", value: 8000000, count: 3, label: "Comercial" },
  { type: "industrial", value: 4500000, count: 2, label: "Industrial" },
  { type: "emergency", value: 1000000, count: 5, label: "Emergencia" },
]

const quoteTrendData = [
  { month: "Ene", quotes: 12, approved: 8, sent: 10 },
  { month: "Feb", quotes: 15, approved: 11, sent: 13 },
  { month: "Mar", quotes: 18, approved: 13, sent: 16 },
  { month: "Abr", quotes: 14, approved: 10, sent: 12 },
  { month: "May", quotes: 20, approved: 15, sent: 18 },
  { month: "Jun", quotes: 16, approved: 12, sent: 14 },
]

const revenueDistributionData = [
  { name: "Residencial", value: 15000000, fill: "var(--chart-1)" },
  { name: "Comercial", value: 8000000, fill: "var(--chart-2)" },
  { name: "Industrial", value: 4500000, fill: "var(--chart-3)" },
  { name: "Emergencia", value: 1000000, fill: "var(--chart-4)" },
]

const performanceData = [
  { metric: "Margen", current: 32, target: 35, max: 40 },
  { metric: "Conversión", current: 68, target: 70, max: 80 },
  { metric: "Satisfacción", current: 94, target: 95, max: 100 },
  { metric: "Eficiencia", current: 78, target: 85, max: 100 },
  { metric: "Crecimiento", current: 15, target: 20, max: 30 },
]

const progressData = [
  { name: "Proyectos\nActivos", value: 75, fill: "var(--chart-1)" },
  { name: "Objetivos\nMensuales", value: 85, fill: "var(--chart-2)" },
  { name: "Satisfacción\nCliente", value: 94, fill: "var(--chart-3)" },
]

export function BusinessIntelligence() {
  const metrics = useQuery(api.quotes.getMetrics) ?? {
    monthlyRevenue: 0,
    previousMonthRevenue: 0,
    profitMargin: 0,
    avgProjectValue: 0,
    quoteConversion: 0,
    clientSatisfaction: 0,
    planStats: [],
  }

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
