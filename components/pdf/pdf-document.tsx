"use client"

import { forwardRef } from "react"
import { formatCLP } from "@/lib/utils"
import { DocumentHeader } from "./document-header"
import { DocumentFooter } from "./document-footer"
import { ProjectInfo } from "./project-info"
import { PartidasTable } from "./partidas-table"
import { RegularizacionSection } from "./regularizacion-section"
import { OptionsComparison } from "./options-comparison"
import { AnexoSection } from "./anexo-section"
import { ResumenCobros } from "./resumen-cobros"

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

export interface RegularizationData {
  description: string
  paymentNote?: string
  amountToPay: number
}

export interface AnnexSummaryItem {
  label: string
  value: number
}

export interface AnnexData {
  id: string
  title: string
  description?: string
  items: AnnexItem[]
  summaryItems?: AnnexSummaryItem[]
  totalValue: number
  totalWithOptional?: number
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
  annexes?: AnnexData[]
  payments?: Payment[]
  regularization?: RegularizationData

  // Notes
  recommendation?: string
  notes?: string
}

interface PDFDocumentProps {
  data: PDFQuoteData
}

export const PDFDocument = forwardRef<HTMLDivElement, PDFDocumentProps>(({ data }, ref) => {
  return (
    <div ref={ref} id="electrical-quote-document">
      {/* Page 1 */}
      <article className="bg-card shadow-sm">
        <DocumentHeader
          executorName={data.executorName}
          executorRut={data.executorRut}
          executorCertification={data.executorCertification}
          projectName={data.projectName}
          date={data.date}
        />
        <div className="px-10 py-8 space-y-8">
          <ProjectInfo
            clientName={data.clientName}
            clientRut={data.clientRut}
            projectDescription={data.projectDescription}
            scope={undefined}
            recommendation={data.recommendation}
            notes={data.notes}
          />
          <PartidasTable items={data.items} />
        </div>
      </article>

      {/* Page 2 */}
      <article className="bg-card shadow-sm mt-4 page-break">
        <div className="px-10 py-8 space-y-8">
          {data.regularization && <RegularizacionSection data={data.regularization} />}
          {data.options && <OptionsComparison options={data.options} />}
        </div>
      </article>

      {/* Page 3 - Annex */}
      {data.annexes && data.annexes.length > 0 && (
        <article className="bg-card shadow-sm mt-4 page-break">
          <div className="px-10 py-8 space-y-8">
            {data.annexes.map(annex => (
              <AnexoSection key={annex.id} annex={annex} />
            ))}
          </div>
        </article>
      )}

      {/* Page 4 - Payments & Footer */}
      <article className="bg-card shadow-sm mt-4 page-break">
        <div className="px-10 py-8 space-y-8">
          {data.payments && <ResumenCobros payments={data.payments} />}
          <DocumentFooter
            executorName={data.executorName}
            executorCertification={data.executorCertification}
            location={data.location}
          />
        </div>
      </article>
    </div>
  )
})

PDFDocument.displayName = "PDFDocument"
