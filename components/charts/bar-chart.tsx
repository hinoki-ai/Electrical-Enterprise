"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Building2 } from "lucide-react"
import { formatCLP } from "@/lib/utils"
import { validateProjectData, formatChartAxis, getEmptyStateMessage } from "@/lib/chart-utils"

interface ProjectData {
  type: string
  value: number
  count: number
  label: string
}

interface BarChartProps {
  data: ProjectData[]
  title?: string
  description?: string
}

const chartConfig = {
  value: {
    label: "Valor",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function BarChartComponent({
  data,
  title = "Proyectos por Tipo",
  description = "Distribución de valor y cantidad por tipo de proyecto"
}: BarChartProps) {
  // Validate data
  if (!validateProjectData(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            {getEmptyStateMessage('bar')}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[350px] sm:h-[400px] w-full">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={1}/>
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
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
              formatter={(value, name, props) => {
                const item = props?.payload as ProjectData
                if (item) {
                  return [
                    `${formatCLP(value as number)}\n${item.count} proyectos`,
                    'Valor Total'
                  ]
                }
                return [formatCLP(value as number), 'Valor Total']
              }}
            />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
