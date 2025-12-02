"use client"

import { Cell, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { PieChart as PieChartIcon } from "lucide-react"
import { formatCLP } from "@/lib/utils"
import { validateRevenueDistributionData, getEmptyStateMessage } from "@/lib/chart-utils"

interface PieData {
  name: string
  value: number
  fill: string
}

interface PieChartProps {
  data: PieData[]
  title?: string
  description?: string
}

const chartConfig = {
  revenue: {
    label: "Ingresos",
  },
} satisfies ChartConfig

export function PieChartComponent({
  data,
  title = "Distribución de Ingresos",
  description = "Porcentaje de ingresos por categoría"
}: PieChartProps) {
  // Validate data
  if (!validateRevenueDistributionData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('pie')}
          </div>
        </CardContent>
      </Card>
    )
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={140}
              innerRadius={60}
              fill="var(--chart-1)"
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <ChartTooltipContent
              formatter={(value, name) => {
                const percentage = ((value as number / total) * 100).toFixed(1)
                return [formatCLP(value as number), `${name} (${percentage}%)`]
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
