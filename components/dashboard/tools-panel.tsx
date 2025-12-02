"use client"

import {
  FileText,
  BarChart3,
  LineChart,
  HardDrive,
  Book,
  Scale,
  Tag,
  FileSignature,
  Phone,
  MessageCircle,
  Mail,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const tools = [
  { icon: FileText, label: "Plantillas", color: "text-primary", href: "/templates" },
  { icon: BarChart3, label: "Reportes", color: "text-info", href: "/reports" },
  { icon: LineChart, label: "Analytics", color: "text-success", href: "/reports" },
  { icon: HardDrive, label: "Backup", color: "text-muted-foreground", href: "/backup" },
]

const resources = [
  { icon: Book, label: "Guía Precios", color: "text-accent", href: "/resources/price-guide" },
  { icon: Scale, label: "Normativas", color: "text-primary", href: "/resources/regulations" },
  { icon: Tag, label: "Materiales", color: "text-warning", href: "/resources/materials" },
  { icon: FileSignature, label: "Contratos", color: "text-info", href: "/resources/contracts" },
]

const support = [
  { icon: Phone, label: "Emergencia", color: "text-destructive", href: "/support/emergency" },
  { icon: MessageCircle, label: "WhatsApp", color: "text-success", href: "/support/whatsapp" },
  { icon: Mail, label: "Email", color: "text-info", href: "/support/email" },
  { icon: HelpCircle, label: "Ayuda", color: "text-muted-foreground", href: "/support/help" },
]

export function ToolsPanel() {
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Herramientas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Herramientas</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {tools.map((item) => (
              <Button 
                key={item.label} 
                variant="outline" 
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recursos</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {resources.map((item) => (
              <Button 
                key={item.label} 
                variant="outline" 
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Soporte</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {support.map((item) => (
              <Button 
                key={item.label} 
                variant="outline" 
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
