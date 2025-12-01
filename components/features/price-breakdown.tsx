"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  PricingPlan,
  ProjectPriceBreakdown,
  NegotiationRange,
  formatCLP
} from "@/lib/pricing-plans";
import { BUSINESS_CONFIG } from "@/constants";
import { LeadCapture } from "./lead-capture";
import { ContactActions } from "./contact-actions";

interface PriceBreakdownProps {
  selectedPlan: PricingPlan;
  projectValue: number;
  billingCycle: string;
  includeVAT: boolean;
  priceBreakdown: ProjectPriceBreakdown;
  negotiationRange: NegotiationRange;
  contactMessage: string;
  whatsappUrl: string;
  emailSubject: string;
  emailBody: string;
  onCSVExport: () => void;
  onPDFExport: () => void;
}

export function PriceBreakdown({
  selectedPlan,
  projectValue,
  priceBreakdown,
  negotiationRange,
  includeVAT,
  billingCycle,
  contactMessage,
  whatsappUrl,
  emailSubject,
  emailBody,
  onCSVExport,
  onPDFExport,
}: PriceBreakdownProps) {
  return (
    <Card id="price-breakdown-card" className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-center">Cotización Detallada</CardTitle>
        <CardDescription className="text-center">
          {selectedPlan.name} - {formatCLP(projectValue)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Price */}
        <div className="text-center p-6 bg-primary/5 rounded-lg border">
          <div className="text-3xl font-bold text-primary mb-2">
            {formatCLP(includeVAT ? priceBreakdown.totalWithVAT : priceBreakdown.finalPrice)}
          </div>
          <div className="text-sm text-muted-foreground">
            {billingCycle === 'monthly' ? 'Pago mensual' :
             billingCycle === 'quarterly' ? 'Pago trimestral' :
             billingCycle === 'semestral' ? 'Pago semestral' : 'Pago anual'}
            {includeVAT ? ' (con IVA)' : ' (sin IVA)'}
          </div>
          {billingCycle !== 'monthly' && (
            <div className="text-xs text-green-600 mt-1">
              Equivalente a {formatCLP(includeVAT ? priceBreakdown.monthlyEquivalentWithVAT : priceBreakdown.monthlyEquivalent)}/mes
            </div>
          )}
          {includeVAT && (
            <div className="text-xs text-blue-600 mt-1">
              IVA (19%): {formatCLP(priceBreakdown.vatAmount)}
            </div>
          )}
        </div>

        {/* Negotiation Range */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-blue-800 dark:text-blue-200 font-semibold text-center mb-2">
            💰 Rango de Negociación
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="font-medium text-red-600">{formatCLP(negotiationRange.minPrice)}</div>
              <div className="text-xs text-muted-foreground">Mínimo</div>
            </div>
            <div className="border-x border-blue-200 dark:border-blue-700">
              <div className="font-bold text-blue-700">{formatCLP(negotiationRange.suggestedPrice)}</div>
              <div className="text-xs text-muted-foreground">Sugerido</div>
            </div>
            <div>
              <div className="font-medium text-green-600">{formatCLP(negotiationRange.maxPrice)}</div>
              <div className="text-xs text-muted-foreground">Máximo</div>
            </div>
          </div>
        </div>

        {/* Savings */}
        {priceBreakdown.savings.total > 0 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-green-800 dark:text-green-200 font-semibold text-center">
              🎉 Ahorras {formatCLP(priceBreakdown.savings.total)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-300 text-center mt-1">
              {priceBreakdown.savings.fromBillingCycle > 0 && `Pago programado: ${formatCLP(priceBreakdown.savings.fromBillingCycle)}`}
              {priceBreakdown.savings.fromUrgency > 0 && ` • Urgencia: ${formatCLP(priceBreakdown.savings.fromUrgency)}`}
              {priceBreakdown.savings.fromVAT > 0 && ` • Sin IVA: ${formatCLP(priceBreakdown.savings.fromVAT)}`}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Características Incluidas:</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Garantía: {selectedPlan.features.warranty} meses</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Respuesta: {selectedPlan.features.responseTime}</span>
            </div>
            {selectedPlan.features.emergencySupport && (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Soporte de emergencias 24/7</span>
              </div>
            )}
            {selectedPlan.features.certification && (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Certificación SEC incluida</span>
              </div>
            )}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={onCSVExport}
              className="text-xs"
            >
              📊 Exportar CSV
            </Button>
            <Button
              variant="outline"
              onClick={onPDFExport}
              className="text-xs"
            >
              📄 Exportar PDF
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Respuesta estimada: {BUSINESS_CONFIG.service.responseEstimate}
          </p>
        </div>

        {whatsappUrl && (
          <LeadCapture
            quoteData={{
              whatsappUrl,
              emailSubject,
              emailBody,
              totalPrice: includeVAT ? priceBreakdown.totalWithVAT : priceBreakdown.finalPrice,
              projectType: selectedPlan.name,
            }}
            onLeadCaptured={(lead) => {
              console.log('Lead captured:', lead);
              // Here you could send the lead data to your CRM or database
            }}
          />
        )}

        {whatsappUrl && emailSubject && emailBody && (
          <ContactActions
            whatsappUrl={whatsappUrl}
            emailSubject={emailSubject}
            emailBody={emailBody}
            className="mt-6"
          />
        )}
      </CardContent>
    </Card>
  );
}