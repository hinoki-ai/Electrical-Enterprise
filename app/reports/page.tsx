"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { BusinessIntelligence } from "@/components/dashboard/business-intelligence"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, DollarSign, FileText, Users, BarChart3, PieChart } from "lucide-react"

interface RecentReport {
  name: string;
  type: string;
  date: string;
  change: number;
}

export default function ReportsPage() {
  const [timePeriod, setTimePeriod] = useState("month")

  // Mock data - replace with Convex query when implemented
  const recentReports: RecentReport[] = [
    {
      name: "Informe Financiero Noviembre 2024",
      type: "Financiero",
      date: "02 Dic 2024",
      change: 12.5
    },
    {
      name: "Análisis de Cotizaciones",
      type: "Cotizaciones",
      date: "28 Nov 2024",
      change: 8.3
    },
    {
      name: "Estadísticas de Clientes",
      type: "Clientes",
      date: "25 Nov 2024",
      change: -2.1
    }
  ]
  const reportTypes = [
    {
      icon: DollarSign,
      title: "Informe Financiero",
      description: "Ingresos, gastos y rentabilidad",
      color: "text-success"
    },
    {
      icon: FileText,
      title: "Cotizaciones",
      description: "Análisis de presupuestos enviados",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Clientes",
      description: "Estadísticas de cartera de clientes",
      color: "text-info"
    },
    {
      icon: TrendingUp,
      title: "Tendencias",
      description: "Análisis de mercado y oportunidades",
      color: "text-warning"
    },
    {
      icon: BarChart3,
      title: "Proyectos",
      description: "Estado y progreso de obras",
      color: "text-accent"
    },
    {
      icon: PieChart,
      title: "Materiales",
      description: "Uso y consumo de insumos",
      color: "text-muted-foreground"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Reportes e Analytics</h1>
              <p className="text-muted-foreground">Informes detallados y análisis de tu negocio</p>
            </div>
            <div className="flex gap-2">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue>
                    {timePeriod === "week" ? "Esta Semana" :
                     timePeriod === "month" ? "Este Mes" :
                     timePeriod === "quarter" ? "Este Trimestre" :
                     timePeriod === "year" ? "Este Año" : timePeriod}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                  <SelectItem value="quarter">Este Trimestre</SelectItem>
                  <SelectItem value="year">Este Año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Types */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Reporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportTypes.map((report, index) => (
                  <button
                    key={index}
                    className="w-full p-3 border rounded-lg hover:bg-muted transition-colors text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10`}>
                        <report.icon className={`w-4 h-4 ${report.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{report.title}</div>
                        <div className="text-xs text-muted-foreground">{report.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen Ejecutivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-xl font-bold text-success">$0</div>
                    <div className="text-xs text-muted-foreground">Ingresos</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Cotizaciones</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-xl font-bold text-warning">0%</div>
                    <div className="text-xs text-muted-foreground">Éxito</div>
                  </div>
                  <div className="text-center p-3 bg-info/10 rounded-lg">
                    <div className="text-xl font-bold text-info">0</div>
                    <div className="text-xs text-muted-foreground">Clientes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Reports Area */}
          <div className="lg:col-span-2 space-y-6">
            <BusinessIntelligence />

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Reportes Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{report.name}</div>
                          <div className="text-xs text-muted-foreground">{report.type} • {report.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
