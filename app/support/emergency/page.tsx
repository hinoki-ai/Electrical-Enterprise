"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MapPin, Clock, User, Zap, Shield, Ambulance } from "lucide-react"

export default function EmergencyPage() {
  const emergencyContacts: never[] = []

  const emergencyProtocols: never[] = []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Servicio de Emergencias</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Atención inmediata 24/7 para emergencias eléctricas. Tu seguridad es nuestra prioridad.
            </p>
          </div>
        </div>

        {/* Emergency Hotline */}
        <Card className="border-destructive mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">LÍNEA DE EMERGENCIAS</h2>
              <div className="text-4xl font-bold text-destructive mb-2">+56 9 0000 0000</div>
              <p className="text-muted-foreground mb-4">Disponible 24 horas al día, 7 días a la semana</p>
              <Button size="lg" className="bg-destructive hover:bg-destructive/90 gap-2">
                <Phone className="w-5 h-5" />
                Llamar Ahora
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Contactos de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.type}</p>
                      </div>
                      <Button size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Llamar
                      </Button>
                    </div>
                    <div className="text-sm font-mono mb-2">{contact.phone}</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {contact.response}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {contact.coverage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Protocols */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Protocolos de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyProtocols.map((protocol, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{protocol.title}</h3>
                      <Badge variant={
                        protocol.priority === 'Crítica' ? 'destructive' :
                        protocol.priority === 'Alta' ? 'default' : 'secondary'
                      }>
                        {protocol.priority}
                      </Badge>
                    </div>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      {protocol.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-2">
                          <span className="text-destructive font-medium">{stepIndex + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Servicios de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[].map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">{service.service}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.time}
                      </span>
                      <span className="font-medium text-primary">{service.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Información de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h3 className="font-medium text-warning mb-2">⚡ Precauciones Básicas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Nunca manipules instalaciones eléctricas sin capacitación</li>
                    <li>• Desconecta la alimentación antes de cualquier trabajo</li>
                    <li>• Usa equipo de protección personal (EPP)</li>
                    <li>• Reporta cualquier anomalía inmediatamente</li>
                  </ul>
                </div>

                <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                  <h3 className="font-medium text-info mb-2">📞 Números de Emergencia</h3>
                  <div className="text-sm space-y-1">
                    <div><strong>Bomberos:</strong> 132</div>
                    <div><strong>Ambulancia:</strong> 131</div>
                    <div><strong>Carabineros:</strong> 133</div>
                    <div><strong>Emergencias:</strong> +56 9 0000 0000</div>
                  </div>
                </div>

                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h3 className="font-medium text-success mb-2">✅ Checklist de Seguridad</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Verificar que no hay agua cerca de equipos eléctricos</li>
                    <li>• Confirmar que todos los interruptores están etiquetados</li>
                    <li>• Asegurar que hay extintores disponibles</li>
                    <li>• Mantener despejado el área de trabajo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Banner */}
        <Card className="mt-6 bg-destructive/5 border-destructive/20">
          <CardContent className="p-6 text-center">
            <Ambulance className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-bold text-destructive mb-2">
              ¿Es una Emergencia Eléctrica?
            </h3>
            <p className="text-muted-foreground mb-4">
              Si hay riesgo inminente para personas o propiedades, llama inmediatamente a emergencias.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="destructive" size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Llamar 132 (Bomberos)
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Llamar 131 (Ambulancia)
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
