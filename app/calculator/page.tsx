"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { CalculatorWidget } from "@/components/dashboard/calculator-widget"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Calculadora Eléctrica</h1>
          <p className="text-muted-foreground">Herramientas profesionales para cálculos eléctricos precisos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CalculatorWidget />
          </div>

          <div className="space-y-6">
            {/* Additional calculator tools could go here */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Herramientas Adicionales</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">Convertidor de Unidades</div>
                  <div className="text-xs text-muted-foreground">Voltaje, corriente, potencia</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">Cálculo de Circuitos</div>
                  <div className="text-xs text-muted-foreground">Resistencia, impedancia</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">Factor de Potencia</div>
                  <div className="text-xs text-muted-foreground">Corrección y optimización</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">Diseño de Paneles</div>
                  <div className="text-xs text-muted-foreground">Capacidad y distribución</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
