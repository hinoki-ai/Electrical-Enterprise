"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
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

// Default settings (darkMode removed since it's handled by theme system)
const DEFAULT_SETTINGS = {
  notifications: true,
  autoSave: true,
  defaultCurrency: "CLP",
  includeVAT: true,
  defaultPaymentType: "monthly",
  defaultProjectType: "residential",
  defaultComplexity: "medium",
  defaultMaterialQuality: "standard",
}

// Load settings from localStorage
function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const saved = localStorage.getItem("electriquote_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // Fall through to defaults
  }
  return DEFAULT_SETTINGS
}

export function SettingsDialog({ children }: SettingsDialogProps) {
  const { logout } = useAuth()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isRestoringDefaults, setIsRestoringDefaults] = useState(false)

  // Load settings from localStorage on mount
  const loadedSettings = typeof window !== "undefined" ? loadSettings() : DEFAULT_SETTINGS
  const [notifications, setNotifications] = useState(loadedSettings.notifications)
  const [autoSave, setAutoSave] = useState(loadedSettings.autoSave)
  const [defaultCurrency, setDefaultCurrency] = useState(loadedSettings.defaultCurrency)
  const [includeVAT, setIncludeVAT] = useState(loadedSettings.includeVAT)
  const [defaultPaymentType, setDefaultPaymentType] = useState(loadedSettings.defaultPaymentType)
  const [defaultProjectType, setDefaultProjectType] = useState(loadedSettings.defaultProjectType)
  const [defaultComplexity, setDefaultComplexity] = useState(loadedSettings.defaultComplexity)
  const [defaultMaterialQuality, setDefaultMaterialQuality] = useState(loadedSettings.defaultMaterialQuality)

  // Application settings - use resolvedTheme which handles 'system' theme properly
  const darkMode = resolvedTheme === 'dark' || (theme !== undefined && theme !== 'system' && theme === 'dark')

  // Track changes to detect unsaved changes
  const checkForChanges = useCallback(() => {
    if (typeof window === "undefined") return
    const current = {
      notifications,
      autoSave,
      defaultCurrency,
      includeVAT,
      defaultPaymentType,
      defaultProjectType,
      defaultComplexity,
      defaultMaterialQuality,
    }
    const saved = loadSettings()
    const hasChanges = JSON.stringify(current) !== JSON.stringify(saved)
    setHasUnsavedChanges(hasChanges)
  }, [notifications, autoSave, defaultCurrency, includeVAT, defaultPaymentType, defaultProjectType, defaultComplexity, defaultMaterialQuality])

  // Check for changes after state updates (using requestAnimationFrame to avoid effect warnings)
  useEffect(() => {
    if (typeof window === "undefined") return
    const rafId = requestAnimationFrame(() => {
      checkForChanges()
    })
    return () => cancelAnimationFrame(rafId)
  }, [notifications, autoSave, defaultCurrency, includeVAT, defaultPaymentType, defaultProjectType, defaultComplexity, defaultMaterialQuality, checkForChanges])

  // Wrapped setters that track changes
  const updateNotification = useCallback((value: boolean) => {
    setNotifications(value)
  }, [])

  const updateAutoSave = useCallback((value: boolean) => {
    setAutoSave(value)
  }, [])

  const updateDefaultCurrency = useCallback((value: string) => {
    setDefaultCurrency(value)
  }, [])

  const updateIncludeVAT = useCallback((value: boolean) => {
    setIncludeVAT(value)
  }, [])

  const updateDefaultPaymentType = useCallback((value: string) => {
    setDefaultPaymentType(value)
  }, [])

  const updateDefaultProjectType = useCallback((value: string) => {
    setDefaultProjectType(value)
  }, [])

  const updateDefaultComplexity = useCallback((value: string) => {
    setDefaultComplexity(value)
  }, [])

  const updateDefaultMaterialQuality = useCallback((value: string) => {
    setDefaultMaterialQuality(value)
  }, [])

  const handleSave = () => {
    // Save settings to localStorage (darkMode handled by theme system)
    const settings = {
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
    // Reset to defaults (darkMode handled by theme system)
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

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reload settings when dialog closes without saving
      const reloaded = loadSettings()
      setNotifications(reloaded.notifications)
      setAutoSave(reloaded.autoSave)
      setDefaultCurrency(reloaded.defaultCurrency)
      setIncludeVAT(reloaded.includeVAT)
      setDefaultPaymentType(reloaded.defaultPaymentType)
      setDefaultProjectType(reloaded.defaultProjectType)
      setDefaultComplexity(reloaded.defaultComplexity)
      setDefaultMaterialQuality(reloaded.defaultMaterialQuality)
      setHasUnsavedChanges(false)
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                  <Switch
                    checked={darkMode}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? 'dark' : 'light')
                    }}
                  />
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
                  <Switch checked={notifications} onCheckedChange={updateNotification} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Guardado Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Guarda automáticamente los cambios en las cotizaciones
                    </p>
                  </div>
                  <Switch checked={autoSave} onCheckedChange={updateAutoSave} />
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
                  <Select value={defaultCurrency} onValueChange={updateDefaultCurrency}>
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
                  <Switch checked={includeVAT} onCheckedChange={updateIncludeVAT} />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Pago por Defecto</Label>
                  <Select value={defaultPaymentType} onValueChange={updateDefaultPaymentType}>
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
                  <Select value={defaultProjectType} onValueChange={updateDefaultProjectType}>
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
                  <Select value={defaultComplexity} onValueChange={updateDefaultComplexity}>
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
                  <Select value={defaultMaterialQuality} onValueChange={updateDefaultMaterialQuality}>
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
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
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
