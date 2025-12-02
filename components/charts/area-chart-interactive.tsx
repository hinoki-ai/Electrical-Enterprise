"use client"

import { Area, AreaChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { formatCLP } from "@/lib/utils"
import { validateRevenueData, formatChartAxis, getEmptyStateMessage } from "@/lib/chart-utils"

interface RevenueData {
  month: string
  revenue: number
  quotes: number
}

interface AreaChartInteractiveProps {
  data: RevenueData[]
  title?: string
  description?: string
}

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "var(--chart-1)",
  },
  quotes: {
    label: "Cotizaciones",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AreaChartInteractive({
  data,
  title = "Ingresos Mensuales",
  description = "Tendencia de ingresos de los últimos 6 meses"
}: AreaChartInteractiveProps) {
  // Validate data
  if (!validateRevenueData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('area')}
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const averageRevenue = totalRevenue / data.length
  const lastMonth = data[data.length - 1]?.revenue || 0
  const previousMonth = data[data.length - 2]?.revenue || 0
  const growth = previousMonth > 0 ? ((lastMonth - previousMonth) / previousMonth) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
          {growth !== 0 && (
            <span className={`ml-2 text-sm font-semibold ${growth >= 0 ? 'text-success' : 'text-destructive'}`}>
              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}% vs mes anterior
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="var(--chart-1)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
              tickFormatter={(value) => formatChartAxis(value, 1000000)}
            />
            <ChartTooltipContent
              formatter={(value, name) => {
                if (name === 'revenue') {
                  return [formatCLP(value as number), 'Ingresos']
                }
                return [value.toLocaleString(), 'Cotizaciones']
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--chart-1)"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
