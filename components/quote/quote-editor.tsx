"use client"

import { useState, useMemo } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PDFPreview } from "@/components/pdf/pdf-preview"
import type { PDFQuoteData } from "@/components/pdf/pdf-document"
import { formatCLP, getStatusLabel } from "@/lib/utils"
import { Save, Send, FileText, Plus, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface QuoteEditorProps {
  quote: Doc<"quotes">
  client: Doc<"clients"> | null | undefined
}

export function QuoteEditor({ quote, client }: QuoteEditorProps) {
  const updateQuote = useMutation(api.quotes.update)

  const [items, setItems] = useState(quote.items)
  const [projectName, setProjectName] = useState(quote.projectName)
  const [description, setDescription] = useState(quote.description || "")
  const [notes, setNotes] = useState(quote.notes || "")
  const [isSaving, setIsSaving] = useState(false)

  const totalValue = items.filter((i) => i.isIncluded).reduce((sum, i) => sum + i.value, 0)

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        name: "",
        description: undefined,
        value: 0,
        category: undefined,
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

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateQuote({
        id: quote._id,
        projectName,
        description: description || undefined,
        notes: notes || undefined,
        items,
        totalValue,
      })
      toast.success("Cotización guardada")
    } catch {
      toast.error("Error al guardar")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSend = async () => {
    setIsSaving(true)
    try {
      await updateQuote({
        id: quote._id,
        projectName,
        description: description || undefined,
        notes: notes || undefined,
        items,
        totalValue,
        status: "sent",
      })
      toast.success("Cotización enviada")
    } catch {
      toast.error("Error al enviar")
    } finally {
      setIsSaving(false)
    }
  }

  const pdfData: PDFQuoteData = useMemo(
    () => ({
      executorName: "Agustín Arancibia Mac-Guire",
      executorRut: "19.435.988-8",
      executorCertification: "Instalador industrial certificado",
      executorPhone: "+56 9 XXXX XXXX",
      clientName: quote.clientName,
      clientRut: quote.clientRut,
      clientAddress: client?.address,
      projectName,
      projectDescription: description,
      location: quote.location || "Pinto, Ñuble, Chile",
      date: new Date(quote._creationTime),
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        value: i.value,
        category: i.category,
        isOptional: i.isOptional,
        isIncluded: i.isIncluded,
      })),
      recommendation: "Opción B, para dejar líneas matrices en norma y operativas.",
      notes: notes,
    }),
    [quote, client, projectName, description, notes, items],
  )

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Editor */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Editor de Cotización</CardTitle>
              <Badge variant={quote.status === "draft" ? "secondary" : "default"} className="mt-1">
                {getStatusLabel(quote.status)}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="ml-2 hidden sm:inline">Guardar</span>
              </Button>
              {quote.status === "draft" && (
                <Button size="sm" onClick={handleSend} disabled={isSaving}>
                  <Send className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Enviar</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="items">Partidas</TabsTrigger>
                <TabsTrigger value="notes">Notas</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nombre del Proyecto</Label>
                  <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Descripción del alcance del trabajo..."
                  />
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente</p>
                      <p className="font-medium">{quote.clientName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{quote.location}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4 pt-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        className="col-span-2"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                        placeholder="Nombre"
                      />
                      <Input
                        type="number"
                        value={item.value || ""}
                        onChange={(e) => handleUpdateItem(item.id, "value", Number.parseInt(e.target.value) || 0)}
                        placeholder="Valor"
                      />
                    </div>
                    <Textarea
                      value={item.description || ""}
                      onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                      placeholder="Descripción..."
                      rows={2}
                      className="text-sm"
                    />
                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={item.isOptional}
                          onChange={(e) => handleUpdateItem(item.id, "isOptional", e.target.checked)}
                          className="rounded"
                        />
                        Opcional
                      </label>
                      <label className="flex items-center gap-1.5">
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

                <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" onClick={handleAddItem}>
                  <Plus className="w-4 h-4" />
                  Agregar Partida
                </Button>

                <div className="pt-3 border-t flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg">{formatCLP(totalValue)}</span>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Notas para el Cliente</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    placeholder="Notas adicionales que aparecerán en la cotización..."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* PDF Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold">Vista Previa del PDF</h2>
        </div>
        <PDFPreview data={pdfData} />
      </div>
    </div>
  )
}
