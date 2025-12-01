"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDetails?: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
}

interface LeadCaptureProps {
  quoteData: {
    whatsappUrl: string;
    emailSubject: string;
    emailBody: string;
    totalPrice: number;
    projectType: string;
  };
  onLeadCaptured?: (lead: LeadData) => void;
}

export function LeadCapture({ quoteData, onLeadCaptured }: LeadCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
    preferredContact: 'whatsapp',
  });

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Por favor ingresa tu nombre');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Por favor ingresa tu teléfono');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to save lead
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the callback if provided
      onLeadCaptured?.(formData);

      setIsSubmitted(true);
      toast.success('¡Información guardada exitosamente!');

      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);

    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Error al guardar la información. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactAction = (method: 'whatsapp' | 'email') => {
    if (method === 'whatsapp') {
      window.open(quoteData.whatsappUrl, '_blank');
    } else {
      const mailtoLink = `mailto:?subject=${encodeURIComponent(quoteData.emailSubject)}&body=${encodeURIComponent(quoteData.emailBody)}`;
      window.location.href = mailtoLink;
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              ¡Información guardada!
            </h3>
            <p className="text-sm text-green-600 dark:text-green-300">
              Gracias por proporcionar tus datos. Un asesor se contactará contigo pronto.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <User className="w-4 h-4 mr-2" />
          Solicitar Cotización
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Completa tu información</DialogTitle>
          <DialogDescription>
            Para brindarte una cotización personalizada y asesoría profesional,
            necesitamos algunos datos básicos sobre ti y tu proyecto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Summary */}
          <Alert>
            <MessageSquare className="h-4 w-4" />
            <AlertDescription>
              <strong>Proyecto:</strong> {quoteData.projectType}<br />
              <strong>Total estimado:</strong> {quoteData.totalPrice}<br />
              <em>Un asesor se contactará contigo para refinar esta cotización.</em>
            </AlertDescription>
          </Alert>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+56 9 1234 5678"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nombre de tu empresa"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDetails">
                Detalles adicionales del proyecto (opcional)
              </Label>
              <Textarea
                id="projectDetails"
                value={formData.projectDetails}
                onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                placeholder="Cuéntanos más sobre tu proyecto, requisitos específicos, plazos, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Método de contacto preferido</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="whatsapp"
                    checked={formData.preferredContact === 'whatsapp'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value as any)}
                  />
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value as any)}
                  />
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value as any)}
                  />
                  <Phone className="w-4 h-4" />
                  Teléfono
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Guardar y Continuar
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Prefieres contactarnos directamente?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleContactAction('whatsapp')}
                className="flex-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => handleContactAction('email')}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
