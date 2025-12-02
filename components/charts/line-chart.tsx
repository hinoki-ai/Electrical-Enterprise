"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

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

export function LineChartComponent({
  data,
  title = "Tendencia de Cotizaciones",
  description = "Evolución mensual de cotizaciones enviadas y aprobadas"
}: LineChartProps) {
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
        <ResponsiveContainer width="100%" height={450}>
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
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as QuoteTrendData
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Mes
                          </span>
                          <span className="font-bold text-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Enviadas
                          </span>
                          <span className="font-bold text-chart-1">
                            {data.quotes}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Aprobadas
                          </span>
                          <span className="font-bold text-success">
                            {data.approved}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Conversión
                          </span>
                          <span className="font-bold text-foreground">
                            {data.quotes > 0 ? ((data.approved / data.quotes) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
