"use client"

import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateElectricalQuotePDF } from "@/lib/pdf-generator"
import { toast } from "sonner"
import { useState, useEffect, useCallback } from "react"

export function PrintButton() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handlePDFExport = useCallback(async () => {
    if (isGeneratingPDF) return;

    setIsGeneratingPDF(true);
    try {
      toast.loading('Generando PDF...', { id: 'pdf-export' })
      await generateElectricalQuotePDF()
      toast.success('PDF generado exitosamente', { id: 'pdf-export' })
    } catch (error) {
      console.error('Error generando PDF:', error)
      toast.error('Error al generar el PDF. Verifica que todos los elementos estén cargados.', { id: 'pdf-export' })
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [isGeneratingPDF]);

  // Add keyboard shortcut for PDF generation (Ctrl+P for PDF)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        handlePDFExport();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePDFExport]);

  return (
    <div className="no-print fixed top-4 right-4 z-50">
      <Button
        onClick={handlePDFExport}
        variant="default"
        size="default"
        className="bg-primary shadow-lg hover:bg-primary/90"
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}
      </Button>
    </div>
  )
}
