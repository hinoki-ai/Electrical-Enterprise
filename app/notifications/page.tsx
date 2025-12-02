"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, AlertTriangle, Info, DollarSign, User, FileText, Settings, Trash2, CheckCheck } from "lucide-react"

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  icon: typeof Bell;
  read: boolean;
}

export default function NotificationsPage() {
  // Mock data - replace with Convex query when implemented
  const notifications = {
    unread: [
      {
        id: "1",
        title: "Nueva cotización pendiente",
        message: "El cliente Juan Pérez ha solicitado una cotización para proyecto residencial",
        time: "Hace 2 horas",
        priority: "high" as const,
        icon: FileText,
        read: false
      },
      {
        id: "2",
        title: "Pago recibido",
        message: "Se ha registrado el pago de $2.500.000 para la cotización #123",
        time: "Hace 4 horas",
        priority: "medium" as const,
        icon: DollarSign,
        read: false
      }
    ] as NotificationItem[],
    read: [
      {
        id: "3",
        title: "Cliente actualizado",
        message: "Los datos del cliente María González han sido actualizados",
        time: "Ayer",
        priority: "low" as const,
        icon: User,
        read: true
      }
    ] as NotificationItem[]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive/20 bg-destructive/5'
      case 'medium': return 'border-warning/20 bg-warning/5'
      case 'low': return 'border-muted bg-muted/50'
      default: return 'border-muted bg-muted/50'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />
      case 'medium': return <Clock className="w-4 h-4 text-warning" />
      case 'low': return <Info className="w-4 h-4 text-muted-foreground" />
      default: return <Info className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Notificaciones</h1>
              <p className="text-muted-foreground">Mantente al día con todas tus actividades</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <CheckCheck className="w-4 h-4" />
                Marcar todas como leídas
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurar
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="gap-2">
              <Bell className="w-4 h-4" />
              Todas ({notifications.unread.length + notifications.read.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              No leídas ({notifications.unread.length})
            </TabsTrigger>
            <TabsTrigger value="read" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Leídas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Unread Notifications */}
            {notifications.unread.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive"></div>
                    No Leídas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.unread.map((notification) => (
                    <div key={notification.id} className={`p-4 border rounded-lg ${getPriorityColor(notification.priority)}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <notification.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {getPriorityIcon(notification.priority)}
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                          <div className="flex gap-2">
                            <Button size="sm">Ver Detalles</Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Marcar como leída
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Read Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  Leídas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.read.map((notification) => (
                  <div key={notification.id} className="p-4 border rounded-lg opacity-75">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <notification.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-sm text-muted-foreground">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Ver Detalles</Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <Card>
              <CardContent className="space-y-3">
                {notifications.unread.map((notification) => (
                  <div key={notification.id} className={`p-4 border rounded-lg ${getPriorityColor(notification.priority)}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <notification.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-sm">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            {getPriorityIcon(notification.priority)}
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm">Ver Detalles</Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Marcar como leída
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            <Card>
              <CardContent className="space-y-3">
                {notifications.read.map((notification) => (
                  <div key={notification.id} className="p-4 border rounded-lg opacity-75">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <notification.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-sm text-muted-foreground">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Ver Detalles</Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Configuración de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Tipos de Notificaciones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cotizaciones nuevas</span>
                    <Badge variant="default" className="text-xs">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pagos recibidos</span>
                    <Badge variant="default" className="text-xs">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recordatorios</span>
                    <Badge variant="secondary" className="text-xs">Solo email</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Alertas de stock</span>
                    <Badge variant="default" className="text-xs">Activado</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Canales de Comunicación</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notificaciones push</span>
                    <Badge variant="default" className="text-xs">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Correo electrónico</span>
                    <Badge variant="default" className="text-xs">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WhatsApp Business</span>
                    <Badge variant="secondary" className="text-xs">Desactivado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS</span>
                    <Badge variant="secondary" className="text-xs">Desactivado</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="outline">Configurar Notificaciones</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <Bell className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold mb-2">Mantente Actualizado</h3>
              <p className="text-muted-foreground mb-4">
                Configura tus preferencias para recibir solo las notificaciones que te importan.
              </p>
              <div className="flex gap-4 justify-center">
                <Button>Configurar Alertas</Button>
                <Button variant="outline">Marcar Todas como Leídas</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
