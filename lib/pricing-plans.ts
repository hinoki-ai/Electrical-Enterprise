import { BUSINESS_CONFIG } from '@/constants';

export type BillingCycle = "monthly" | "quarterly" | "semestral" | "annual";

type PlanFeatureValue = boolean | number | string | null;

export interface PlanFeatures {
  // Core electrical services
  basicWiring: boolean;
  advancedWiring: boolean;
  electricalPanel: boolean;
  grounding: boolean;
  lighting: boolean;
  outlets: boolean;
  emergencySystems: boolean;

  // Project complexity factors
  complexityLevel: number; // 1-5 scale
  projectSize: string; // 'small', 'medium', 'large', 'industrial'

  // Materials and quality
  materialQuality: string; // 'standard', 'premium', 'luxury'
  brandPreference: string; // 'economic', 'standard', 'premium'

  // Support and warranty
  warranty: number; // months
  responseTime: string; // '24hrs', '12hrs', '6hrs', '2hrs'
  emergencySupport: boolean;

  // Additional services
  maintenance: boolean;
  monitoring: boolean;
  certification: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  minProjectValue: number;
  maxProjectValue: number | null;
  badge: string | null;
  features: PlanFeatures;
}

// Simplified pricing factors - focus on what matters most to customers

// Project size based on value ranges (replaces complex complexity factors)
export const projectSizeFactors = {
  small: { factor: 0.85, description: "Proyectos hasta $2.500.000", maxValue: 2500000 },
  medium: { factor: 1.0, description: "Proyectos $2.500.001 - $8.000.000", maxValue: 8000000 },
  large: { factor: 1.2, description: "Proyectos $8.000.001 - $15.000.000", maxValue: 15000000 },
  industrial: { factor: 1.4, description: "Proyectos industriales sin límite", maxValue: null },
};

// Material quality - simplified to 2 options
export const materialQualityFactors = {
  standard: { factor: 1.0, description: "Materiales estándar de calidad certificada" },
  premium: { factor: 1.25, description: "Materiales premium con mejores especificaciones" },
};

// Urgency - simplified to 3 clear options
export const urgencyFactors = {
  normal: { factor: 1.0, description: "Plazo estándar 2-4 semanas" },
  priority: { factor: 1.15, description: "Plazo prioritario 1-2 semanas" },
  urgent: { factor: 1.35, description: "Ejecución inmediata 3-5 días hábiles" },
};

// Brand preference - simplified to 3 options
export const brandPreferenceFactors = {
  economic: { factor: 0.9, description: "Opciones económicas con buen rendimiento" },
  standard: { factor: 1.0, description: "Balance óptimo precio-calidad" },
  premium: { factor: 1.2, description: "Marcas premium y mejores garantías" },
};

export const billingCycleDiscount: Record<BillingCycle, number> = BUSINESS_CONFIG.pricing.billingCycleDiscounts;

// Upfront payment discount
export const UPFRONT_DISCOUNT_RATE = BUSINESS_CONFIG.pricing.upfrontDiscount;

export const pricingPlans: PricingPlan[] = [
  {
    id: "basico",
    name: "Plan Básico",
    description: "Instalaciones eléctricas esenciales hasta $2.500.000",
    basePrice: 150000,
    minProjectValue: 300000,
    maxProjectValue: 2500000,
    badge: "Más económico",
    features: {
      basicWiring: true,
      advancedWiring: false,
      electricalPanel: true,
      grounding: true,
      lighting: true,
      outlets: true,
      emergencySystems: false,
      complexityLevel: 1,
      projectSize: 'small',
      materialQuality: 'standard',
      brandPreference: 'economic',
      warranty: 12,
      responseTime: '24hrs',
      emergencySupport: false,
      maintenance: false,
      monitoring: false,
      certification: true,
    },
  },
  {
    id: "estandar",
    name: "Plan Estándar",
    description: "Instalaciones completas hasta $8.000.000",
    basePrice: 220000,
    minProjectValue: 2500001,
    maxProjectValue: 8000000,
    badge: null,
    features: {
      basicWiring: true,
      advancedWiring: true,
      electricalPanel: true,
      grounding: true,
      lighting: true,
      outlets: true,
      emergencySystems: false,
      complexityLevel: 3,
      projectSize: 'medium',
      materialQuality: 'standard',
      brandPreference: 'standard',
      warranty: 24,
      responseTime: '12hrs',
      emergencySupport: true,
      maintenance: false,
      monitoring: false,
      certification: true,
    },
  },
  {
    id: "premium",
    name: "Plan Premium",
    description: "Soluciones avanzadas hasta $15.000.000",
    basePrice: 350000,
    minProjectValue: 8000001,
    maxProjectValue: 15000000,
    badge: "Más completo",
    features: {
      basicWiring: true,
      advancedWiring: true,
      electricalPanel: true,
      grounding: true,
      lighting: true,
      outlets: true,
      emergencySystems: true,
      complexityLevel: 4,
      projectSize: 'large',
      materialQuality: 'premium',
      brandPreference: 'standard',
      warranty: 36,
      responseTime: '6hrs',
      emergencySupport: true,
      maintenance: true,
      monitoring: false,
      certification: true,
    },
  },
  {
    id: "empresarial",
    name: "Plan Empresarial",
    description: "Proyectos industriales y corporativos",
    basePrice: 500000,
    minProjectValue: 15000001,
    maxProjectValue: null,
    badge: "Industrial",
    features: {
      basicWiring: true,
      advancedWiring: true,
      electricalPanel: true,
      grounding: true,
      lighting: true,
      outlets: true,
      emergencySystems: true,
      complexityLevel: 5,
      projectSize: 'industrial',
      materialQuality: 'luxury',
      brandPreference: 'premium',
      warranty: 60,
      responseTime: '2hrs',
      emergencySupport: true,
      maintenance: true,
      monitoring: true,
      certification: true,
    },
  },
];

