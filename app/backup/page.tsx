"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HardDrive, Download, Upload, Clock, CheckCircle, AlertTriangle, Settings, Database, Cloud } from "lucide-react"

interface BackupItem {
  id: string;
  name: string;
  date: string;
  size: string;
  status: 'success' | 'failed';
  type: 'automatic' | 'manual';
}

export default function BackupPage() {
  const [backupLocation, setBackupLocation] = useState("local")
  const [retentionDays, setRetentionDays] = useState("30")

  // Mock data - replace with Convex query when implemented
  const backupHistory: BackupItem[] = [
    {
      id: "1",
      name: "Backup Completo - 2024-12-02",
      date: "02 Dic 2024, 10:30",
      size: "2.4 GB",
      status: "success",
      type: "automatic"
    },
    {
      id: "2",
      name: "Backup Manual - Clientes",
      date: "01 Dic 2024, 15:45",
      size: "850 MB",
      status: "success",
      type: "manual"
    },
    {
      id: "3",
      name: "Backup Completo - 2024-11-30",
      date: "30 Nov 2024, 10:30",
      size: "2.2 GB",
      status: "failed",
      type: "automatic"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Backup y Restauración</h1>
          <p className="text-muted-foreground">Gestiona la seguridad y respaldo de tus datos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Backup Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 flex-col gap-2 bg-primary hover:bg-primary/90">
                    <Download className="w-6 h-6" />
                    <div>
                      <div className="font-medium">Crear Backup</div>
                      <div className="text-xs opacity-90">Respaldar todos los datos</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Upload className="w-6 h-6" />
                    <div>
                      <div className="font-medium">Restaurar</div>
                      <div className="text-xs text-muted-foreground">Restaurar desde backup</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Cloud className="w-6 h-6" />
                    <div>
                      <div className="font-medium">Backup en Nube</div>
                      <div className="text-xs text-muted-foreground">Sincronizar con Google Drive</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Settings className="w-6 h-6" />
                    <div>
                      <div className="font-medium">Configurar</div>
                      <div className="text-xs text-muted-foreground">Ajustes de respaldo</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage Status */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Almacenamiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Espacio Usado</span>
                    <span className="text-sm text-muted-foreground">0 GB / 10 GB</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold">0 GB</div>
                    <div className="text-xs text-muted-foreground">Datos</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold">0</div>
                    <div className="text-xs text-muted-foreground">Backups</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold">10 GB</div>
                    <div className="text-xs text-muted-foreground">Disponible</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup History */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Backups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backupHistory.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          backup.status === 'success'
                            ? 'bg-success/20 text-success'
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {backup.status === 'success' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{backup.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {backup.date} • {backup.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={backup.type === 'automatic' ? 'secondary' : 'outline'} className="text-xs">
                          {backup.type === 'automatic' ? 'Auto' : 'Manual'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Auto Backup Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Backup Automático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Backup Diario</div>
                    <div className="text-xs text-muted-foreground">Todos los días a las 6:00 AM</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Backup Semanal</div>
                    <div className="text-xs text-muted-foreground">Todos los domingos</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Backup Mensual</div>
                    <div className="text-xs text-muted-foreground">Primer día del mes</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Storage Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ubicación de Backups</label>
                  <Select value={backupLocation} onValueChange={setBackupLocation}>
                    <SelectTrigger>
                      <SelectValue>
                        {backupLocation === "local" ? "Disco Local" :
                         backupLocation === "external" ? "Disco Externo" :
                         backupLocation === "cloud" ? "Nube (Google Drive)" : backupLocation}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Disco Local</SelectItem>
                      <SelectItem value="external">Disco Externo</SelectItem>
                      <SelectItem value="cloud">Nube (Google Drive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Retención de Backups</label>
                  <Select value={retentionDays} onValueChange={setRetentionDays}>
                    <SelectTrigger>
                      <SelectValue>
                        {retentionDays === "7" ? "7 días" :
                         retentionDays === "30" ? "30 días" :
                         retentionDays === "90" ? "90 días" :
                         retentionDays === "365" ? "1 año" : retentionDays}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Configurar Ubicación
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Types */}
            <Card>
              <CardHeader>
                <CardTitle>Datos a Respaldar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Cotizaciones", included: true },
                  { label: "Clientes", included: true },
                  { label: "Materiales", included: true },
                  { label: "Plantillas", included: true },
                  { label: "Configuración", included: true },
                  { label: "Reportes", included: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Switch defaultChecked={item.included} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
