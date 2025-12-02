"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Clock, User, Zap, CheckCircle, Send, MessageSquare } from "lucide-react"

export default function WhatsAppPage() {
  const whatsappContacts: never[] = []

  const commonQueries: never[] = []

  const recentConversations: never[] = []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">WhatsApp Business</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comunicación directa y personalizada con nuestros clientes. Atención rápida y eficiente.
            </p>
          </div>
        </div>

        {/* WhatsApp Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {whatsappContacts.map((contact, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      contact.status === 'online' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div>
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.type}</p>
                    </div>
                  </div>
                  <Button className="bg-success hover:bg-success/90 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono">{contact.number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{contact.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span>Respuesta: {contact.response}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Mensajes Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonQueries.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-medium mb-3">{category.category}</h3>
                    <div className="space-y-2">
                      {category.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          className="w-full text-left p-3 border rounded-lg hover:bg-muted transition-colors text-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversaciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentConversations.map((conversation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        conversation.status === 'active' ? 'bg-success' :
                        conversation.status === 'waiting' ? 'bg-warning' : 'bg-muted'
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{conversation.client}</div>
                        <div className="text-xs text-muted-foreground">{conversation.topic}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{conversation.time}</div>
                      <Badge variant={
                        conversation.status === 'active' ? 'default' :
                        conversation.status === 'waiting' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {conversation.status === 'active' ? 'Activa' :
                         conversation.status === 'waiting' ? 'Esperando' : 'Cerrada'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Features */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Características de WhatsApp Business</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Respuesta Automática</h3>
                <p className="text-sm text-muted-foreground">
                  Mensajes automáticos fuera del horario laboral y bienvenidas personalizadas.
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-info" />
                </div>
                <h3 className="font-medium mb-2">Etiquetas y Categorías</h3>
                <p className="text-sm text-muted-foreground">
                  Organiza conversaciones por tipo de consulta o cliente para mejor seguimiento.
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-medium mb-2">Mensajes Masivos</h3>
                <p className="text-sm text-muted-foreground">
                  Envía actualizaciones importantes a grupos de clientes de manera eficiente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">¿Necesitas Ayuda?</h3>
            <p className="text-muted-foreground mb-4">
              Nuestros asesores están disponibles para resolver todas tus consultas técnicas y comerciales.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-success hover:bg-success/90 gap-2">
                <MessageCircle className="w-5 h-5" />
                Iniciar Chat
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="w-5 h-5" />
                Llamar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