export const featureLabels: Array<{ key: keyof PlanFeatures; label: string; category: string }> = [
  // Core Services
  { key: "basicWiring", label: "Cableado básico e instalación", category: "Servicios Eléctricos" },
  { key: "advancedWiring", label: "Cableado avanzado y automatización", category: "Servicios Eléctricos" },
  { key: "electricalPanel", label: "Tablero eléctrico principal", category: "Servicios Eléctricos" },
  { key: "grounding", label: "Sistema de puesta a tierra", category: "Servicios Eléctricos" },
  { key: "lighting", label: "Instalación de iluminación", category: "Servicios Eléctricos" },
  { key: "outlets", label: "Toma corrientes y enchufes", category: "Servicios Eléctricos" },
  { key: "emergencySystems", label: "Sistemas de emergencia y respaldo", category: "Servicios Eléctricos" },

  // Support & Warranty
  { key: "warranty", label: "Garantía del servicio", category: "Garantía y Soporte" },
  { key: "responseTime", label: "Tiempo de respuesta", category: "Garantía y Soporte" },
  { key: "emergencySupport", label: "Soporte de emergencias", category: "Garantía y Soporte" },

  // Additional Services
  { key: "maintenance", label: "Mantenimiento preventivo", category: "Servicios Adicionales" },
  { key: "monitoring", label: "Monitoreo remoto del sistema", category: "Servicios Adicionales" },
  { key: "certification", label: "Certificación SEC y municipal", category: "Servicios Adicionales" },
];

export const findPricingPlan = (planId: string) =>
  pricingPlans.find((plan) => plan.id === planId);

export const isValidBillingCycle = (
  value: string | null | undefined,
): value is BillingCycle =>
  value === "monthly" || value === "quarterly" || value === "semestral" || value === "annual";

export const formatCLP = (amount: number) =>
  `$${amount.toLocaleString("es-CL")}`;

// VAT configuration
export const VAT_RATE = BUSINESS_CONFIG.pricing.vatRate;

export const calculatePriceWithVAT = (price: number, includeVAT: boolean = false) => {
  if (!includeVAT) return price;
  return Math.round(price * (1 + VAT_RATE));
};

export const calculateVATAmount = (price: number) => {
  return Math.round(price * VAT_RATE);
};

export const calculateBaseProjectPrice = (
  plan: PricingPlan,
  projectValue: number,
  complexity: keyof typeof projectSizeFactors,
  materialQuality: keyof typeof materialQualityFactors,
  brandPreference: keyof typeof brandPreferenceFactors,
  urgency: keyof typeof urgencyFactors,
) => {
  const complexityFactor = projectSizeFactors[complexity].factor;
  const materialFactor = materialQualityFactors[materialQuality].factor;
  const brandFactor = brandPreferenceFactors[brandPreference].factor;
  const urgencyFactor = urgencyFactors[urgency].factor;

  // Base calculation with project value scaling
  const scaledBasePrice = plan.basePrice * (projectValue / 1000000); // Scale based on millions

  // Apply all factors
  return Math.round(scaledBasePrice * complexityFactor * materialFactor * brandFactor * urgencyFactor);
};

