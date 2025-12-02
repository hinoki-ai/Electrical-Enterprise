"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Plus, Phone, ChevronDown, Sparkles, Calculator, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCLP, getProjectTypeLabel, getPlanLabel } from "@/lib/utils"
import { loadSettings } from "@/lib/settings"
import { toast } from "sonner"
import Link from "next/link"

const projectTypes = ["residential", "commercial", "industrial", "renovation", "emergency", "regularization"] as const
type ProjectType = (typeof projectTypes)[number]

const plans = ["basic", "standard", "premium", "enterprise"] as const
type Plan = (typeof plans)[number]

function suggestPlan(value: number): Plan {
  if (value < 1000000) return "basic"
  if (value < 5000000) return "standard"
  if (value < 15000000) return "premium"
  return "enterprise"
}

export function QuickQuote() {
  const router = useRouter()
  const clients = useQuery(api.clients.list)
  const createQuote = useMutation(api.quotes.create)
  const createClient = useMutation(api.clients.create)

  // Load settings for defaults
  const settings = typeof window !== "undefined" ? loadSettings() : null

  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [showPhone, setShowPhone] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState<ProjectType>(
    (settings?.defaultProjectType as ProjectType) || "residential"
  )
  const [value, setValue] = useState("")
  const [plan, setPlan] = useState<Plan>("standard")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const numericValue = Number.parseInt(value.replace(/\D/g, "")) || 0
  const suggestedPlan = suggestPlan(numericValue)

  const matchingClient = clients?.find((c) => c.name.toLowerCase().includes(clientName.toLowerCase()))

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "")
    setValue(raw)
    if (raw) {
      setPlan(suggestPlan(Number.parseInt(raw)))
    }
  }

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setClientName(name)

    // Auto-fill from existing client
    if (matchingClient?.phone && !clientPhone) {
      setClientPhone(matchingClient.phone)
    }
  }

  const handleCreateQuote = async (asDraft = false) => {
    if (!clientName.trim() || !projectName.trim() || numericValue <= 0) {
      toast.error("Completa todos los campos requeridos")
      return
    }

    setIsSubmitting(true)
    try {
      let clientId = matchingClient?._id

      // Create client if doesn't exist
      if (!clientId) {
        clientId = await createClient({
          name: clientName,
          phone: clientPhone || undefined,
        })
      }

      const quoteId = await createQuote({
        clientId,
        clientName,
        projectName,
        projectType,
        location: "Pinto, Ñuble, Chile",
        totalValue: numericValue,
        plan,
        status: asDraft ? "draft" : "sent",
        items: [
          {
            id: "main",
            name: projectName,
            value: numericValue,
            isOptional: false,
            isIncluded: true,
          },
        ],
      })

      toast.success(asDraft ? "Borrador guardado" : "Cotización creada")

      // Reset form
      setClientName("")
      setClientPhone("")
      setProjectName("")
      setValue("")
      setPlan("standard")
      setShowPhone(false)

      // Navigate to quote editor
      router.push(`/quote/${quoteId}`)
    } catch {
      toast.error("Error al crear cotización")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-2 border-dashed border-accent/30 bg-gradient-to-br from-card to-accent/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Plus className="w-4 h-4 text-accent" />
          </div>
          Cotización Rápida
          <span className="ml-auto text-xs font-normal text-muted-foreground">~60 segundos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Client */}
          <div className="space-y-2">
            <Label htmlFor="client">Cliente</Label>
            <div className="flex gap-2">
              <Input
                id="client"
                placeholder="Nombre del cliente"
                value={clientName}
                onChange={handleClientChange}
                className="flex-1"
                list="client-suggestions"
              />
              <datalist id="client-suggestions">
                {clients?.map((c) => (
                  <option key={c._id} value={c.name} />
                ))}
              </datalist>
              <Button
                type="button"
                variant={showPhone ? "secondary" : "outline"}
                size="icon"
                onClick={() => setShowPhone(!showPhone)}
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
            {showPhone && (
              <Input
                placeholder="+56 9 1234 5678"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            )}
            {matchingClient && clientName && (
              <p className="text-xs text-muted-foreground">
                Cliente existente: {matchingClient.totalProjects} proyectos
              </p>
            )}
          </div>

          {/* Project */}
          <div className="space-y-2">
            <Label htmlFor="project">Proyecto</Label>
            <div className="flex gap-2">
              <Input
                id="project"
                placeholder="Nombre del proyecto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1 min-w-[100px] bg-transparent">
                    {getProjectTypeLabel(projectType).slice(0, 3)}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {projectTypes.map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setProjectType(type)}>
                      {getProjectTypeLabel(type)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Value & Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="value">Valor del Proyecto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="value"
                placeholder="0"
                value={numericValue ? numericValue.toLocaleString("es-CL") : ""}
                onChange={handleValueChange}
                className="pl-7 font-mono"
              />
            </div>
            {numericValue > 0 && suggestedPlan !== plan && (
              <p className="text-xs text-accent flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Sugerencia: {getPlanLabel(suggestedPlan)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Plan</Label>
            <div className="flex gap-1">
              {plans.map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant={plan === p ? "default" : "outline"}
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setPlan(p)}
                >
                  {getPlanLabel(p)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Actions */}
        {numericValue > 0 && (
          <div className="pt-2 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-bold text-lg">{formatCLP(numericValue)}</span>
              <span className="text-muted-foreground ml-2">({formatCLP(Math.round(numericValue / 12))}/mes)</span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none bg-transparent"
                onClick={() => handleCreateQuote(true)}
                disabled={isSubmitting}
              >
                Guardar Borrador
              </Button>
              <Button
                className="flex-1 sm:flex-none gap-2"
                onClick={() => handleCreateQuote(false)}
                disabled={isSubmitting}
              >
                <Calculator className="w-4 h-4" />
                Generar Cotización
              </Button>
            </div>
          </div>
        )}

        {/* Advanced option */}
        <div className="pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground" asChild>
            <Link href="/quote/new">
              <FileText className="w-4 h-4" />
              Cotización Avanzada con Partidas
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
