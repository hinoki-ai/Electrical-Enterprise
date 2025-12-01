"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, TrendingDown } from "lucide-react";
import { BillingCycle, formatCLP, BillingCycleComparison } from "@/lib/pricing-plans";

interface BillingConfigurationProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  bestBillingCycle: BillingCycleComparison | undefined;
  cycleOptions: Array<{ value: BillingCycle; label: string; description: string }>;
}

export function BillingConfiguration({
  billingCycle,
  onBillingCycleChange,
  bestBillingCycle,
  cycleOptions,
}: BillingConfigurationProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Modalidad de Pago
        </CardTitle>
        <CardDescription>
          Selecciona la frecuencia de pago que mejor se adapte a tu presupuesto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cycleOptions.map((option) => (
            <Button
              key={option.value}
              variant={billingCycle === option.value ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-start gap-2 ${
                billingCycle === option.value ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onBillingCycleChange(option.value)}
            >
              <span className="font-semibold">{option.label}</span>
              <span className="text-xs text-left text-muted-foreground">
                {option.description}
              </span>
            </Button>
          ))}
        </div>

        {/* Savings Recommendation */}
        {bestBillingCycle && bestBillingCycle.cycle !== billingCycle && bestBillingCycle.savings > 0 && (
          <Alert className="mt-4">
            <TrendingDown className="h-4 w-4" />
            <AlertDescription>
              <strong>💰 Ahorra {formatCLP(bestBillingCycle.savings)}</strong> cambiando a pago {cycleOptions.find(c => c.value === bestBillingCycle.cycle)?.label.toLowerCase()}.
              <Button
                variant="link"
                className="p-0 h-auto font-normal underline ml-2"
                onClick={() => bestBillingCycle && onBillingCycleChange(bestBillingCycle.cycle)}
              >
                Aplicar ahorro
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}