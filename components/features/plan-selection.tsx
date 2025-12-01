"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Zap, Info, AlertTriangle } from "lucide-react";
import { PricingPlan, formatCLP, validatePlanForProject } from "@/lib/pricing-plans";

interface PlanSelectionProps {
  pricingPlans: PricingPlan[];
  selectedPlan: PricingPlan;
  projectValue: number;
  planValidation: {
    isValid: boolean;
    reasonKey?: string;
    reasonParams?: Record<string, any>;
  };
  shouldRecommendPlan: boolean;
  recommendedPlan: PricingPlan;
  onPlanSelect: (planId: string) => void;
}

export function PlanSelection({
  pricingPlans,
  selectedPlan,
  projectValue,
  planValidation,
  shouldRecommendPlan,
  recommendedPlan,
  onPlanSelect,
}: PlanSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Plan de Servicio
        </CardTitle>
        <CardDescription>
          Selecciona el plan que mejor se adapte a tu proyecto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Button
              key={plan.id}
              variant={selectedPlan.id === plan.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-start gap-2 ${
                selectedPlan.id === plan.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
                    onClick={() => onPlanSelect(plan.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold">{plan.name}</span>
                {plan.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-left text-muted-foreground">
                {plan.description}
              </span>
              <span className="text-sm font-medium">
                Desde {formatCLP(plan.basePrice)}
              </span>
            </Button>
          ))}
        </div>

        {/* Plan Validation */}
        {!planValidation.isValid && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {planValidation.reasonKey
                ?.replace("{plan}", planValidation.reasonParams?.plan || "")
                .replace("{min}", planValidation.reasonParams?.min || "")
                .replace("{max}", planValidation.reasonParams?.max || "")}
            </AlertDescription>
          </Alert>
        )}

        {/* Plan Recommendation */}
        {shouldRecommendPlan && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Recomendación:</strong> Para un proyecto de {formatCLP(projectValue)},
              sugerimos el plan <strong>{recommendedPlan.name}</strong>.
                    <Button
                      variant="link"
                      className="p-0 h-auto font-normal underline"
                      onClick={() => onPlanSelect(recommendedPlan.id)}
                    >
                      Cambiar a plan recomendado
                    </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}