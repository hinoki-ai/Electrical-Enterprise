"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Book, Search, FileText, Scale, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react"

interface Regulation {
  title: string;
  description: string;
  category: string;
  status: 'vigente' | 'en_revision';
  lastUpdate: string;
}

interface RegulationChange {
  regulation: string;
  change: string;
  date: string;
}

interface ComplianceItem {
  requirement: string;
  status: 'completed' | 'pending';
}

export default function RegulationsPage() {
  const regulationCategories = [
    { icon: Scale, label: "Normas Chilenas", count: 12, color: "text-primary" },
    { icon: FileText, label: "Reglamentos Técnicos", count: 8, color: "text-info" },
    { icon: AlertTriangle, label: "Seguridad Eléctrica", count: 15, color: "text-warning" },
    { icon: CheckCircle, label: "Certificaciones", count: 6, color: "text-success" }
  ]

  // Mock data - replace with Convex query when implemented
  const keyRegulations: Regulation[] = [
    {
      title: "Decreto Supremo N° 15/2018",
      description: "Aprueba reglamento de seguridad para instalaciones eléctricas",
      category: "Seguridad",
      status: 'vigente',
      lastUpdate: "15 Nov 2024"
    },
    {
      title: "NCh 3000/2018",
      description: "Instalaciones eléctricas - Requisitos generales",
      category: "Técnico",
      status: 'vigente',
      lastUpdate: "20 Oct 2024"
    }
  ]

  const upcomingChanges: RegulationChange[] = [
    {
      regulation: "NCh 3000/2018",
      change: "Actualización de requisitos para instalaciones solares",
      date: "01 Ene 2025"
    },
    {
      regulation: "Decreto Supremo N° 15/2018",
      change: "Nuevos estándares de protección contra incendios",
      date: "15 Feb 2025"
    }
  ]

  const complianceItems: ComplianceItem[] = [
    {
      requirement: "Certificación de instalaciones eléctricas",
      status: 'completed'
    },
    {
      requirement: "Registro de contratistas eléctricos",
      status: 'completed'
    },
    {
      requirement: "Capacitación en normas de seguridad",
      status: 'pending'
    }
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
                  {complianceItems.map((item, index) => (
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
