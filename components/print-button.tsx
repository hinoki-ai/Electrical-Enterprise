"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
      <Button onClick={handlePrint} variant="outline" size="sm" className="bg-card shadow-lg hover:bg-secondary">
        <Printer className="w-4 h-4 mr-2" />
        Imprimir / PDF
      </Button>
    </div>
  )
}
