"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { formatCLP } from "@/lib/pricing-plans";

import { projectSizeFactors, materialQualityFactors, urgencyFactors, brandPreferenceFactors } from "@/lib/pricing-plans";

type ProjectSize = keyof typeof projectSizeFactors;
type MaterialQuality = keyof typeof materialQualityFactors;
type UrgencyLevel = keyof typeof urgencyFactors;
type BrandPreference = keyof typeof brandPreferenceFactors;

interface ProjectConfigurationProps {
  selectedPlan: { minProjectValue: number; maxProjectValue: number | null };
  projectValue: number;
  inputValue: string;
  onProjectValueChange: (value: string) => void;
  onProjectValueBlur: () => void;
  onProjectValueAdjust: (delta: number) => void;
  complexity: ProjectSize;
  onComplexityChange: (value: ProjectSize) => void;
  materialQuality: MaterialQuality;
  onMaterialQualityChange: (value: MaterialQuality) => void;
  urgency: UrgencyLevel;
  onUrgencyChange: (value: UrgencyLevel) => void;
  paymentType: 'monthly' | 'upfront';
  onPaymentTypeChange: (value: 'monthly' | 'upfront') => void;
  includeVAT: boolean;
  onIncludeVATChange: (value: boolean) => void;
}

export function ProjectConfiguration({
  inputValue,
  projectValue,
  selectedPlan,
  complexity,
  materialQuality,
  urgency,
  paymentType,
  includeVAT,
  onProjectValueChange,
  onProjectValueBlur,
  onProjectValueAdjust,
  onComplexityChange,
  onMaterialQualityChange,
  onUrgencyChange,
  onPaymentTypeChange,
  onIncludeVATChange,
}: ProjectConfigurationProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Configuración del Proyecto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Value */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Valor Estimado del Proyecto
          </Label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                $
              </span>
              <Input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={(e) => onProjectValueChange(e.target.value)}
                onBlur={onProjectValueBlur}
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                className="pl-8 text-lg font-semibold"
                placeholder="1.000.000"
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onProjectValueAdjust(-500000)}
                disabled={projectValue <= 300000}
              >
                -500k
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onProjectValueAdjust(500000)}
                disabled={projectValue >= 50000000}
              >
                +500k
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatCLP(projectValue)} - Rango recomendado: {formatCLP(selectedPlan.minProjectValue)}
            {selectedPlan.maxProjectValue && ` - ${formatCLP(selectedPlan.maxProjectValue)}`}
          </p>
        </div>

        {/* Project Characteristics */}
        <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tamaño del Proyecto</Label>
                  <Select value={complexity} onValueChange={onComplexityChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(projectSizeFactors).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          <div>
                            <div className="font-medium capitalize">{key}</div>
                            <div className="text-xs text-muted-foreground">{data.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

          <div className="space-y-2">
            <Label>Calidad de Materiales</Label>
            <Select value={materialQuality} onValueChange={onMaterialQualityChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(materialQualityFactors).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    <div>
                      <div className="font-medium capitalize">{key}</div>
                      <div className="text-xs text-muted-foreground">{data.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Nivel de Urgencia
            </Label>
            <Select value={urgency} onValueChange={onUrgencyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(urgencyFactors).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    <div>
                      <div className="font-medium capitalize">{key}</div>
                      <div className="text-xs text-muted-foreground">{data.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Tipo de Pago</Label>
            <Select value={paymentType} onValueChange={onPaymentTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Pago Mensual</SelectItem>
                <SelectItem value="upfront">Pago Anticipado (5% descuento)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              IVA (19%)
            </Label>
            <Select value={includeVAT ? 'true' : 'false'} onValueChange={(value: string) => onIncludeVATChange(value === 'true')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Sin IVA (Chile Hillbilly Mode)</SelectItem>
                <SelectItem value="true">Con IVA (19%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}