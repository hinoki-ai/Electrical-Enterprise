"use client"

import { RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Activity } from "lucide-react"
import { validateProgressData, getEmptyStateMessage } from "@/lib/chart-utils"

interface ProgressData {
  name: string
  value: number
  fill: string
}

interface RadialChartProps {
  data: ProgressData[]
  title?: string
  description?: string
}

const chartConfig = {
  progress: {
    label: "Progreso",
  },
} satisfies ChartConfig

export function RadialChartComponent({
  data,
  title = "Progreso General",
  description = "Estado de avance de proyectos y objetivos"
}: RadialChartProps) {
  // Validate data
  if (!validateProgressData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('radial')}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="90%"
            barSize={30}
            data={data}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: 'hsl(var(--background))', fontSize: 12, fontWeight: 600 }}
              background={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
              dataKey="value"
            />
            <ChartTooltipContent
              formatter={(value, name) => [`${value}%`, name]}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
