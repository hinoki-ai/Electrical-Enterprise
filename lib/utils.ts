import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
  }).format(date)
}

export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Hoy"
  if (diffDays === 1) return "Ayer"
  if (diffDays < 7) return `Hace ${diffDays} días`
  return formatDate(date)
}

export function getPlanLabel(plan: string): string {
  const labels: Record<string, string> = {
    basic: "Básico",
    standard: "Estándar",
    premium: "Premium",
    enterprise: "Empresa",
  }
  return labels[plan] || plan
}

export function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    residential: "Residencial",
    commercial: "Comercial",
    industrial: "Industrial",
    renovation: "Renovación",
    emergency: "Emergencia",
    regularization: "Regularización",
  }
  return labels[type] || type
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Borrador",
    sent: "Enviado",
    pending: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado",
  }
  return labels[status] || status
}

export function getProjectSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    industrial: "Industrial",
    complex: "Complejo",
  }
  return labels[size] || size
}

export function getMaterialQualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    basic: "Básica",
    standard: "Estándar",
    premium: "Premium",
    luxury: "Lujo",
  }
  return labels[quality] || quality
}

export function getPaymentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    monthly: "Pago Mensual",
    upfront: "Pago Anticipado",
  }
  return labels[type] || type
}

export function getCurrencyLabel(currency: string): string {
  const labels: Record<string, string> = {
    CLP: "Peso Chileno (CLP)",
    USD: "Dólar Americano (USD)",
    EUR: "Euro (EUR)",
  }
  return labels[currency] || currency
}

export function getVATLabel(includeVAT: boolean): string {
  return includeVAT ? "Con IVA (19%)" : "Sin IVA (Chile Hillbilly Mode)"
}
