"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { CalculatorWidget } from "@/components/dashboard/calculator-widget"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { useDivineParsing } from "@/components/language/ChunkedLanguageProvider"

export default function CalculatorPage() {
  const { t } = useDivineParsing(["calculator"])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("calculadora_elctrica")}</h1>
          <p className="text-muted-foreground">{t("herramientas_profesionales_para_clculos_elctricos_")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CalculatorWidget />
          </div>

          <div className="space-y-6">
            {/* Additional calculator tools could go here */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">{t("herramientas_adicionales")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">{t("convertidor_de_unidades")}</div>
                  <div className="text-xs text-muted-foreground">{t("voltaje_corriente_potencia")}</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">{t("clculo_de_circuitos")}</div>
                  <div className="text-xs text-muted-foreground">{t("resistencia_impedancia")}</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">{t("factor_de_potencia")}</div>
                  <div className="text-xs text-muted-foreground">{t("correccin_y_optimizacin")}</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-sm font-medium">{t("diseo_de_paneles")}</div>
                  <div className="text-xs text-muted-foreground">{t("capacidad_y_distribucin")}</div>
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
