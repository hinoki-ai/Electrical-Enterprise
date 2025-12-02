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
import { useDivineParsing } from "@/components/language/ChunkedLanguageProvider"

const tools = [
  { icon: FileText, labelKey: "nav.templates", color: "text-primary", href: "/templates" },
  { icon: BarChart3, labelKey: "nav.reports", color: "text-info", href: "/reports" },
  { icon: LineChart, labelKey: "nav.reports", color: "text-success", href: "/reports" },
  { icon: HardDrive, labelKey: "nav.backup", color: "text-muted-foreground", href: "/backup" },
]

const resources = [
  { icon: Book, labelKey: "nav.price_guide", color: "text-accent", href: "/resources/price-guide" },
  { icon: Scale, labelKey: "nav.regulations", color: "text-primary", href: "/resources/regulations" },
  { icon: Tag, labelKey: "nav.materials", color: "text-warning", href: "/resources/materials" },
  { icon: FileSignature, labelKey: "nav.contracts", color: "text-info", href: "/resources/contracts" },
]

const support = [
  { icon: Phone, labelKey: "nav.emergency", color: "text-destructive", href: "/support/emergency" },
  { icon: MessageCircle, labelKey: "nav.whatsapp", color: "text-success", href: "/support/whatsapp" },
  { icon: Mail, labelKey: "nav.email", color: "text-info", href: "/support/email" },
  { icon: HelpCircle, labelKey: "nav.help", color: "text-muted-foreground", href: "/support/help" },
]

export function ToolsPanel() {
  const router = useRouter()
  const { t } = useDivineParsing(["dashboard"])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("tools_panel.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("tools_panel.title")}</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {tools.map((item) => (
              <Button
                key={item.labelKey}
                variant="outline"
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{t(item.labelKey)}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recursos</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {resources.map((item) => (
              <Button
                key={item.labelKey}
                variant="outline"
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{t(item.labelKey)}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Soporte</span>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {support.map((item) => (
              <Button
                key={item.labelKey}
                variant="outline"
                className="h-auto py-3 flex-col gap-1.5 bg-transparent cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span className="text-[10px]">{t(item.labelKey)}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