export const calculateBillingPrice = (
  basePrice: number,
  billingCycle: BillingCycle,
) => {
  const discount = billingCycleDiscount[billingCycle];
  return Math.round(basePrice * (1 - discount));
};

export const isPlanFeatureEnabled = (value: PlanFeatureValue) => {
  if (typeof value === "boolean") {
    return value;
  }
  return Boolean(value);
};

/**
 * Finds the appropriate pricing plan for a given project value
 */
export const findPlanByProjectValue = (projectValue: number): PricingPlan => {
  const matchingPlan = pricingPlans.find((plan) => {
    if (plan.maxProjectValue === null) {
      return projectValue >= plan.minProjectValue;
    }
    return projectValue >= plan.minProjectValue && projectValue <= plan.maxProjectValue;
  });

  if (!matchingPlan) {
    if (projectValue < pricingPlans[0].minProjectValue) {
      return pricingPlans[0];
    }
    return pricingPlans[pricingPlans.length - 1];
  }

  return matchingPlan;
};

/**
 * Validates if a project value is within the range of a given plan
 */
export const validatePlanForProject = (
  plan: PricingPlan,
  projectValue: number,
): {
  isValid: boolean;
  reasonKey?: string;
  reasonParams?: Record<string, any>;
} => {
  if (projectValue < plan.minProjectValue) {
    return {
      isValid: false,
      reasonKey: "calculator.plan_min_value_error",
      reasonParams: {
        plan: plan.name,
        min: formatCLP(plan.minProjectValue)
      },
    };
  }
  if (plan.maxProjectValue !== null && projectValue > plan.maxProjectValue) {
    return {
      isValid: false,
      reasonKey: "calculator.plan_max_value_error",
      reasonParams: {
        plan: plan.name,
        max: formatCLP(plan.maxProjectValue)
      },
    };
  }
  return { isValid: true };
};

/**
 * Calculates comprehensive price breakdown including all factors
 */
export interface ProjectPriceBreakdown {
  basePrice: number;
  projectValueFactor: number;
  complexityFactor: number;
  complexityMultiplier: number;
  materialFactor: number;
  materialMultiplier: number;
  brandFactor: number;
  brandMultiplier: number;
  urgencyFactor: number;
  urgencyMultiplier: number;
  adjustedBasePrice: number;
  billingCycleDiscount: number;
  billingCycleDiscountAmount: number;
  finalPrice: number;
  monthlyEquivalent: number;
  // VAT related fields
  includeVAT: boolean;
  vatAmount: number;
  totalWithVAT: number;
  monthlyEquivalentWithVAT: number;
  savings: {
    fromBillingCycle: number;
    fromUrgency: number;
    fromVAT: number;
    total: number;
  };
}

// Negotiation ranges (like SaaS calculator)
export const NEGOTIATION_RANGE = BUSINESS_CONFIG.pricing.negotiationRange;

export interface NegotiationRange {
  minPrice: number;
  suggestedPrice: number;
  maxPrice: number;
}

export const calculateNegotiationRange = (suggestedPrice: number): NegotiationRange => {
  return {
    minPrice: Math.round(suggestedPrice * NEGOTIATION_RANGE.min),
    suggestedPrice: suggestedPrice,
    maxPrice: Math.round(suggestedPrice * NEGOTIATION_RANGE.max),
  };
};

