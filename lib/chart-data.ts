import { formatCLP, getPlanLabel, getProjectTypeLabel } from "./utils"

// Types for Convex metrics data
export interface PlanStats {
  plan: "basic" | "standard" | "premium" | "enterprise"
  quotes: number
  winRate: number
}

export interface MetricsData {
  monthlyRevenue: number
  previousMonthRevenue: number
  profitMargin: number
  avgProjectValue: number
  quoteConversion: number
  clientSatisfaction: number
  planStats: PlanStats[]
  totalQuotes: number
  activeQuotes: number
}

// Chart data types
export interface RevenueData {
  month: string
  revenue: number
  quotes: number
}

export interface ProjectData {
  type: string
  value: number
  count: number
  label: string
}

export interface QuoteTrendData {
  month: string
  quotes: number
  approved: number
  sent: number
}

export interface RevenueDistributionData {
  name: string
  value: number
  fill: string
}

export interface PerformanceData {
  metric: string
  current: number
  target: number
  max: number
}

export interface ProgressData {
  name: string
  value: number
  fill: string
}

/**
 * Transform metrics data into revenue chart data
 * For now, creates a simple 6-month trend based on available data
 */
export function transformRevenueData(metrics: MetricsData): RevenueData[] {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
  const baseRevenue = metrics.monthlyRevenue

  // Generate a realistic trend with some variation
  const trendFactors = [0.7, 0.8, 0.9, 1.1, 1.0, 1.2] // Current month is highest

  return months.map((month, index) => ({
    month,
    revenue: Math.round(baseRevenue * trendFactors[index]),
    quotes: Math.round(metrics.totalQuotes * (0.8 + Math.random() * 0.4) / 6)
  }))
}

/**
 * Transform metrics into project data
 * For now, creates sample project type distribution
 */
export function transformProjectData(metrics: MetricsData): ProjectData[] {
  const totalRevenue = metrics.monthlyRevenue
  const projectTypes = [
    { type: "residential", label: "Residencial", percentage: 0.4 },
    { type: "commercial", label: "Comercial", percentage: 0.3 },
    { type: "industrial", label: "Industrial", percentage: 0.15 },
    { type: "emergency", label: "Emergencia", percentage: 0.15 }
  ]

  return projectTypes.map(({ type, label, percentage }) => ({
    type,
    value: Math.round(totalRevenue * percentage),
    count: Math.round(metrics.totalQuotes * percentage),
    label
  }))
}

/**
 * Transform metrics into quote trend data
 * Creates a 6-month trend for quotes sent, approved, etc.
 */
export function transformQuoteTrendData(metrics: MetricsData): QuoteTrendData[] {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
  const totalQuotes = metrics.totalQuotes
  const conversionRate = metrics.quoteConversion / 100

  return months.map((month, index) => {
    const monthMultiplier = 0.8 + (index / 5) * 0.4 // Increasing trend
    const sent = Math.round(totalQuotes * monthMultiplier / 6)
    const approved = Math.round(sent * conversionRate)

    return {
      month,
      quotes: sent,
      approved,
      sent
    }
  })
}

/**
 * Transform metrics into performance radar data
 */
export function transformPerformanceData(metrics: MetricsData): PerformanceData[] {
  return [
    {
      metric: "Margen",
      current: metrics.profitMargin,
      target: 35,
      max: 40
    },
    {
      metric: "Conversión",
      current: metrics.quoteConversion,
      target: 70,
      max: 80
    },
    {
      metric: "Satisfacción",
      current: Math.round(metrics.clientSatisfaction * 20), // Convert 4.7 to 94
      target: 95,
      max: 100
    },
    {
      metric: "Eficiencia",
      current: 78, // Placeholder
      target: 85,
      max: 100
    },
    {
      metric: "Crecimiento",
      current: metrics.previousMonthRevenue > 0
        ? Math.round(((metrics.monthlyRevenue - metrics.previousMonthRevenue) / metrics.previousMonthRevenue) * 100)
        : 15,
      target: 20,
      max: 30
    }
  ]
}

/**
 * Transform metrics into progress radial data
 */
export function transformProgressData(metrics: MetricsData): ProgressData[] {
  const totalQuotes = metrics.totalQuotes
  const activeQuotes = metrics.activeQuotes

  return [
    {
      name: "Proyectos\nActivos",
      value: totalQuotes > 0 ? Math.round((activeQuotes / totalQuotes) * 100) : 0,
      fill: "var(--chart-1)"
    },
    {
      name: "Objetivos\nMensuales",
      value: Math.round((metrics.monthlyRevenue / 30000000) * 100), // Based on 30M target
      fill: "var(--chart-2)"
    },
    {
      name: "Satisfacción\nCliente",
      value: Math.round(metrics.clientSatisfaction * 20), // Convert 4.7 to 94
      fill: "var(--chart-3)"
    }
  ]
}

/**
 * Transform metrics into revenue distribution pie chart data
 */
export function transformRevenueDistributionData(metrics: MetricsData): RevenueDistributionData[] {
  const totalRevenue = metrics.monthlyRevenue

  return [
    {
      name: "Residencial",
      value: Math.round(totalRevenue * 0.4),
      fill: "var(--chart-1)"
    },
    {
      name: "Comercial",
      value: Math.round(totalRevenue * 0.3),
      fill: "var(--chart-2)"
    },
    {
      name: "Industrial",
      value: Math.round(totalRevenue * 0.15),
      fill: "var(--chart-3)"
    },
    {
      name: "Emergencia",
      value: Math.round(totalRevenue * 0.15),
      fill: "var(--chart-4)"
    }
  ]
}
