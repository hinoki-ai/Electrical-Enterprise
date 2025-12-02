"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

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

export function RadarChartComponent({
  data,
  title = "Métricas de Rendimiento",
  description = "Comparación entre valores actuales y objetivos"
}: RadarChartProps) {
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
        <ResponsiveContainer width="100%" height={450}>
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
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as PerformanceData
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Métrica
                          </span>
                          <span className="font-bold text-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Actual
                          </span>
                          <span className="font-bold text-chart-1">
                            {data.current}%
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Objetivo
                          </span>
                          <span className="font-bold text-success">
                            {data.target}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
