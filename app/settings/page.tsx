"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Palette, Database, Zap, Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en ElectriQuote</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" defaultValue="Agustín Arancibia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" defaultValue="agustin@electriquote.cl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" defaultValue="ElectriQuote Solutions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input id="rut" defaultValue="12.345.678-9" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Configuración de Negocio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda Predeterminada</Label>
                  <Select defaultValue="clp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clp">CLP - Peso Chileno</SelectItem>
                      <SelectItem value="usd">USD - Dólar Americano</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iva">IVA Predeterminado (%)</Label>
                  <Input id="iva" type="number" defaultValue="19" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="markup">Margen Predeterminado (%)</Label>
                  <Input id="markup" type="number" defaultValue="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warranty">Garantía Estándar (meses)</Label>
                  <Input id="warranty" type="number" defaultValue="12" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Cotizaciones Nuevas</div>
                    <div className="text-sm text-muted-foreground">Recibir notificaciones de nuevas cotizaciones</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Recordatorios de Seguimiento</div>
                    <div className="text-sm text-muted-foreground">Recordatorios para contactar clientes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Actualizaciones del Sistema</div>
                    <div className="text-sm text-muted-foreground">Nuevas funcionalidades y mejoras</div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notificaciones por Email</div>
                    <div className="text-sm text-muted-foreground">Recibir correos electrónicos</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Datos y Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Backup Automático</div>
                    <div className="text-sm text-muted-foreground">Respaldar datos automáticamente</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Analytics</div>
                    <div className="text-sm text-muted-foreground">Ayudar a mejorar la aplicación</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
