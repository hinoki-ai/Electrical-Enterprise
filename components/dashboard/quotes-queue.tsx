"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Mail,
  Phone,
  CheckCircle2,
  Paperclip,
  Wrench,
  BarChart3,
  FileEdit,
  ListPlus,
  MoreHorizontal,
  Trash2,
  Send,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useData, type QuoteStatus, type Quote } from "@/lib/data-context"
import { formatCLP, formatRelativeDate, getProjectTypeLabel } from "@/lib/utils"
import { toast } from "sonner"

const statusConfig: Record<QuoteStatus, { label: string; color: string; icon: React.ReactNode }> = {
  sent: { label: "Enviados", color: "bg-info/20 text-info", icon: <Mail className="w-3 h-3" /> },
  pending: { label: "Pendientes", color: "bg-warning/20 text-warning", icon: <BarChart3 className="w-3 h-3" /> },
  draft: { label: "Borradores", color: "bg-muted text-muted-foreground", icon: <FileEdit className="w-3 h-3" /> },
  approved: { label: "Aprobados", color: "bg-success/20 text-success", icon: <CheckCircle2 className="w-3 h-3" /> },
  rejected: { label: "Rechazados", color: "bg-destructive/20 text-destructive", icon: <Trash2 className="w-3 h-3" /> },
}

export function QuotesQueue() {
  const { quotes, updateQuote, deleteQuote } = useData()
  const [activeTab, setActiveTab] = useState<QuoteStatus>("sent")
  const router = useRouter()

  const filteredQuotes = quotes.filter((q) => q.status === activeTab)
  const counts = {
    sent: quotes.filter((q) => q.status === "sent").length,
    pending: quotes.filter((q) => q.status === "pending").length,
    draft: quotes.filter((q) => q.status === "draft").length,
    approved: quotes.filter((q) => q.status === "approved").length,
    rejected: quotes.filter((q) => q.status === "rejected").length,
  }

  const handleAction = (quoteId: string, action: string) => {
    switch (action) {
      case "approve":
        updateQuote(quoteId, { status: "approved" })
        toast.success("Cotización marcada como aprobada")
        break
      case "send":
        updateQuote(quoteId, { status: "sent", sentAt: new Date() })
        toast.success("Cotización enviada")
        break
      case "delete":
        deleteQuote(quoteId)
        toast.success("Cotización eliminada")
        break
    }
  }

  const handleButtonAction = (quote: Quote, action: string) => {
    switch (action) {
      case "edit":
        router.push(`/quote/${quote.id}`)
        break
      case "call":
        if (quote.clientPhone) {
          window.open(`tel:${quote.clientPhone}`, '_self')
        } else {
          toast.error("No hay número de teléfono disponible")
        }
        break
      case "tracking":
        toast.info("Funcionalidad de seguimiento próximamente disponible")
        break
      case "attachments":
        toast.info("Funcionalidad de adjuntos próximamente disponible")
        break
      case "specs":
        toast.info("Funcionalidad de especificaciones próximamente disponible")
        break
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ListPlus className="w-4 h-4 text-primary" />
          </div>
          Cotizaciones Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as QuoteStatus)}>
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="sent" className="gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Enviados</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {counts.sent}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pendientes</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {counts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="draft" className="gap-1.5">
              <FileEdit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Borradores</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {counts.draft}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Aprobados</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {counts.approved}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {(["sent", "pending", "draft", "approved", "rejected"] as QuoteStatus[]).map((status) => (
            <TabsContent key={status} value={status} className="mt-0">
              {filteredQuotes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay cotizaciones {statusConfig[status].label.toLowerCase()}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">{quote.projectName}</span>
                          <Badge variant="outline" className="shrink-0 text-xs">
                            {getProjectTypeLabel(quote.projectType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="truncate">{quote.clientName}</span>
                          <span>•</span>
                          <span className="font-mono">{formatCLP(quote.value)}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{formatRelativeDate(quote.updatedAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {status === "sent" && (
                          <>
                            <Button size="sm" variant="outline" className="gap-1.5 hidden sm:flex bg-transparent" onClick={() => handleButtonAction(quote, "tracking")}>
                              <Mail className="w-3.5 h-3.5" />
                              Seguimiento
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1.5 hidden sm:flex bg-transparent" onClick={() => handleButtonAction(quote, "call")}>
                              <Phone className="w-3.5 h-3.5" />
                              Llamar
                            </Button>
                          </>
                        )}
                        {status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="gap-1.5 hidden sm:flex bg-transparent" onClick={() => handleButtonAction(quote, "attachments")}>
                              <Paperclip className="w-3.5 h-3.5" />
                              Adjuntos
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1.5 hidden sm:flex bg-transparent" onClick={() => handleButtonAction(quote, "specs")}>
                              <Wrench className="w-3.5 h-3.5" />
                              Specs
                            </Button>
                          </>
                        )}
                        {status === "draft" && (
                          <Button size="sm" variant="outline" className="gap-1.5 hidden sm:flex bg-transparent" onClick={() => handleButtonAction(quote, "edit")}>
                            <FileEdit className="w-3.5 h-3.5" />
                            Editar
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {status === "draft" && (
                              <DropdownMenuItem onClick={() => handleAction(quote.id, "send")}>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar
                              </DropdownMenuItem>
                            )}
                            {(status === "sent" || status === "pending") && (
                              <DropdownMenuItem onClick={() => handleAction(quote.id, "approve")}>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Marcar Aprobado
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleAction(quote.id, "delete")}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
