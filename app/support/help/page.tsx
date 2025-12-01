"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Search, Book, MessageCircle, Video, FileText, ChevronRight, Lightbulb, Settings, Calculator } from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Calculator,
      title: "Herramientas",
      description: "Calculadoras, conversores y utilidades",
      color: "text-primary",
      articles: 12
    },
    {
      icon: Settings,
      title: "Configuración",
      description: "Personalización y ajustes del sistema",
      color: "text-info",
      articles: 8
    },
    {
      icon: Book,
      title: "Tutoriales",
      description: "Guías paso a paso para principiantes",
      color: "text-success",
      articles: 15
    },
    {
      icon: FileText,
      title: "Documentación",
      description: "Manuales técnicos y referencias",
      color: "text-warning",
      articles: 23
    }
  ]

  const faqs = [
    {
      question: "¿Cómo crear una nueva cotización?",
      answer: "Ve al dashboard principal y haz clic en 'Nueva Cotización'. Completa los datos del cliente y selecciona los materiales necesarios.",
      category: "Cotizaciones"
    },
    {
      question: "¿Dónde encuentro los precios actualizados?",
      answer: "Los precios se actualizan automáticamente desde la sección 'Recursos > Guía de Precios'. Puedes filtrar por categoría y fecha.",
      category: "Precios"
    },
    {
      question: "¿Cómo exportar una cotización a PDF?",
      answer: "Una vez creada la cotización, haz clic en 'Exportar' y selecciona 'PDF'. El documento se generará automáticamente.",
      category: "Exportación"
    },
    {
      question: "¿Cómo gestionar el inventario de materiales?",
      answer: "Ve a 'Recursos > Materiales' donde podrás agregar, editar y controlar el stock de todos tus insumos.",
      category: "Inventario"
    }
  ]

  const quickGuides = [
    {
      title: "Primeros Pasos en ElectriQuote",
      description: "Guía completa para nuevos usuarios",
      duration: "5 min",
      level: "Principiante"
    },
    {
      title: "Creando tu Primera Cotización",
      description: "Tutorial paso a paso para cotizaciones",
      duration: "8 min",
      level: "Intermedio"
    },
    {
      title: "Gestión Avanzada de Clientes",
      description: "Técnicas para organizar tu cartera",
      duration: "12 min",
      level: "Avanzado"
    },
    {
      title: "Reportes y Analytics",
      description: "Cómo interpretar tus métricas de negocio",
      duration: "10 min",
      level: "Intermedio"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Centro de Ayuda</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas, tutoriales y guías para aprovechar al máximo ElectriQuote.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar en la ayuda..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="font-medium mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <Badge variant="secondary">{category.articles} artículos</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{faq.question}</h3>
                      <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Guides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Guías Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickGuides.map((guide, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Video className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{guide.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{guide.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{guide.duration}</span>
                        <Badge variant="outline" className="text-xs">{guide.level}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              ¿No encontraste lo que buscas?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-medium mb-2">Chat en Vivo</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Conecta con nuestro equipo de soporte técnico en tiempo real.
                </p>
                <Button variant="outline" className="w-full">
                  Iniciar Chat
                </Button>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Preguntas Frecuentes</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Explora nuestra base de conocimientos con respuestas detalladas.
                </p>
                <Button variant="outline" className="w-full">
                  Ver FAQs
                </Button>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mx-auto mb-3">
                  <Book className="w-6 h-6 text-info" />
                </div>
                <h3 className="font-medium mb-2">Documentación</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Manuales técnicos completos y guías de referencia.
                </p>
                <Button variant="outline" className="w-full">
                  Ver Documentos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Tricks */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Consejos y Trucos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">💡 Productividad</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Usa plantillas para cotizaciones recurrentes</li>
                  <li>• Configura recordatorios automáticos para seguimientos</li>
                  <li>• Exporta datos semanalmente para backup</li>
                  <li>• Utiliza filtros para encontrar clientes rápidamente</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">🔧 Optimización</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Mantén actualizado el catálogo de materiales</li>
                  <li>• Revisa precios semanalmente</li>
                  <li>• Organiza clientes por etiquetas</li>
                  <li>• Utiliza reportes para identificar oportunidades</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">¿Necesitas Ayuda Personalizada?</h3>
            <p className="text-muted-foreground mb-4">
              Nuestro equipo está aquí para ayudarte. Contáctanos por el canal que prefieras.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Soporte Técnico
              </Button>
              <Button variant="outline" className="gap-2">
                <Book className="w-4 h-4" />
                Tutoriales
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
