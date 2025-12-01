"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { toast } from "sonner";

interface Preset {
  name: string;
  config: any;
  createdAt: string;
}

interface CalculatorHeaderProps {
  presets: Array<{
    _id: string;
    name: string;
    description?: string;
    createdAt: number;
    selectedPlanId: string;
    projectValue: number;
    billingCycle: string;
    projectSize: string;
    materialQuality: string;
    urgency: string;
    paymentType: string;
    includeVAT: boolean;
  }>;
  showPresetDialog: boolean;
  setShowPresetDialog: (show: boolean) => void;
  presetName: string;
  setPresetName: (name: string) => void;
  onSavePreset: () => void;
  onLoadPreset: (preset: any) => void;
  onDeletePreset: (presetId: string) => void;
}

export function CalculatorHeader({
  presets,
  showPresetDialog,
  setShowPresetDialog,
  presetName,
  setPresetName,
  onSavePreset,
  onLoadPreset,
  onDeletePreset
}: CalculatorHeaderProps) {


  return (
    <Card className="backdrop-blur-xl bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Calculadora Avanzada de Proyectos
            </CardTitle>
            <CardDescription className="text-lg">
              Obtén una cotización precisa basada en las características de tu proyecto
            </CardDescription>
          </div>
        </div>

        {/* Preset Controls */}
        <div className="flex justify-center gap-2 mt-4">
          <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                💾 Guardar Preset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guardar Configuración</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preset-name">Nombre del Preset</Label>
                  <Input
                    id="preset-name"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Ej: Proyecto Residencial Estándar"
                  />
                </div>
                <Button onClick={onSavePreset} className="w-full">
                  Guardar Preset
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                📂 Cargar Preset ({presets.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cargar Configuración</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {presets.length > 0 ? (
                  presets.map((preset) => (
                    <div key={preset._id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{preset.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {preset.description || new Date(preset.createdAt).toLocaleDateString('es-CL')}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => onLoadPreset(preset)}>
                          Cargar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDeletePreset(preset._id)}>
                          🗑️
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No hay presets guardados
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
    </Card>
  );
}