// CSV Export functionality (like SaaS calculator)
export const exportToCSV = (data: any) => {
  const csvContent = Object.entries(data)
    .map(([key, value]) => `"${key}","${String(value).replace(/"/g, '""')}"`)
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `cotizacion-electrica-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const calculateProjectPriceBreakdown = (
  plan: PricingPlan,
  projectValue: number,
  projectSize: keyof typeof projectSizeFactors,
  materialQuality: keyof typeof materialQualityFactors,
  urgency: keyof typeof urgencyFactors,
  billingCycle: BillingCycle,
  includeVAT: boolean = false,
  paymentType: 'monthly' | 'upfront' = 'monthly',
): ProjectPriceBreakdown => {
  const projectSizeData = projectSizeFactors[projectSize];
  const materialData = materialQualityFactors[materialQuality];
  const urgencyData = urgencyFactors[urgency];

  // Base price calculation
  const basePrice = plan.basePrice;
  const projectValueFactor = projectValue / 1000000; // Scale factor

  // Simplified multipliers - focus on core factors
  const projectSizeMultiplier = projectSizeData.factor;
  const materialMultiplier = materialData.factor;
  const urgencyMultiplier = urgencyData.factor;

  // Apply upfront discount if selected
  const upfrontDiscount = paymentType === 'upfront' ? UPFRONT_DISCOUNT_RATE : 0;

  // Calculate adjusted base price with simplified factors
  const adjustedBasePrice = Math.round(
    basePrice * projectValueFactor *
    projectSizeMultiplier * materialMultiplier * urgencyMultiplier *
    (1 - upfrontDiscount)
  );

  // Apply billing cycle discount
  const cycleDiscount = billingCycleDiscount[billingCycle];
  const billingCycleDiscountAmount = Math.round(adjustedBasePrice * cycleDiscount);
  const finalPrice = adjustedBasePrice - billingCycleDiscountAmount;

  // Calculate monthly equivalent based on billing cycle
  const monthsInCycle = billingCycle === "monthly" ? 1 :
                       billingCycle === "quarterly" ? 3 :
                       billingCycle === "semestral" ? 6 : 12;
  const monthlyEquivalent = Math.round(finalPrice / monthsInCycle);

  // Calculate savings
  const baseWithoutUrgency = Math.round(
    basePrice * projectValueFactor * projectSizeMultiplier * materialMultiplier
  );
  const savingsFromUrgency = baseWithoutUrgency - (adjustedBasePrice / (1 - upfrontDiscount));
  const savingsFromBillingCycle = billingCycleDiscountAmount;
  const savingsFromUpfront = upfrontDiscount > 0 ? Math.round(adjustedBasePrice / (1 - upfrontDiscount) * upfrontDiscount) : 0;

  // VAT calculations
  const vatAmount = includeVAT ? calculateVATAmount(finalPrice) : 0;
  const totalWithVAT = finalPrice + vatAmount;
  const monthlyEquivalentWithVAT = includeVAT ?
    Math.round(totalWithVAT / monthsInCycle) : monthlyEquivalent;

  // Savings from VAT (when VAT is excluded, it's a "saving")
  const savingsFromVAT = includeVAT ? 0 : vatAmount;

  return {
    basePrice,
    projectValueFactor,
    complexityFactor: projectSizeData.factor,
    complexityMultiplier: projectSizeMultiplier,
    materialFactor: materialData.factor,
    materialMultiplier,
    brandFactor: 1.0, // Simplified - no brand factor
    brandMultiplier: 1.0,
    urgencyFactor: urgencyData.factor,
    urgencyMultiplier,
    adjustedBasePrice,
    billingCycleDiscount: cycleDiscount,
    billingCycleDiscountAmount,
    finalPrice,
    monthlyEquivalent,
    includeVAT,
    vatAmount,
    totalWithVAT,
    monthlyEquivalentWithVAT,
    savings: {
      fromBillingCycle: Math.max(0, savingsFromBillingCycle),
      fromUrgency: Math.max(0, savingsFromUrgency),
      fromVAT: Math.max(0, savingsFromVAT),
      total: Math.max(0, savingsFromBillingCycle + savingsFromUrgency + savingsFromVAT + savingsFromUpfront),
    },
  };
};

/**
 * Compares billing cycles and returns the best option
 */
export interface BillingCycleComparison {
  cycle: BillingCycle;
  totalCost: number;
  monthlyCost: number;
  savings: number;
  savingsPercent: number;
}

export const compareBillingCycles = (
  basePrice: number,
): BillingCycleComparison[] => {
  const cycles: BillingCycle[] = ["monthly", "quarterly", "semestral", "annual"];

  const comparisons: BillingCycleComparison[] = cycles.map((cycle) => {
    const discountedPrice = calculateBillingPrice(basePrice, cycle);
    const months = cycle === "monthly" ? 1 :
                  cycle === "quarterly" ? 3 :
                  cycle === "semestral" ? 6 : 12;

    // Normalize to 12 months for fair comparison
    const normalizedCost = discountedPrice * (12 / months);
    const monthlyCost = Math.round(normalizedCost / 12);

    // Calculate savings compared to monthly (most expensive)
    const monthlyCostFull = basePrice;
    const savings = monthlyCostFull - normalizedCost;
    const savingsPercent = (savings / monthlyCostFull) * 100;

    return {
      cycle,
      totalCost: discountedPrice,
      monthlyCost,
      savings: Math.max(0, Math.round(savings)),
      savingsPercent: Math.max(0, Math.round(savingsPercent * 100) / 100),
    };
  });

  return comparisons.sort((a, b) => a.monthlyCost - b.monthlyCost);
};
