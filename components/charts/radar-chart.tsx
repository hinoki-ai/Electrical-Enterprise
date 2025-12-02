"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Target } from "lucide-react"
import { validatePerformanceData, getEmptyStateMessage } from "@/lib/chart-utils"

interface PerformanceData {
  metric: string
  current: number
  target: number
  max: number
}

interface RadarChartProps {
  data: PerformanceData[]
  title?: string
  description?: string
}

const chartConfig = {
  current: {
    label: "Actual",
    color: "var(--chart-1)",
  },
  target: {
    label: "Objetivo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function RadarChartComponent({
  data,
  title = "Métricas de Rendimiento",
  description = "Comparación entre valores actuales y objetivos"
}: RadarChartProps) {
  // Validate data
  if (!validatePerformanceData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('radar')}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={0}
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <ChartTooltipContent
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Radar
              name="Actual"
              dataKey="current"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Radar
              name="Objetivo"
              dataKey="target"
              stroke="var(--chart-3)"
              fill="var(--chart-3)"
              fillOpacity={0.2}
              strokeWidth={3}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
