// Settings utility functions for loading and using application settings

export interface AppSettings {
  notifications: boolean
  autoSave: boolean
  defaultCurrency: "CLP" | "USD" | "EUR"
  includeVAT: boolean
  defaultPaymentType: "monthly" | "upfront"
  defaultProjectType: "residential" | "commercial" | "industrial" | "renovation" | "emergency" | "regularization"
  defaultComplexity: "small" | "medium" | "large" | "complex"
  defaultMaterialQuality: "basic" | "standard" | "premium" | "luxury"
}

const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  autoSave: true,
  defaultCurrency: "CLP",
  includeVAT: true,
  defaultPaymentType: "monthly",
  defaultProjectType: "residential",
  defaultComplexity: "medium",
  defaultMaterialQuality: "standard",
}

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const saved = localStorage.getItem("electriquote_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // Fall through to defaults
  }
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: Partial<AppSettings>): void {
  if (typeof window === "undefined") return
  try {
    const current = loadSettings()
    const updated = { ...current, ...settings }
    localStorage.setItem("electriquote_settings", JSON.stringify(updated))
  } catch {
    // Silently fail
  }
}

export function getDefaultSettings(): AppSettings {
  return { ...DEFAULT_SETTINGS }
}

