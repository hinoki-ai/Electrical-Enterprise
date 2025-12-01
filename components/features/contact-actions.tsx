"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Phone } from "lucide-react";

interface ContactActionsProps {
  whatsappUrl: string;
  emailSubject: string;
  emailBody: string;
  className?: string;
}

export function ContactActions({ whatsappUrl, emailSubject, emailBody, className }: ContactActionsProps) {
  const handleEmailClick = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Contactar al Especialista
        </CardTitle>
        <CardDescription>
          Obtén una cotización personalizada y asesoría técnica gratuita
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Contactar por WhatsApp
            <Badge variant="secondary" className="ml-2">Recomendado</Badge>
          </Button>

          <Button
            onClick={handleEmailClick}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Mail className="mr-2 h-4 w-4" />
            Enviar por Email
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Respuesta en menos de 24 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Asesoría técnica gratuita incluida</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}