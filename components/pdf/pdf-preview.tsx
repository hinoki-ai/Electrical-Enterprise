"use client"

import { useRef, useState } from "react"
import { Download, Printer, Eye, EyeOff, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PDFDocument, type PDFQuoteData } from "./pdf-document"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

interface PDFPreviewProps {
  data: PDFQuoteData
  showControls?: boolean
}

export function PDFPreview({ data, showControls = true }: PDFPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const [showPreview, setShowPreview] = useState(true)

  const handlePrint = () => {
    if (!printRef.current) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast.error("No se pudo abrir la ventana de impresión")
      return
    }

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("")
        } catch {
          return ""
        }
      })
      .join("")

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cotización - ${data.clientName}</title>
          <style>
            ${styles}
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .page-break-before {
                page-break-before: always;
              }
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Inter', system-ui, sans-serif;
            }
          </style>
        </head>
        <body>
          ${printRef.current.outerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const handleDownload = async () => {
    // For now, trigger print dialog which allows saving as PDF
    handlePrint()
    toast.success("Usa 'Guardar como PDF' en el diálogo de impresión")
  }

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="gap-2">
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Ocultar" : "Mostrar"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Maximize2 className="w-4 h-4" />
                  Pantalla Completa
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto p-0">
                <PDFDocument data={data} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 bg-transparent">
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
            <Button size="sm" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="border rounded-xl overflow-hidden shadow-lg bg-white">
          <div className="overflow-auto max-h-[800px]">
            <div className="transform scale-[0.7] origin-top-left" style={{ width: "142.857%" }}>
              <PDFDocument ref={printRef} data={data} />
            </div>
          </div>
        </div>
      )}

      {/* Hidden print version */}
      <div className="hidden">
        <PDFDocument ref={printRef} data={data} />
      </div>
    </div>
  )
}
