import { ChartConfig } from "@/components/ui/chart"

// Color utilities
export function getChartColors(): string[] {
  return [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)"
  ]
}

// Data validation functions
export function validateChartData<T extends Record<string, any>>(
  data: T[],
  requiredFields: (keyof T)[]
): boolean {
  if (!Array.isArray(data) || data.length === 0) {
    return false
  }

  return data.every(item =>
    requiredFields.every(field => {
      const value = item[field]
      return value !== null && value !== undefined
    })
  )
}

export function hasValidData<T>(data: T[] | undefined | null): data is T[] {
  return Array.isArray(data) && data.length > 0
}

// Formatting utilities
export function formatChartValue(value: number, type: 'currency' | 'percentage' | 'number' = 'number'): string {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    case 'percentage':
      return `${value.toFixed(1)}%`
    case 'number':
    default:
      return value.toLocaleString('es-CL')
  }
}

export function formatChartAxis(value: number, divisor?: number): string {
  if (divisor) {
    return `${(value / divisor).toFixed(1)}${divisor === 1000000 ? 'M' : divisor === 1000 ? 'K' : ''}`
  }
  return value.toLocaleString('es-CL')
}

// Chart configuration helpers
export function createChartConfig<T extends Record<string, any>>(
  data: T[],
  keyField: keyof T,
  labelField: keyof T,
  colorIndex = 0
): ChartConfig {
  const colors = getChartColors()
  const config: ChartConfig = {}

  data.forEach((item, index) => {
    const key = String(item[keyField])
    config[key] = {
      label: String(item[labelField]),
      color: colors[(colorIndex + index) % colors.length]
    }
  })

  return config
}

// Empty state helpers
export function getEmptyStateMessage(chartType: string): string {
  const messages = {
    area: "No hay datos de ingresos disponibles",
    bar: "No hay datos de proyectos disponibles",
    line: "No hay datos de tendencias disponibles",
    pie: "No hay datos de distribución disponibles",
    radar: "No hay datos de rendimiento disponibles",
    radial: "No hay datos de progreso disponibles"
  }

  return messages[chartType as keyof typeof messages] || "No hay datos disponibles"
}

// Error state helpers
export function getErrorStateMessage(): string {
  return "Error al cargar los datos del gráfico"
}

// Loading state helpers
export function getLoadingStateMessage(): string {
  return "Cargando datos..."
}

// Responsive helpers
export function getResponsiveHeight(baseHeight: number, screenSize?: 'sm' | 'md' | 'lg'): number {
  const multipliers = {
    sm: 0.8,
    md: 0.9,
    lg: 1
  }

  const multiplier = multipliers[screenSize || 'lg']
  return Math.round(baseHeight * multiplier)
}

// Validation for specific chart types
export function validateRevenueData(data: any[]): data is Array<{ month: string; revenue: number; quotes: number }> {
  return validateChartData(data, ['month', 'revenue', 'quotes'])
}

export function validateProjectData(data: any[]): data is Array<{ type: string; value: number; count: number; label: string }> {
  return validateChartData(data, ['type', 'value', 'count', 'label'])
}

export function validateQuoteTrendData(data: any[]): data is Array<{ month: string; quotes: number; approved: number; sent: number }> {
  return validateChartData(data, ['month', 'quotes', 'approved', 'sent'])
}

export function validateRevenueDistributionData(data: any[]): data is Array<{ name: string; value: number; fill: string }> {
  return validateChartData(data, ['name', 'value', 'fill'])
}

export function validatePerformanceData(data: any[]): data is Array<{ metric: string; current: number; target: number; max: number }> {
  return validateChartData(data, ['metric', 'current', 'target', 'max'])
}

export function validateProgressData(data: any[]): data is Array<{ name: string; value: number; fill: string }> {
  return validateChartData(data, ['name', 'value', 'fill'])
}
