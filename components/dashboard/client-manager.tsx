"use client"

import { User, Building2, Star, Phone, Mail, Plus, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useData } from "@/lib/data-context"
import { formatCLP, formatRelativeDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

const speedLabels = {
  fast: { label: "Rápido", color: "text-success" },
  medium: { label: "Normal", color: "text-warning" },
  slow: { label: "Lento", color: "text-destructive" },
}

export function ClientManager() {
  const { clients } = useData()

  const sortedClients = [...clients].sort((a, b) => (b.lastContact?.getTime() || 0) - (a.lastContact?.getTime() || 0))

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            Clientes
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-1.5 bg-transparent">
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedClients.map((client) => {
            const isCompany = client.name.includes("SPA") || client.name.includes("Ltda")
            const initials = client.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            return (
              <div
                key={client.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group cursor-pointer"
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback
                    className={cn(
                      "text-sm font-medium",
                      isCompany ? "bg-info/20 text-info" : "bg-primary/20 text-primary",
                    )}
                  >
                    {isCompany ? <Building2 className="w-4 h-4" /> : initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{client.name}</span>
                    <div className="flex items-center shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn("w-3 h-3", i < client.rating ? "fill-accent text-accent" : "text-muted")}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>
                      {client.totalProjects} proyecto{client.totalProjects !== 1 ? "s" : ""}
                    </span>
                    <span className="font-mono">{formatCLP(client.totalValue)}</span>
                    <span className={speedLabels[client.responseSpeed].color}>
                      {speedLabels[client.responseSpeed].label}
                    </span>
                  </div>
                  {client.lastContact && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Último contacto: {formatRelativeDate(client.lastContact)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
