// Business configuration - easily changeable without redeployment

export const BUSINESS_CONFIG = {
  // Company Information
  company: {
    name: "Electrical Enterprise",
    tagline: "Soluciones Eléctricas Profesionales",
  },

  // Contact Information
  contact: {
    whatsapp: "+56912345678",
    email: "contacto@electricalenterprise.cl",
    whatsappDisplay: "+56 9 1234 5678",
    phone: "+56 2 2345 6789",
    address: "Santiago, Chile",
  },

  // Business Rules
  pricing: {
    vatRate: 0.19, // 19% IVA in Chile
    upfrontDiscount: 0.05, // 5% discount for upfront payment
    billingCycleDiscounts: {
      monthly: 0,
      quarterly: 0.03, // 3%
      semestral: 0.08, // 8%
      annual: 0.15, // 15%
    },
    negotiationRange: {
      min: 0.85, // 15% below suggested price
      max: 1.25, // 25% above suggested price
    },
  },

  // Project Constraints
  project: {
    minValue: 300000, // $300.000 CLP minimum
    maxValue: 50000000, // $50.000.000 CLP maximum
    defaultValue: 1000000, // $1.000.000 CLP default
  },

  // Response Times
  service: {
    responseEstimate: "2-4 horas hábiles",
    emergencyResponse: "24/7",
  },

  // Default selections
  defaults: {
    plan: "estandar",
    projectSize: "medium",
    materialQuality: "standard",
    urgency: "normal",
    billingCycle: "monthly",
    paymentType: "monthly",
    includeVAT: false, // Chile Hillbilly Mode by default
  },
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
