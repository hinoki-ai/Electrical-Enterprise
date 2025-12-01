"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { formatCLP, getProjectTypeLabel } from "@/lib/utils"

const projectTypes = ["residential", "commercial", "industrial", "renovation", "emergency", "regularization"] as const

export default function NewQuotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get("client") as Id<"clients"> | null

  const clients = useQuery(api.clients.list)
  const templates = useQuery(api.templates.list)
  const createQuote = useMutation(api.quotes.create)
  const createClient = useMutation(api.clients.create)

  const [step, setStep] = useState<"client" | "project" | "items">("client")
  const [clientSearch, setClientSearch] = useState("")
  const [selectedClientId, setSelectedClientId] = useState<Id<"clients"> | null>(preselectedClientId)
  const [isNewClient, setIsNewClient] = useState(false)

  // New client form
  const [newClientName, setNewClientName] = useState("")
  const [newClientRut, setNewClientRut] = useState("")
  const [newClientPhone, setNewClientPhone] = useState("")
  const [newClientEmail, setNewClientEmail] = useState("")
  const [newClientAddress, setNewClientAddress] = useState("")

  // Project form
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]>("residential")
  const [projectDescription, setProjectDescription] = useState("")
  const [location, setLocation] = useState("Pinto, Ñuble, Chile")

  // Items
  const [items, setItems] = useState<
    {
      id: string
      name: string
      description: string
      value: number
      category: string
      isOptional: boolean
      isIncluded: boolean
    }[]
  >([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedClient = clients?.find((c) => c._id === selectedClientId)
  const filteredClients = clients?.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.rut?.toLowerCase().includes(clientSearch.toLowerCase()),
  )

  const selectedTemplate = templates?.find((t) => t.projectType === projectType && t.isDefault)

  const handleSelectClient = (clientId: Id<"clients">) => {
    setSelectedClientId(clientId)
    setIsNewClient(false)
    setStep("project")
  }

  const handleCreateNewClient = async () => {
    if (!newClientName.trim()) {
      toast.error("Ingresa el nombre del cliente")
      return
    }

    try {
      const clientId = await createClient({
        name: newClientName,
        rut: newClientRut || undefined,
        phone: newClientPhone || undefined,
        email: newClientEmail || undefined,
        address: newClientAddress || undefined,
      })
      setSelectedClientId(clientId)
      setIsNewClient(false)
      setStep("project")
      toast.success("Cliente creado")
    } catch {
      toast.error("Error al crear cliente")
    }
  }

  const handleLoadTemplate = () => {
    if (selectedTemplate) {
      setItems(
        selectedTemplate.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          value: item.defaultValue,
          category: item.category || "",
          isOptional: item.isOptional,
          isIncluded: !item.isOptional,
        })),
      )
    }
  }

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        name: "",
        description: "",
        value: 0,
        category: "",
        isOptional: false,
        isIncluded: true,
      },
    ])
  }

  const handleUpdateItem = (id: string, field: string, value: string | number | boolean) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const totalValue = items.filter((i) => i.isIncluded).reduce((sum, i) => sum + i.value, 0)

  const handleCreateQuote = async (asDraft: boolean) => {
    if (!selectedClientId || !selectedClient) {
      toast.error("Selecciona un cliente")
      return
    }
    if (!projectName.trim()) {
      toast.error("Ingresa el nombre del proyecto")
      return
    }
    if (items.length === 0) {
      toast.error("Agrega al menos una partida")
      return
    }

    setIsSubmitting(true)
    try {
      const quoteId = await createQuote({
        clientId: selectedClientId,
        clientName: selectedClient.name,
        clientRut: selectedClient.rut,
        projectName,
        projectType,
        location,
        description: projectDescription,
        totalValue,
        plan:
          totalValue < 1000000
            ? "basic"
            : totalValue < 5000000
              ? "standard"
              : totalValue < 15000000
                ? "premium"
                : "enterprise",
        status: asDraft ? "draft" : "sent",
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          description: i.description || undefined,
          value: i.value,
          category: i.category || undefined,
          isOptional: i.isOptional,
          isIncluded: i.isIncluded,
        })),
      })

      toast.success(asDraft ? "Borrador guardado" : "Cotización creada")
      router.push(`/quote/${quoteId}`)
    } catch {
      toast.error("Error al crear cotización")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-lg">Nueva Cotización</h1>
            <p className="text-sm text-muted-foreground">
              Paso {step === "client" ? "1" : step === "project" ? "2" : "3"} de 3
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Step 1: Client Selection */}
        {step === "client" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o RUT..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                  {filteredClients?.map((client) => (
                    <button
                      key={client._id}
                      onClick={() => handleSelectClient(client._id)}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div>
                        <p className="font-medium">{client.name}</p>
                        {client.rut && <p className="text-sm text-muted-foreground">{client.rut}</p>}
                      </div>
                      <p className="text-sm text-muted-foreground">{client.totalProjects} proyectos</p>
                    </button>
                  ))}
                </div>

                <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => setIsNewClient(true)}>
                  <Plus className="w-4 h-4" />
                  Nuevo Cliente
                </Button>
              </CardContent>
            </Card>

            {isNewClient && (
              <Card>
                <CardHeader>
                  <CardTitle>Nuevo Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre *</Label>
                      <Input
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>R.U.T.</Label>
                      <Input
                        value={newClientRut}
                        onChange={(e) => setNewClientRut(e.target.value)}
                        placeholder="12.345.678-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input
                        value={newClientPhone}
                        onChange={(e) => setNewClientPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                        placeholder="email@ejemplo.cl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input
                      value={newClientAddress}
                      onChange={(e) => setNewClientAddress(e.target.value)}
                      placeholder="Dirección completa"
                    />
                  </div>
                  <Button onClick={handleCreateNewClient} className="w-full">
                    Crear Cliente y Continuar
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === "project" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cliente:</p>
                  <p className="font-medium">{selectedClient?.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre del Proyecto *</Label>
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Ej: Recableado Completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Proyecto</Label>
                    <Select value={projectType} onValueChange={(v) => setProjectType(v as typeof projectType)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {getProjectTypeLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Pinto, Ñuble, Chile"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descripción del Proyecto</Label>
                  <Textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe el alcance del trabajo..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep("client")}>
                    Atrás
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedTemplate && items.length === 0) {
                        handleLoadTemplate()
                      }
                      setStep("items")
                    }}
                    className="flex-1"
                  >
                    Continuar a Partidas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Items */}
        {step === "items" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Partidas y Costos</CardTitle>
                {selectedTemplate && items.length === 0 && (
                  <Button variant="outline" size="sm" onClick={handleLoadTemplate}>
                    Cargar Plantilla
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nombre</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                          placeholder="Nombre de la partida"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Valor</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={item.value || ""}
                            onChange={(e) => handleUpdateItem(item.id, "value", Math.max(0, Number.parseInt(e.target.value) || 0))}
                            placeholder="0"
                            className="pr-12"
                          />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                            <button
                              onClick={() => handleUpdateItem(item.id, "value", (item.value || 0) + 10000)}
                              className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-1 rounded"
                              title="+10.000"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleUpdateItem(item.id, "value", Math.max(0, (item.value || 0) - 10000))}
                              className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-1 rounded"
                              title="-10.000"
                            >
                              −
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Total</Label>
                        <div className="flex items-center h-9 px-3 border rounded-md bg-muted text-sm font-medium text-green-600">
                          {formatCLP(item.value || 0)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Descripción</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                        placeholder="Descripción detallada..."
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={item.isOptional}
                          onChange={(e) => handleUpdateItem(item.id, "isOptional", e.target.checked)}
                          className="rounded"
                        />
                        Opcional
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={item.isIncluded}
                          onChange={(e) => handleUpdateItem(item.id, "isIncluded", e.target.checked)}
                          className="rounded"
                        />
                        Incluido
                      </label>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={handleAddItem}>
                  <Plus className="w-4 h-4" />
                  Agregar Partida
                </Button>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCLP(totalValue)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setStep("project")}>
                    Atrás
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCreateQuote(true)}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Guardar Borrador
                  </Button>
                  <Button onClick={() => handleCreateQuote(false)} disabled={isSubmitting} className="flex-1">
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Crear Cotización
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
