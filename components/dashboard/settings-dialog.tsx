"use client"

import { useState } from "react"
import { Settings, Palette, Bell, Building2, Calculator, Save, RotateCcw, LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-context"
import { getCurrencyLabel, getPaymentTypeLabel, getProjectTypeLabel, getProjectSizeLabel, getMaterialQualityLabel } from "@/lib/utils"

interface SettingsDialogProps {
  children: React.ReactNode
}

export function SettingsDialog({ children }: SettingsDialogProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isRestoringDefaults, setIsRestoringDefaults] = useState(false)

  // Application settings
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  // Business settings
  const [defaultCurrency, setDefaultCurrency] = useState("CLP")
  const [includeVAT, setIncludeVAT] = useState(true)
  const [defaultPaymentType, setDefaultPaymentType] = useState("monthly")

  // Project defaults
  const [defaultProjectType, setDefaultProjectType] = useState("residential")
  const [defaultComplexity, setDefaultComplexity] = useState("medium")
  const [defaultMaterialQuality, setDefaultMaterialQuality] = useState("standard")

  // Default settings
  const DEFAULT_SETTINGS = {
    darkMode: false,
    notifications: true,
    autoSave: true,
    defaultCurrency: "CLP",
    includeVAT: true,
    defaultPaymentType: "monthly",
    defaultProjectType: "residential",
    defaultComplexity: "medium",
    defaultMaterialQuality: "standard",
  }

  const handleSave = () => {
    // Save settings to localStorage
    const settings = {
      darkMode,
      notifications,
      autoSave,
      defaultCurrency,
      includeVAT,
      defaultPaymentType,
      defaultProjectType,
      defaultComplexity,
      defaultMaterialQuality,
    }

    localStorage.setItem("electriquote_settings", JSON.stringify(settings))
    toast.success("Configuración guardada exitosamente")
    setHasUnsavedChanges(false)
    setIsOpen(false)
  }

  const handleRestoreDefaults = () => {
    // Reset to defaults
    setDarkMode(DEFAULT_SETTINGS.darkMode)
    setNotifications(DEFAULT_SETTINGS.notifications)
    setAutoSave(DEFAULT_SETTINGS.autoSave)
    setDefaultCurrency(DEFAULT_SETTINGS.defaultCurrency)
    setIncludeVAT(DEFAULT_SETTINGS.includeVAT)
    setDefaultPaymentType(DEFAULT_SETTINGS.defaultPaymentType)
    setDefaultProjectType(DEFAULT_SETTINGS.defaultProjectType)
    setDefaultComplexity(DEFAULT_SETTINGS.defaultComplexity)
    setDefaultMaterialQuality(DEFAULT_SETTINGS.defaultMaterialQuality)
    localStorage.removeItem("electriquote_settings")
    setHasUnsavedChanges(false)
    setIsRestoringDefaults(false)
    toast.success("Configuración restaurada a valores por defecto")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración de la Aplicación
          </DialogTitle>
          <DialogDescription>
            Personaliza tu experiencia y configura las preferencias por defecto
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full min-w-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="business">Negocio</TabsTrigger>
            <TabsTrigger value="defaults">Por Defecto</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 min-w-0 w-full">
            <Card className="w-full min-w-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Apariencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Cambia al tema oscuro para una experiencia más cómoda
                    </p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>

            <Card className="w-full min-w-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones sobre cotizaciones y clientes
                    </p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Guardado Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Guarda automáticamente los cambios en las cotizaciones
                    </p>
                  </div>
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-4 min-w-0 w-full">
            <Card className="w-full min-w-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Configuración Empresarial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 min-w-0">
                <div className="space-y-2">
                  <Label>Moneda por Defecto</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger>
                      <SelectValue>{getCurrencyLabel(defaultCurrency)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLP">Peso Chileno (CLP)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incluir IVA (19%)</Label>
                    <p className="text-sm text-muted-foreground">
                      Agregar IVA automáticamente a las cotizaciones
                    </p>
                  </div>
                  <Switch checked={includeVAT} onCheckedChange={setIncludeVAT} />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Pago por Defecto</Label>
                  <Select value={defaultPaymentType} onValueChange={setDefaultPaymentType}>
                    <SelectTrigger>
                      <SelectValue>{getPaymentTypeLabel(defaultPaymentType)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Pago Mensual</SelectItem>
                      <SelectItem value="upfront">Pago Anticipado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defaults" className="space-y-4 min-w-0 w-full">
            <Card className="w-full min-w-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Valores por Defecto para Proyectos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 min-w-0">
                <div className="space-y-2">
                  <Label>Tipo de Proyecto</Label>
                  <Select value={defaultProjectType} onValueChange={setDefaultProjectType}>
                    <SelectTrigger>
                      <SelectValue>{getProjectTypeLabel(defaultProjectType)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residencial</SelectItem>
                      <SelectItem value="commercial">Comercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="renovation">Renovación</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                      <SelectItem value="regularization">Regularización</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Complejidad del Proyecto</Label>
                  <Select value={defaultComplexity} onValueChange={setDefaultComplexity}>
                    <SelectTrigger>
                      <SelectValue>{getProjectSizeLabel(defaultComplexity)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeño</SelectItem>
                      <SelectItem value="medium">Mediano</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                      <SelectItem value="complex">Complejo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Calidad de Materiales</Label>
                  <Select value={defaultMaterialQuality} onValueChange={setDefaultMaterialQuality}>
                    <SelectTrigger>
                      <SelectValue>{getMaterialQualityLabel(defaultMaterialQuality)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica</SelectItem>
                      <SelectItem value="standard">Estándar</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Lujo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex justify-between flex-wrap gap-2 min-w-0 w-full">
          <div className="flex gap-2 flex-wrap min-w-0">
            <AlertDialog open={isRestoringDefaults} onOpenChange={setIsRestoringDefaults}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <RotateCcw className="w-4 h-4" />
                  Restaurar Valores por Defecto
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Restaurar valores por defecto?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción restablecerá todas las configuraciones a sus valores originales.
                    Los cambios no guardados se perderán.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRestoreDefaults}>
                    Restaurar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="gap-2 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap min-w-0">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 whitespace-nowrap"
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4" />
              {hasUnsavedChanges ? 'Guardar Cambios' : 'Configuración Guardada'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
