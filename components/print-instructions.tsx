"use client"

import { Printer, FileDown } from "lucide-react"

export function PrintInstructions() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="print:hidden fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <div className="bg-slate-800 text-white p-4 rounded-lg shadow-xl max-w-xs">
        <p className="text-sm font-medium mb-2 flex items-center gap-2">
          <FileDown className="w-4 h-4 text-amber-400" />
          Para PDF sin marca de agua:
        </p>
        <p className="text-xs text-slate-300 mb-3">
          Usa <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-amber-400 font-mono">Ctrl+P</kbd> (o{" "}
          <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-amber-400 font-mono">Cmd+P</kbd> en Mac) y selecciona
          "Guardar como PDF"
        </p>
        <button
          onClick={handlePrint}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Guardar PDF
        </button>
      </div>
    </div>
  )
}
