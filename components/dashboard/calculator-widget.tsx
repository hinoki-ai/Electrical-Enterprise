"use client"

import { useState, useEffect } from "react"
import { Calculator, FileDown, Save, TrendingDown, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { formatCLP, getPlanLabel } from "@/lib/utils"
import { toast } from "sonner"
import type { Plan } from "@/lib/data-context"

type Size = "small" | "medium" | "large" | "industrial"
type Urgency = "normal" | "priority" | "urgent"

const DEFAULT_CALCULATOR_STATE = {
  value: "",
  plan: "standard" as Plan,
  size: "medium" as Size,
  urgency: "normal" as Urgency,
}

const planMultipliers: Record<Plan, number> = {
  basic: 0.8,
  standard: 1,
  premium: 1.35,
  enterprise: 1.8,
}

const sizeMultipliers: Record<Size, number> = {
  small: 0.7,
  medium: 1,
  large: 1.4,
  industrial: 2,
}

const urgencyMultipliers: Record<Urgency, number> = {
  normal: 1,
  priority: 1.2,
  urgent: 1.5,
}

export function CalculatorWidget() {
  // Load saved state from localStorage or use defaults
  const getSavedState = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calculator-widget-state')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return DEFAULT_CALCULATOR_STATE
        }
      }
    }
    return DEFAULT_CALCULATOR_STATE
  }

  const [value, setValue] = useState(() => getSavedState().value)
  const [plan, setPlan] = useState<Plan>(() => getSavedState().plan)
  const [size, setSize] = useState<Size>(() => getSavedState().size)
  const [urgency, setUrgency] = useState<Urgency>(() => getSavedState().urgency)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isRestoringDefaults, setIsRestoringDefaults] = useState(false)

  // Track unsaved changes
  useEffect(() => {
    const currentState = { value, plan, size, urgency }
    const savedState = getSavedState()

    const hasChanges = JSON.stringify(currentState) !== JSON.stringify(savedState)
    setHasUnsavedChanges(hasChanges)
  }, [value, plan, size, urgency])

  // Warn about unsaved changes when leaving the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = '¿Estás seguro? Tienes cambios sin guardar que se perderán.'
        return e.returnValue
      }
    }

    if (hasUnsavedChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

  const baseValue = Number.parseInt(value.replace(/\D/g, "")) || 0
  const calculated = Math.round(baseValue * planMultipliers[plan] * sizeMultipliers[size] * urgencyMultipliers[urgency])
  const monthly = Math.round(calculated / 12)
  const annualDiscount = Math.round(calculated * 0.85)
  const savings = calculated - annualDiscount

  // Save current state to localStorage
  const handleSave = () => {
    const stateToSave = { value, plan, size, urgency }
    localStorage.setItem('calculator-widget-state', JSON.stringify(stateToSave))
    setHasUnsavedChanges(false)
    toast.success('Configuración guardada exitosamente')
  }

  // Restore default values
  const handleRestoreDefaults = () => {
    setValue(DEFAULT_CALCULATOR_STATE.value)
    setPlan(DEFAULT_CALCULATOR_STATE.plan)
    setSize(DEFAULT_CALCULATOR_STATE.size)
    setUrgency(DEFAULT_CALCULATOR_STATE.urgency)
    localStorage.removeItem('calculator-widget-state')
    setHasUnsavedChanges(false)
    setIsRestoringDefaults(false)
    toast.success('Valores por defecto restaurados')
  }

  // Export calculation results
  const handleExport = () => {
    if (calculated === 0) {
      toast.error('No hay datos para exportar')
      return
    }

    const exportData = {
      fecha: new Date().toLocaleDateString('es-CL'),
      valorBase: formatCLP(baseValue),
      plan: getPlanLabel(plan),
      tamaño: size === 'small' ? 'Pequeño' : size === 'medium' ? 'Medio' : size === 'large' ? 'Grande' : 'Industrial',
      urgencia: urgency === 'normal' ? 'Normal' : urgency === 'priority' ? 'Prioritario' : 'Urgente',
      precioBase: formatCLP(calculated),
      precioMensual: formatCLP(monthly),
      precioAnualDescuento: formatCLP(annualDiscount),
      ahorroAnual: formatCLP(savings),
    }

    const csvContent = Object.entries(exportData)
      .map(([key, value]) => `${key},${value}`)
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `calculadora-electrica-${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    toast.success('Datos exportados exitosamente')
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-accent" />
          </div>
          Calculadora
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="calc-value">Valor Base</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="calc-value"
              placeholder="0"
              value={baseValue ? baseValue.toLocaleString("es-CL") : ""}
              onChange={(e) => setValue(e.target.value)}
              className="pl-7 font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Plan</Label>
          <ToggleGroup
            type="single"
            value={plan}
            onValueChange={(v) => v && setPlan(v as Plan)}
            className="justify-start flex-wrap"
          >
            {(["basic", "standard", "premium", "enterprise"] as Plan[]).map((p) => (
              <ToggleGroupItem key={p} value={p} size="sm" className="text-xs">
                {getPlanLabel(p)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Tamaño</Label>
          <ToggleGroup
            type="single"
            value={size}
            onValueChange={(v) => v && setSize(v as Size)}
            className="justify-start"
          >
            <ToggleGroupItem value="small" size="sm" className="text-xs">
              Pequeño
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" size="sm" className="text-xs">
              Medio
            </ToggleGroupItem>
            <ToggleGroupItem value="large" size="sm" className="text-xs">
              Grande
            </ToggleGroupItem>
            <ToggleGroupItem value="industrial" size="sm" className="text-xs">
              Ind.
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Urgencia</Label>
          <ToggleGroup
            type="single"
            value={urgency}
            onValueChange={(v) => v && setUrgency(v as Urgency)}
            className="justify-start"
          >
            <ToggleGroupItem value="normal" size="sm" className="text-xs">
              Normal
            </ToggleGroupItem>
            <ToggleGroupItem value="priority" size="sm" className="text-xs">
              Prioritario
            </ToggleGroupItem>
            <ToggleGroupItem value="urgent" size="sm" className="text-xs">
              Urgente
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {calculated > 0 && (
          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Precio Base:</span>
              <span className="font-bold text-lg">{formatCLP(calculated)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mensual (x12):</span>
              <span className="font-mono">{formatCLP(monthly)}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-success/10 border border-success/20">
              <span className="text-sm text-success flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Anual (-15%):
              </span>
              <div className="text-right">
                <span className="font-bold text-success">{formatCLP(annualDiscount)}</span>
                <span className="text-xs text-success/70 block">Ahorra {formatCLP(savings)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 bg-transparent"
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
              >
                <Save className="w-3.5 h-3.5" />
                {hasUnsavedChanges ? 'Guardar' : 'Guardado'}
              </Button>
              <Button size="sm" className="gap-1.5" onClick={handleExport}>
                <FileDown className="w-3.5 h-3.5" />
                Exportar
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <AlertDialog open={isRestoringDefaults} onOpenChange={setIsRestoringDefaults}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-muted-foreground hover:text-foreground">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restaurar Predeterminados
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Restaurar valores por defecto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción restablecerá todos los valores de la calculadora a sus configuraciones originales.
                      Los cambios no guardados se perderán.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRestoreDefaults}>
                      Restaurar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
