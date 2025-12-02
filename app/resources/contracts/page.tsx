"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileSignature, Search, Plus, Download, Eye, Edit, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function ContractsPage() {
  const contractTypes = [
    { icon: FileText, label: "Contratos de Servicio", count: 0, color: "text-primary" },
    { icon: FileSignature, label: "Contratos de Mantenimiento", count: 0, color: "text-info" },
    { icon: CheckCircle, label: "Garantías", count: 0, color: "text-success" },
    { icon: AlertTriangle, label: "Términos y Condiciones", count: 0, color: "text-warning" }
  ]

  const contracts: never[] = []

  const upcomingRenewals: never[] = []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Contratos y Documentos</h1>
              <p className="text-muted-foreground">Gestiona contratos, garantías y documentos legales</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Contrato
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, número de contrato o tipo..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {contractTypes.map((category, index) => (
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

            {/* Contract Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">0</div>
                  <div className="text-xs text-muted-foreground">Contratos Activos</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">$0</div>
                  <div className="text-xs text-muted-foreground">Valor Total</div>
                </div>
                <div className="text-center p-3 bg-info/10 rounded-lg">
                  <div className="text-2xl font-bold text-info">0%</div>
                  <div className="text-xs text-muted-foreground">Tasa Renovación</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contracts List */}
            <Card>
              <CardHeader>
                <CardTitle>Contratos Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{contract.title}</span>
                            <Badge variant="outline" className="text-xs">{contract.type}</Badge>
                            <Badge variant={
                              contract.status === 'active' ? 'default' :
                              contract.status === 'pending' ? 'secondary' : 'destructive'
                            } className="text-xs">
                              {contract.status === 'active' ? 'Activo' :
                               contract.status === 'pending' ? 'Pendiente' : 'Expirado'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{contract.client}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>ID: {contract.id}</span>
                            <span>Inicio: {contract.startDate}</span>
                            <span>Fin: {contract.endDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-lg mb-1">{contract.value}</div>
                          <div className="text-xs text-muted-foreground mb-2">Renovación: {contract.renewal}</div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Renewals */}
            <Card className="border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-warning" />
                  Renovaciones Próximas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingRenewals.map((renewal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{renewal.contract}</div>
                        <div className="text-xs text-muted-foreground">{renewal.client}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{renewal.type}</Badge>
                        <div className="text-right">
                          <div className="text-sm font-medium text-warning">{renewal.days} días</div>
                          <div className="text-xs text-muted-foreground">para renovar</div>
                        </div>
                        <Button size="sm">
                          Renovar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Library */}
            <Card>
              <CardHeader>
                <CardTitle>Biblioteca de Plantillas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[].map((template, index) => (
                    <div key={index} className="p-3 border rounded-lg text-center">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium mb-1">{template.name}</div>
                      <div className="text-xs text-muted-foreground">Usado {template.usage} veces</div>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        Usar
                      </Button>
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
                    <Plus className="w-4 h-4" />
                    <span className="text-xs">Nuevo Contrato</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">Plantillas</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Renovaciones</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-xs">Archivos</span>
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
