"use client"

import { forwardRef } from "react"
import { Zap, Award, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { formatCLP } from "@/lib/utils"

export interface QuoteItem {
  id: string
  name: string
  description?: string
  value: number
  category?: string
  isOptional: boolean
  isIncluded: boolean
}

export interface QuoteOption {
  id: string
  name: string
  description?: string
  items: string[]
  totalValue: number
  isRecommended: boolean
}

export interface AnnexItem {
  id: string
  name: string
  description?: string
  value: number
  isOptional: boolean
  isIncluded: boolean
}

export interface Annex {
  id: string
  title: string
  items: AnnexItem[]
  totalValue: number
}

export interface Payment {
  id: string
  name: string
  description?: string
  percentage: number
  amount: number
  options?: { name: string; amount: number; isRecommended?: boolean }[]
}

export interface PDFQuoteData {
  // Header
  executorName: string
  executorRut: string
  executorCertification: string
  executorPhone?: string
  executorEmail?: string

  // Client
  clientName: string
  clientRut?: string
  clientAddress?: string

  // Project
  projectName: string
  projectDescription?: string
  location: string
  date: Date

  // Content
  items: QuoteItem[]
  options?: QuoteOption[]
  annexes?: Annex[]
  payments?: Payment[]

  // Notes
  recommendation?: string
  notes?: string
}

interface PDFDocumentProps {
  data: PDFQuoteData
}

export const PDFDocument = forwardRef<HTMLDivElement, PDFDocumentProps>(({ data }, ref) => {
  const includedItems = data.items.filter((item) => item.isIncluded && !item.isOptional)

  return (
    <div ref={ref} className="pdf-document bg-white text-foreground min-h-[297mm] w-[210mm] mx-auto">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-8 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{data.executorName}</h1>
              <p className="text-primary-foreground/80 text-sm">R.U.T. {data.executorRut}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-accent font-medium">
              <Award className="w-4 h-4" />
              <span className="text-sm">{data.executorCertification}</span>
            </div>
            {data.executorPhone && (
              <p className="text-sm text-primary-foreground/70 mt-1 flex items-center justify-end gap-1">
                <Phone className="w-3 h-3" />
                {data.executorPhone}
              </p>
            )}
            {data.executorEmail && (
              <p className="text-sm text-primary-foreground/70 flex items-center justify-end gap-1">
                <Mail className="w-3 h-3" />
                {data.executorEmail}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Project Info */}
      <section className="px-8 py-6 border-b">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Solicitante</p>
              <p className="font-semibold text-lg">{data.clientName}</p>
              {data.clientRut && <p className="text-sm text-muted-foreground">R.U.T. {data.clientRut}</p>}
            </div>
            {data.clientAddress && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Dirección</p>
                <p className="text-sm">{data.clientAddress}</p>
              </div>
            )}
          </div>
          <div className="space-y-3 text-right">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Fecha</p>
              <p className="font-semibold flex items-center justify-end gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {data.date.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Ubicación</p>
              <p className="text-sm flex items-center justify-end gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                {data.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="px-8 py-6 border-b">
        <h2 className="text-lg font-bold text-primary mb-3">Descripción del Proyecto</h2>
        <p className="text-sm leading-relaxed">{data.projectDescription}</p>
        {data.recommendation && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold text-accent">Recomendación:</span> {data.recommendation}
            </p>
          </div>
        )}
        {data.notes && (
          <p className="mt-3 text-sm text-muted-foreground italic">
            <span className="font-medium">Nota:</span> {data.notes}
          </p>
        )}
      </section>

      {/* Partidas Table */}
      <section className="px-8 py-6 border-b">
        <h2 className="text-lg font-bold text-primary mb-4">Detalle de Partidas y Costos</h2>
        <div className="space-y-3">
          {includedItems.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1 ml-8">{item.description}</p>}
                </div>
                <p className="font-bold text-lg tabular-nums">{formatCLP(item.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Options Comparison */}
      {data.options && data.options.length > 0 && (
        <section className="px-8 py-6 border-b">
          <h2 className="text-lg font-bold text-primary mb-4">Resumen de Totales</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.options.map((option) => (
              <div
                key={option.id}
                className={`p-4 rounded-xl border-2 ${
                  option.isRecommended ? "border-accent bg-accent/5 relative" : "border-border bg-secondary/20"
                }`}
              >
                {option.isRecommended && (
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded">
                    Recomendado
                  </div>
                )}
                <h3 className="font-bold text-lg mb-2">{option.name}</h3>
                {option.description && <p className="text-sm text-muted-foreground mb-3">{option.description}</p>}
                <p className="text-2xl font-bold">{formatCLP(option.totalValue)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Annexes */}
      {data.annexes && data.annexes.length > 0 && (
        <section className="px-8 py-6 border-b page-break-before">
          {data.annexes.map((annex) => (
            <div key={annex.id} className="mb-6">
              <h2 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide">{annex.title}</h2>
              <div className="space-y-2">
                {annex.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      item.isOptional ? "bg-accent/5 border border-accent/20" : "bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                      </div>
                      {item.isOptional && (
                        <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded">Opcional</span>
                      )}
                    </div>
                    <p className="font-bold tabular-nums">{formatCLP(item.value)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <p className="font-semibold">Total {annex.title}</p>
                <p className="text-xl font-bold">{formatCLP(annex.totalValue)}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Payment Summary */}
      {data.payments && data.payments.length > 0 && (
        <section className="px-8 py-6">
          <h2 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide">Reseña de Cobros</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Para claridad del cliente, los cobros se distribuyen en proyectos, pagados en dos cuotas de 50% cada una:
          </p>
          <div className="grid grid-cols-1 gap-4">
            {data.payments.map((payment, index) => (
              <div key={payment.id} className="border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{payment.name}</h3>
                    {payment.description && <p className="text-sm text-muted-foreground mt-1">{payment.description}</p>}
                    {payment.options ? (
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {payment.options.map((opt, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg ${
                              opt.isRecommended ? "bg-accent/10 border-2 border-accent" : "bg-secondary/30"
                            }`}
                          >
                            {opt.isRecommended && (
                              <span className="text-xs font-bold text-accent block mb-1">Recomendado</span>
                            )}
                            <p className="text-sm">{opt.name}</p>
                            <p className="font-bold text-lg">{formatCLP(opt.amount)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xl font-bold mt-2">{formatCLP(payment.amount)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-8 py-4 bg-secondary/30 border-t mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span>{data.executorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{data.location}</span>
          </div>
        </div>
      </footer>
    </div>
  )
})

PDFDocument.displayName = "PDFDocument"
