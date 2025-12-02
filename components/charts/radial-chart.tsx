"use client"

import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

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

export function RadialChartComponent({
  data,
  title = "Progreso General",
  description = "Estado de avance de proyectos y objetivos"
}: RadialChartProps) {
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
        <ResponsiveContainer width="100%" height={450}>
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
              minAngle={15}
              label={{ position: 'insideStart', fill: 'hsl(var(--background))', fontSize: 12, fontWeight: 600 }}
              background={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
              clockWise
              dataKey="value"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as ProgressData
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Categoría
                          </span>
                          <span className="font-bold text-foreground whitespace-pre-line">
                            {data.name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground mb-1">
                            Progreso
                          </span>
                          <span className="font-bold" style={{ color: data.fill }}>
                            {data.value}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
