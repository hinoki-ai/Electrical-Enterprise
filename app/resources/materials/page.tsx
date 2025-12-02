"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Plus, ShoppingCart, Truck, AlertTriangle, CheckCircle, Tag } from "lucide-react"

interface Material {
  name: string;
  category: string;
  supplier: string;
  price: string;
  lastPurchase: string;
  stock: number;
  minStock: number;
}

interface StockAlert {
  material: string;
  current: number;
  minimum: number;
}

interface Supplier {
  name: string;
  products: number;
  rating: number;
  lastOrder: string;
}

export default function MaterialsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const materialCategories = [
    { icon: Package, label: "Cableado y Conductores", count: 15, color: "text-primary" },
    { icon: CheckCircle, label: "Protección y Seguridad", count: 8, color: "text-warning" },
    { icon: Truck, label: "Equipos y Paneles", count: 12, color: "text-info" },
    { icon: Tag, label: "Accesorios", count: 6, color: "text-success" }
  ]

  // Mock data - replace with Convex query when implemented
  const featuredMaterials: Material[] = [
    {
      name: "Cable THW 10mm²",
      category: "Cableado",
      supplier: "Proveedor ABC",
      price: "$45.000",
      lastPurchase: "15 Nov 2024",
      stock: 25,
      minStock: 10
    },
    {
      name: "Interruptor Diferencial 40A",
      category: "Protección",
      supplier: "Eléctrica Pro Ltda.",
      price: "$85.000",
      lastPurchase: "20 Nov 2024",
      stock: 8,
      minStock: 15
    }
  ]

  const lowStockAlerts: StockAlert[] = [
    {
      material: "Interruptor Diferencial 40A",
      current: 8,
      minimum: 15
    },
    {
      material: "Cable UTP Cat6",
      current: 5,
      minimum: 20
    }
  ]

  const suppliers: Supplier[] = [
    {
      name: "Proveedor ABC",
      products: 25,
      rating: 4.8,
      lastOrder: "15 Nov 2024"
    },
    {
      name: "Eléctrica Pro Ltda.",
      products: 18,
      rating: 4.6,
      lastOrder: "20 Nov 2024"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Catálogo de Materiales</h1>
              <p className="text-muted-foreground">Gestiona tu inventario de materiales y proveedores</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Pedido Masivo
              </Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Material
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, código o proveedor..."
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue>
                  {categoryFilter === "all" ? "Todas las categorías" :
                   categoryFilter === "cables" ? "Cableado" :
                   categoryFilter === "protection" ? "Protección" :
                   categoryFilter === "solar" ? "Solar" :
                   categoryFilter === "accessories" ? "Accesorios" : categoryFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="cables">Cableado</SelectItem>
                <SelectItem value="protection">Protección</SelectItem>
                <SelectItem value="solar">Solar</SelectItem>
                <SelectItem value="accessories">Accesorios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {materialCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category.label}</div>
                      <div className="text-xs text-muted-foreground">{category.count} productos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Stock Alerts */}
            <Card className="border-destructive/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Alertas de Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockAlerts.map((alert, index) => (
                  <div key={index} className="p-2 bg-destructive/5 border border-destructive/20 rounded">
                    <div className="text-sm font-medium">{alert.material}</div>
                    <div className="text-xs text-muted-foreground">
                      {alert.current} / {alert.minimum} unidades
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Materiales Destacados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredMaterials.map((material, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{material.name}</h3>
                          <Badge variant="outline" className="text-xs mb-2">{material.category}</Badge>
                          <div className="text-xs text-muted-foreground">{material.supplier}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-sm">{material.price}</div>
                          <div className="text-xs text-muted-foreground">{material.lastPurchase}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Stock actual</div>
                          <div className={`text-sm font-medium ${
                            material.stock <= material.minStock ? 'text-destructive' : 'text-foreground'
                          }`}>
                            {material.stock} unidades
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Pedir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stock Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">0</div>
                    <div className="text-xs text-muted-foreground">Productos en Stock</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">0</div>
                    <div className="text-xs text-muted-foreground">Stock Bajo</div>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">0</div>
                    <div className="text-xs text-muted-foreground">Sin Stock</div>
                  </div>
                  <div className="text-center p-4 bg-info/10 rounded-lg">
                    <div className="text-2xl font-bold text-info">$0</div>
                    <div className="text-xs text-muted-foreground">Valor Inventario</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle>Proveedores Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{supplier.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {supplier.products} productos • ⭐ {supplier.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Último pedido</div>
                        <div className="text-sm">{supplier.lastOrder}</div>
                      </div>
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
                    <span className="text-xs">Agregar Material</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-xs">Nuevo Pedido</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <Package className="w-4 h-4" />
                    <span className="text-xs">Ver Inventario</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-3 flex-col gap-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs">Proveedores</span>
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
