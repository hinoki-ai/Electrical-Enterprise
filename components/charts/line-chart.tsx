"use client"

import { Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { FileText } from "lucide-react"
import { validateQuoteTrendData, getEmptyStateMessage } from "@/lib/chart-utils"

interface QuoteTrendData {
  month: string
  quotes: number
  approved: number
  sent: number
}

interface LineChartProps {
  data: QuoteTrendData[]
  title?: string
  description?: string
}

const chartConfig = {
  quotes: {
    label: "Cotizaciones",
    color: "var(--chart-1)",
  },
  approved: {
    label: "Aprobadas",
    color: "var(--chart-3)",
  },
  sent: {
    label: "Enviadas",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function LineChartComponent({
  data,
  title = "Tendencia de Cotizaciones",
  description = "Evolución mensual de cotizaciones enviadas y aprobadas"
}: LineChartProps) {
  // Validate data
  if (!validateQuoteTrendData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('line')}
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalQuotes = data.reduce((sum, item) => sum + item.quotes, 0)
  const totalApproved = data.reduce((sum, item) => sum + item.approved, 0)
  const conversionRate = totalQuotes > 0 ? (totalApproved / totalQuotes * 100).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
          <span className="ml-2 text-sm font-semibold text-success">
            Tasa de conversión: {conversionRate}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >
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
            />
            <ChartTooltipContent />
            <Line
              type="monotone"
              dataKey="quotes"
              stroke="var(--chart-1)"
              strokeWidth={3}
              dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, stroke: "var(--chart-1)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="var(--chart-3)"
              strokeWidth={3}
              dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, stroke: "var(--chart-3)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="var(--chart-4)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "var(--chart-4)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
