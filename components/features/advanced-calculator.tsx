"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  BillingCycle,
  pricingPlans,
  findPricingPlan,
  isValidBillingCycle,
  formatCLP,
  findPlanByProjectValue,
  validatePlanForProject,
  calculateProjectPriceBreakdown,
  compareBillingCycles,
  calculateNegotiationRange,
  exportToCSV,
  projectSizeFactors,
} from "@/lib/pricing-plans";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BUSINESS_CONFIG } from "@/constants";

// Import our smaller components
import { CalculatorHeader } from "./calculator-header";
import { PlanSelection } from "./plan-selection";
import { ProjectConfiguration } from "./project-configuration";
import { BillingConfiguration } from "./billing-configuration";
import { PriceBreakdown } from "./price-breakdown";
import { ContactActions } from "./contact-actions";

const numberFormatter = new Intl.NumberFormat("es-CL");

interface AdvancedCalculatorProps {
  className?: string;
}

type ProjectSize = keyof typeof projectSizeFactors;
type MaterialQuality = keyof typeof materialQualityFactors;
type UrgencyLevel = keyof typeof urgencyFactors;

// Contact information for quotes (from business config)
const contactInfo = BUSINESS_CONFIG.contact;

export function AdvancedCalculator({ className }: AdvancedCalculatorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    const planParam = searchParams.get('plan');
    return planParam ? findPricingPlan(planParam)?.id || BUSINESS_CONFIG.defaults.plan : BUSINESS_CONFIG.defaults.plan;
  });

  const [projectValue, setProjectValue] = useState<number>(() => {
    const valueParam = searchParams.get('value');
    const parsed = valueParam ? parseInt(valueParam, 10) : NaN;
    return isNaN(parsed) ? BUSINESS_CONFIG.project.defaultValue : Math.max(BUSINESS_CONFIG.project.minValue, Math.min(BUSINESS_CONFIG.project.maxValue, parsed));
  });

  const [billingCycle, setBillingCycleState] = useState<BillingCycle>(() => {
    const billingParam = searchParams.get('billing');
    return isValidBillingCycle(billingParam) ? billingParam : BUSINESS_CONFIG.defaults.billingCycle;
  });

  const [projectSize, setProjectSize] = useState<ProjectSize>(() => {
    const sizeParam = searchParams.get('size') as ProjectSize;
    return sizeParam && sizeParam in projectSizeFactors ? sizeParam : BUSINESS_CONFIG.defaults.projectSize;
  });

  const [materialQuality, setMaterialQuality] = useState<MaterialQuality>(() => {
    const materialParam = searchParams.get('material') as MaterialQuality;
    return materialParam && materialParam in materialQualityFactors ? materialParam : BUSINESS_CONFIG.defaults.materialQuality;
  });

  const [urgency, setUrgency] = useState<UrgencyLevel>(() => {
    const urgencyParam = searchParams.get('urgency') as UrgencyLevel;
    return urgencyParam && urgencyParam in urgencyFactors ? urgencyParam : BUSINESS_CONFIG.defaults.urgency;
  });

  const [paymentType, setPaymentType] = useState<'monthly' | 'upfront'>(() => {
    const paymentParam = searchParams.get('payment');
    return paymentParam === 'upfront' ? 'upfront' : BUSINESS_CONFIG.defaults.paymentType;
  });

  const [includeVAT, setIncludeVAT] = useState<boolean>(() => {
    const vatParam = searchParams.get('vat');
    return vatParam === 'true' || BUSINESS_CONFIG.defaults.includeVAT;
  });

  // Convex queries and mutations for presets
  const presets = useQuery(api.calculator_sessions.getUserPresets, {}) || [];
  const savePresetMutation = useMutation(api.calculator_sessions.saveAsPreset);
  const deletePresetMutation = useMutation(api.calculator_sessions.deleteSession);

  const [showPresetDialog, setShowPresetDialog] = useState(false);
  const [presetName, setPresetName] = useState('');

  // Preset functions using Convex
  const savePreset = async () => {
    if (!presetName.trim()) return;

    try {
      await savePresetMutation({
        name: presetName,
        description: `Preset creado el ${new Date().toLocaleDateString('es-CL')}`,
        selectedPlanId,
        projectValue,
        billingCycle,
        projectSize,
        materialQuality,
        urgency,
        paymentType,
        includeVAT,
      });

      setPresetName('');
      setShowPresetDialog(false);
      toast.success('Configuración guardada como preset');
    } catch (error) {
      console.error('Error saving preset:', error);
      toast.error('Error al guardar el preset');
    }
  };

  const loadPreset = (preset: any) => {
    setSelectedPlanId(preset.selectedPlanId);
    setProjectValue(preset.projectValue);
    setBillingCycleState(preset.billingCycle);
    setProjectSize(preset.projectSize);
    setMaterialQuality(preset.materialQuality);
    setUrgency(preset.urgency);
    setPaymentType(preset.paymentType);
    setIncludeVAT(preset.includeVAT);
    setShowPresetDialog(false);
    toast.success(`Preset "${preset.name}" cargado`);
  };

  const deletePreset = async (presetId: string) => {
    try {
      await deletePresetMutation({ sessionId: presetId });
      toast.success('Preset eliminado');
    } catch (error) {
      console.error('Error deleting preset:', error);
      toast.error('Error al eliminar el preset');
    }
  };

  const [manualPlanOverride, setManualPlanOverride] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(String(projectValue));
  const isEditingInput = useRef(false);

  // Compute effective plan: use selected plan if manually overridden, otherwise auto-select based on project value
  const selectedPlan = useMemo(() => {
    if (manualPlanOverride) {
      return findPricingPlan(selectedPlanId) || pricingPlans[0];
    } else {
      return findPlanByProjectValue(projectValue);
    }
  }, [manualPlanOverride, selectedPlanId, projectValue]);

  // Update URL when state changes
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set('plan', selectedPlan.id);
    params.set('value', projectValue.toString());
    params.set('billing', billingCycle);
    params.set('size', projectSize);
    params.set('material', materialQuality);
    params.set('urgency', urgency);

    router.replace(`/advanced-calculator?${params.toString()}`, { scroll: false });
  }, [selectedPlan.id, projectValue, billingCycle, projectSize, materialQuality, urgency, router]);

  // Update URL when state changes
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // Plan validation
  const planValidation = useMemo(() =>
    validatePlanForProject(selectedPlan, projectValue),
    [selectedPlan, projectValue]
  );

  // Check if there's a better plan for current project value
  const recommendedPlan = useMemo(() =>
    findPlanByProjectValue(projectValue),
    [projectValue]
  );

  const shouldRecommendPlan = useMemo(() =>
    !manualPlanOverride &&
    recommendedPlan.id !== selectedPlan.id &&
    planValidation.isValid,
    [manualPlanOverride, recommendedPlan.id, selectedPlan.id, planValidation.isValid]
  );

  // Calculate price breakdown with simplified factors
  const priceBreakdown = useMemo(() =>
    calculateProjectPriceBreakdown(
      selectedPlan,
      projectValue,
      projectSize,
      materialQuality,
      urgency,
      billingCycle,
      includeVAT,
      paymentType
    ),
    [selectedPlan, projectValue, projectSize, materialQuality, urgency, billingCycle, includeVAT, paymentType]
  );

  // Calculate negotiation range (like SaaS calculator)
  const negotiationRange = useMemo(() =>
    calculateNegotiationRange(priceBreakdown.finalPrice),
    [priceBreakdown.finalPrice]
  );

  // Billing cycle comparison
  const billingComparisons = useMemo(() =>
    compareBillingCycles(priceBreakdown.adjustedBasePrice),
    [priceBreakdown.adjustedBasePrice]
  );

  const bestBillingCycle = useMemo(() =>
    billingComparisons[0],
    [billingComparisons]
  );

  // Handle project value input
  const handleProjectValueChange = useCallback((value: string) => {
    isEditingInput.current = true;
    if (value === "" || value === "-") {
      setInputValue(value);
      return;
    }

    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(numeric)) {
      setInputValue(value.replace(/\D/g, ""));
      const clamped = Math.max(BUSINESS_CONFIG.project.minValue, Math.min(BUSINESS_CONFIG.project.maxValue, numeric));
      setProjectValue(clamped);
    }
  }, []);

  const handleProjectValueBlur = useCallback(() => {
    isEditingInput.current = false;
    const numeric = parseInt(inputValue, 10);
    if (isNaN(numeric) || inputValue === "") {
      setInputValue(String(projectValue));
    } else {
      const clamped = Math.max(BUSINESS_CONFIG.project.minValue, Math.min(BUSINESS_CONFIG.project.maxValue, numeric));
      setProjectValue(clamped);
      setInputValue(String(clamped));
    }
  }, [inputValue, projectValue]);

  const adjustProjectValue = useCallback((delta: number) => {
    const newValue = projectValue + delta;
    const clamped = Math.max(BUSINESS_CONFIG.project.minValue, Math.min(BUSINESS_CONFIG.project.maxValue, newValue));
    setProjectValue(clamped);
    setInputValue(String(clamped));
  }, [projectValue]);

  // Show validation toast
  useEffect(() => {
    if (!planValidation.isValid && planValidation.reasonKey) {
      const message = planValidation.reasonKey
        .replace("{plan}", planValidation.reasonParams?.plan || "")
        .replace("{min}", planValidation.reasonParams?.min || "")
        .replace("{max}", planValidation.reasonParams?.max || "");
      toast.warning(message);
    }
  }, [planValidation]);

  // Generate contact messages
  const contactMessage = useMemo(() => {
    const projectSizeInfo = projectSizeFactors[projectSize];
    const materialInfo = materialQualityFactors[materialQuality];
    const urgencyInfo = urgencyFactors[urgency];

    const finalPrice = includeVAT ? priceBreakdown.totalWithVAT : priceBreakdown.finalPrice;

    return `Hola, me gustaría solicitar una cotización para un proyecto eléctrico:

🏗️ *Proyecto:* ${selectedPlan.name}
💰 *Valor estimado:* ${formatCLP(projectValue)}
📏 *Tamaño del Proyecto:* ${projectSizeInfo.description}
🛠️ *Materiales:* ${materialInfo.description}
⏰ *Urgencia:* ${urgencyInfo.description}
💳 *Tipo de Pago:* ${paymentType === 'upfront' ? 'Anticipado (5% descuento)' : 'Mensual'}
📊 *Modalidad:* ${billingCycle === 'monthly' ? 'Pago mensual' :
                  billingCycle === 'quarterly' ? 'Pago trimestral' :
                  billingCycle === 'semestral' ? 'Pago semestral' : 'Pago anual'}
💵 *Total estimado:* ${formatCLP(finalPrice)}${includeVAT ? ' (con IVA)' : ' (sin IVA)'}
🎯 *Rango de negociación:* ${formatCLP(negotiationRange.minPrice)} - ${formatCLP(negotiationRange.maxPrice)}

¿Podrían contactarme para agendar una visita técnica?`;
  }, [selectedPlan.name, projectValue, projectSize, materialQuality, urgency, billingCycle, includeVAT, paymentType, priceBreakdown.finalPrice, priceBreakdown.totalWithVAT, negotiationRange]);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(contactMessage)}`;
  const emailSubject = `Cotización Proyecto Eléctrico - ${selectedPlan.name}`;
  const emailBody = contactMessage;

  const cycleOptions = [
    { value: "monthly", label: "Mensual", description: "Pago mes a mes" },
    { value: "quarterly", label: "Trimestral", description: "Pago cada 3 meses (3% descuento)" },
    { value: "semestral", label: "Semestral", description: "Pago cada 6 meses (8% descuento)" },
    { value: "annual", label: "Anual", description: "Pago anual (15% descuento)" },
  ] as const;

  // Export functions
  const handleCSVExport = () => {
    const csvData = {
      'Fecha': new Date().toLocaleDateString('es-CL'),
      'Plan': selectedPlan.name,
      'Valor del Proyecto': formatCLP(projectValue),
      'Tamaño del Proyecto': projectSizeFactors[projectSize].description,
      'Materiales': materialQualityFactors[materialQuality].description,
      'Urgencia': urgencyFactors[urgency].description,
      'Tipo de Pago': paymentType === 'upfront' ? 'Anticipado (5% descuento)' : 'Mensual',
      'Modalidad de Pago': billingCycle === 'monthly' ? 'Mensual' :
                          billingCycle === 'quarterly' ? 'Trimestral' :
                          billingCycle === 'semestral' ? 'Semestral' : 'Anual',
      'Precio Base': formatCLP(priceBreakdown.basePrice),
      'Precio Final': formatCLP(priceBreakdown.finalPrice),
      'IVA Incluido': includeVAT ? 'Si' : 'No',
      'IVA Amount': includeVAT ? formatCLP(priceBreakdown.vatAmount) : '$0',
      'Total con IVA': includeVAT ? formatCLP(priceBreakdown.totalWithVAT) : formatCLP(priceBreakdown.finalPrice),
      'Ahorro Total': formatCLP(priceBreakdown.savings.total),
      'Rango Minimo': formatCLP(negotiationRange.minPrice),
      'Precio Sugerido': formatCLP(negotiationRange.suggestedPrice),
      'Rango Maximo': formatCLP(negotiationRange.maxPrice),
    };

    exportToCSV(csvData);
    toast.success('CSV exportado exitosamente');
  };

  const handlePDFExport = async () => {
    try {
      toast.loading('Generando PDF...', { id: 'pdf-export' });

      const contentElement = document.getElementById('price-breakdown-card');
      if (!contentElement) {
        toast.error('Error: No se pudo encontrar el contenido para exportar', { id: 'pdf-export' });
        return;
      }

      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`cotizacion-electrica-${new Date().toISOString().split('T')[0]}.pdf`);

      toast.success('PDF generado exitosamente', { id: 'pdf-export' });
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast.error('Error al generar el PDF. Por favor, intenta nuevamente.', { id: 'pdf-export' });
    }
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-6 ${className}`}>
      <CalculatorHeader
        presets={presets}
        showPresetDialog={showPresetDialog}
        setShowPresetDialog={setShowPresetDialog}
        presetName={presetName}
        setPresetName={setPresetName}
        onSavePreset={savePreset}
        onLoadPreset={loadPreset}
        onDeletePreset={deletePreset}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <PlanSelection
            pricingPlans={pricingPlans}
            selectedPlan={selectedPlan}
            onPlanSelect={(planId) => {
              setSelectedPlanId(planId);
              setManualPlanOverride(true);
            }}
            projectValue={projectValue}
            planValidation={planValidation}
            shouldRecommendPlan={shouldRecommendPlan}
            recommendedPlan={recommendedPlan}
          />

          <ProjectConfiguration
            selectedPlan={selectedPlan}
            projectValue={projectValue}
            inputValue={inputValue}
            onProjectValueChange={handleProjectValueChange}
            onProjectValueBlur={handleProjectValueBlur}
            onProjectValueAdjust={adjustProjectValue}
            complexity={projectSize}
            onComplexityChange={setProjectSize}
            materialQuality={materialQuality}
            onMaterialQualityChange={setMaterialQuality}
            urgency={urgency}
            onUrgencyChange={setUrgency}
            paymentType={paymentType}
            onPaymentTypeChange={setPaymentType}
            includeVAT={includeVAT}
            onIncludeVATChange={setIncludeVAT}
          />

          <BillingConfiguration
            billingCycle={billingCycle}
            onBillingCycleChange={setBillingCycleState}
            bestBillingCycle={bestBillingCycle}
            cycleOptions={cycleOptions}
          />
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <PriceBreakdown
            selectedPlan={selectedPlan}
            projectValue={projectValue}
            billingCycle={billingCycle}
            includeVAT={includeVAT}
            priceBreakdown={priceBreakdown}
            negotiationRange={negotiationRange}
            contactMessage={contactMessage}
            whatsappUrl={whatsappUrl}
            emailSubject={emailSubject}
            emailBody={emailBody}
            onCSVExport={handleCSVExport}
            onPDFExport={handlePDFExport}
          />
        </div>
      </div>
    </div>
  );
}
