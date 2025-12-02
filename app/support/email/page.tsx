"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock, User, Send, Inbox, Star, Archive, Trash2, Reply } from "lucide-react"

export default function EmailPage() {
  const emailContacts: never[] = []

  const emailTemplates: never[] = []

  const recentEmails: never[] = []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Correo Electrónico</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comunicación formal y documentada. Todas las consultas importantes por email.
            </p>
          </div>
        </div>

        {/* Email Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {emailContacts.map((contact, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium mb-1">{contact.department}</h3>
                    <div className="text-sm font-mono text-primary mb-2">{contact.email}</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {contact.response}
                      </span>
                      <span>{contact.hours}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Send className="w-4 h-4" />
                    Enviar Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Plantillas de Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emailTemplates.map((template, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{template.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{template.category}</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Usar Plantilla
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Emails */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="w-5 h-5" />
                Emails Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentEmails.map((email, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${
                    email.status === 'unread' ? 'bg-primary/5 border-primary/20' : ''
                  }`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${
                          email.status === 'unread' ? 'font-semibold' : ''
                        }`}>
                          {email.subject}
                        </div>
                        <div className="text-xs text-muted-foreground">{email.from}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{email.time}</span>
                        {email.status === 'unread' && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Reply className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Star className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Archive className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Directrices para Comunicación por Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">✅ Mejores Prácticas</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Asunto claro y descriptivo</li>
                  <li>• Saludo personalizado</li>
                  <li>• Información completa y precisa</li>
                  <li>• Adjuntar documentos relevantes</li>
                  <li>• Firma profesional con datos de contacto</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">❌ Evitar</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Información confidencial sin encriptar</li>
                  <li>• Adjuntos muy grandes</li>
                  <li>• Lenguaje informal o abreviaturas</li>
                  <li>• Información incompleta</li>
                  <li>• Múltiples destinatarios innecesarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Signature */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Firma de Email Estándar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div>Usuario</div>
              <div>Cargo</div>
              <div>Empresa</div>
              <br />
              <div>📧 email@ejemplo.cl</div>
              <div>📱 +56 9 0000 0000</div>
              <div>🌐 www.ejemplo.cl</div>
              <br />
              <div className="text-xs text-muted-foreground">
                Certificación • RUT: 00.000.000-0
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">¿Necesitas Enviar un Email?</h3>
            <p className="text-muted-foreground mb-4">
              Utiliza nuestros canales oficiales para una comunicación profesional y documentada.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="gap-2">
                <Mail className="w-5 h-5" />
                Nuevo Email
              </Button>
              <Button variant="outline" className="gap-2">
                <Send className="w-5 h-5" />
                Ver Plantillas
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
