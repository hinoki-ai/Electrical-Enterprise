"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Book, Search, FileText, Scale, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react"

export default function RegulationsPage() {
  const regulationCategories = [
    { icon: Scale, label: "Normas Chilenas", count: 45, color: "text-primary" },
    { icon: FileText, label: "Reglamentos Técnicos", count: 28, color: "text-info" },
    { icon: AlertTriangle, label: "Seguridad Eléctrica", count: 19, color: "text-warning" },
    { icon: CheckCircle, label: "Certificaciones", count: 12, color: "text-success" }
  ]

  const keyRegulations = [
    {
      title: "DS 110/2019 - Norma de Seguridad Eléctrica",
      category: "Seguridad",
      status: "vigente",
      lastUpdate: "2019-06-15",
      description: "Establece las normas mínimas de seguridad para instalaciones eléctricas"
    },
    {
      title: "NCh 3000 - Instalaciones Eléctricas",
      category: "Técnico",
      status: "vigente",
      lastUpdate: "2021-03-10",
      description: "Norma chilena para diseño y construcción de instalaciones eléctricas"
    },
    {
      title: "NCh 4000 - Protección contra Descargas Atmosféricas",
      category: "Protección",
      status: "vigente",
      lastUpdate: "2018-11-22",
      description: "Requisitos para sistemas de protección contra rayos"
    },
    {
      title: "Decreto 66/2018 - Electricidad",
      category: "Legal",
      status: "vigente",
      lastUpdate: "2018-04-12",
      description: "Regula la actividad eléctrica en Chile"
    }
  ]

  const upcomingChanges = [
    { regulation: "NCh 3000", change: "Actualización para energías renovables", date: "2025-01-15" },
    { regulation: "DS 110", change: "Incorporación de nuevas tecnologías", date: "2025-03-01" },
    { regulation: "Certificación Electricistas", change: "Nuevos requisitos de capacitación", date: "2024-12-20" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Normativas y Reglamentos</h1>
              <p className="text-muted-foreground">Información actualizada sobre leyes y normas del sector eléctrico</p>
            </div>
            <Button className="gap-2">
              <Book className="w-4 h-4" />
              Ver Todas las Normas
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar normas, decretos o reglamentos..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {regulationCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category.label}</div>
                      <div className="text-xs text-muted-foreground">{category.count} documentos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Compliance Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Estado de Cumplimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Certificación Actual</span>
                  <Badge className="bg-success">Vigente</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Próxima Renovación</span>
                  <span className="text-xs text-muted-foreground">Mar 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auditorías</span>
                  <Badge variant="outline">0 pendientes</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Key Regulations */}
            <Card>
              <CardHeader>
                <CardTitle>Normas Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyRegulations.map((regulation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{regulation.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{regulation.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{regulation.category}</Badge>
                            <Badge variant={regulation.status === 'vigente' ? 'default' : 'secondary'} className="text-xs">
                              {regulation.status}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Última actualización: {regulation.lastUpdate}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Cambios Próximos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingChanges.map((change, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{change.regulation}</div>
                        <div className="text-xs text-muted-foreground">{change.change}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-warning">{change.date}</div>
                        <div className="text-xs text-muted-foreground">Fecha efectiva</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Verificación de Cumplimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { requirement: "Certificación de Electricista Vigente", status: "completed" },
                    { requirement: "Registro en SEC (Superintendencia de Electricidad)", status: "completed" },
                    { requirement: "Seguro de Responsabilidad Civil", status: "completed" },
                    { requirement: "Capacitación en Normas de Seguridad", status: "pending" },
                    { requirement: "Registro de Instalaciones Mayores", status: "completed" },
                    { requirement: "Auditoría Anual de Cumplimiento", status: "pending" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-success' : 'bg-muted'
                      }`}>
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : (
                          <Clock className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <span className={`text-sm ${item.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                        {item.requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">Descargar Normas</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Verificar Cumplimiento</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <Book className="w-4 h-4" />
                    <span className="text-xs">Biblioteca Legal</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs">Reportar Incumplimiento</span>
                  </Button>
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
