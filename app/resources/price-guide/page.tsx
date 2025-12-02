"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, Search, Download, Calculator, TrendingUp, DollarSign, Package, Zap } from "lucide-react"

interface PriceUpdate {
  item: string;
  date: string;
  change: string;
}

interface PriceItem {
  name: string;
  category: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
}

interface ServiceRate {
  service: string;
  description: string;
  rate: string;
}

export default function PriceGuidePage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const priceCategories = [
    { icon: Zap, label: "Materiales Eléctricos", count: 45, color: "text-primary" },
    { icon: Package, label: "Equipos y Herramientas", count: 23, color: "text-info" },
    { icon: Calculator, label: "Mano de Obra", count: 12, color: "text-success" },
    { icon: TrendingUp, label: "Índices de Precios", count: 8, color: "text-warning" }
  ]

  // Mock data - replace with Convex query when implemented
  const recentUpdates: PriceUpdate[] = [
    {
      item: "Cable THW 10mm²",
      date: "02 Dic 2024",
      change: "+3.2%"
    },
    {
      item: "Interruptor Diferencial 40A",
      date: "01 Dic 2024",
      change: "+1.8%"
    },
    {
      item: "Mano de obra instalación",
      date: "28 Nov 2024",
      change: "-0.5%"
    }
  ]

  const popularItems: PriceItem[] = [
    {
      name: "Cable THW 10mm²",
      category: "Cableado",
      price: "$45.000",
      trend: 'up'
    },
    {
      name: "Interruptor Diferencial 40A",
      category: "Protección",
      price: "$85.000",
      trend: 'stable'
    }
  ]

  const serviceRates: ServiceRate[] = [
    {
      service: "Instalación Eléctrica Residencial",
      description: "Por punto de luz o toma corriente",
      rate: "$15.000"
    },
    {
      service: "Mantenimiento Preventivo",
      description: "Revisión mensual de sistemas eléctricos",
      rate: "$25.000"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Guía de Precios</h1>
              <p className="text-muted-foreground">Precios actualizados y referencias para materiales y servicios</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button className="gap-2">
                <Calculator className="w-4 h-4" />
                Actualizar Precios
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar materiales, equipos o servicios..."
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue>
                  {categoryFilter === "all" ? "Todas las categorías" :
                   categoryFilter === "materials" ? "Materiales" :
                   categoryFilter === "labor" ? "Mano de obra" :
                   categoryFilter === "equipment" ? "Equipos" : categoryFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="materials">Materiales</SelectItem>
                <SelectItem value="labor">Mano de obra</SelectItem>
                <SelectItem value="equipment">Equipos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {priceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category.label}</div>
                      <div className="text-xs text-muted-foreground">{category.count} items</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Recent Updates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actualizaciones Recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">{update.item}</div>
                      <div className="text-xs text-muted-foreground">{update.date}</div>
                    </div>
                    <Badge variant={update.change.startsWith('+') ? 'destructive' : 'default'} className="text-xs">
                      {update.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Price List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Items */}
            <Card>
              <CardHeader>
                <CardTitle>Materiales Más Buscados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularItems.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                        <div className={`flex items-center gap-1 text-xs ${
                          item.trend === 'up' ? 'text-success' :
                          item.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          <TrendingUp className="w-3 h-3" />
                          {item.trend === 'up' ? '+2.1%' :
                           item.trend === 'down' ? '-1.5%' : 'Estable'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Index */}
            <Card>
              <CardHeader>
                <CardTitle>Índice de Precios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">0%</div>
                    <div className="text-xs text-muted-foreground">Materiales</div>
                    <div className="text-xs text-success mt-1">vs mes anterior</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-info">0%</div>
                    <div className="text-xs text-muted-foreground">Mano de Obra</div>
                    <div className="text-xs text-success mt-1">vs mes anterior</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning">0%</div>
                    <div className="text-xs text-muted-foreground">Equipos</div>
                    <div className="text-xs text-success mt-1">vs mes anterior</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-success">0%</div>
                    <div className="text-xs text-muted-foreground">Índice General</div>
                    <div className="text-xs text-success mt-1">vs mes anterior</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Labor Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Tarifas de Mano de Obra</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRates.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{service.service}</div>
                        <div className="text-sm text-muted-foreground">{service.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{service.rate}</div>
                        <div className="text-xs text-muted-foreground">más IVA</div>
                      </div>
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
