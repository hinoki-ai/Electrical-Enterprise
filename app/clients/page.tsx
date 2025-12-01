"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { ClientManager } from "@/components/dashboard/client-manager"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Clientes</h1>
              <p className="text-muted-foreground">Gestiona tu cartera de clientes y contactos</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Cliente
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, empresa o contacto..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Client List */}
          <div className="lg:col-span-2">
            <ClientManager />
          </div>

          {/* Client Statistics Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Total Clientes</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">18</div>
                    <div className="text-xs text-muted-foreground">Activos</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">4</div>
                    <div className="text-xs text-muted-foreground">Pendientes</div>
                  </div>
                  <div className="text-center p-3 bg-info/10 rounded-lg">
                    <div className="text-2xl font-bold text-info">2</div>
                    <div className="text-xs text-muted-foreground">Nuevos</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Valor Total de Proyectos</div>
                  <div className="text-xl font-bold">$2,450,000</div>
                  <div className="text-xs text-muted-foreground">+12% vs mes anterior</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Cliente
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Importar Contactos
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Search className="w-4 h-4" />
                  Búsqueda Avanzada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
