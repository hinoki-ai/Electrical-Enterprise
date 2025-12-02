"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Award, Briefcase, Shield, Camera, Edit, Save } from "lucide-react"

export default function ProfilePage() {
  const certifications: never[] = []

  const experience: never[] = []

  const achievements: never[] = []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y profesional</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-lg">AA</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-1/2 translate-x-12 w-8 h-8 rounded-full">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <h2 className="text-xl font-bold mb-1">Usuario</h2>
                <p className="text-muted-foreground mb-3">Perfil</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-success" />
                    <span>Certificado</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>Experiencia</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-warning" />
                    <span>Satisfacción</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Proyectos Completados</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">$0</div>
                  <div className="text-xs text-muted-foreground">Valor Total Proyectos</div>
                </div>
                <div className="text-center p-3 bg-info/10 rounded-lg">
                  <div className="text-2xl font-bold text-info">0%</div>
                  <div className="text-xs text-muted-foreground">Tasa de Éxito</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rut">RUT</Label>
                    <Input id="rut" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                    <Input id="birthdate" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" />
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{cert.name}</div>
                          <div className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</div>
                        </div>
                      </div>
                      <Badge variant={cert.status === 'active' ? 'default' : 'secondary'}>
                        {cert.status === 'active' ? 'Activa' : 'Expirada'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Experiencia Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-sm">{exp.position}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                        <Badge variant="outline">{exp.type === 'full-time' ? 'Tiempo Completo' : 'Contrato'}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                      {index < experience.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Logros y Reconocimientos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-warning" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                        <Badge variant="outline" className="text-xs">{achievement.year}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Notificaciones por Email</div>
                      <div className="text-xs text-muted-foreground">Recibir actualizaciones y recordatorios</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Privacidad de Datos</div>
                      <div className="text-xs text-muted-foreground">Controlar quién ve tu información</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Gestionar
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Cambiar Contraseña</div>
                      <div className="text-xs text-muted-foreground">Actualizar tu contraseña de acceso</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Cambiar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
