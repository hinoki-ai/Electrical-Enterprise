import { Star } from "lucide-react"

export function OptionsComparison() {
  return (
    <section>
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border"></span>
        Resumen de Totales
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Option A */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="bg-secondary px-5 py-4">
            <h4 className="text-lg font-semibold text-foreground">Opción A</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Recableado primer piso + reparación puntual 2.º piso + habitación principal (sin baño)
            </p>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total obras</span>
              <span className="font-medium text-foreground">$1.060.000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">50% anticipo</span>
              <span className="font-medium text-foreground">$530.000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Pago parcial AP</span>
              <span className="font-medium text-foreground">$667.000</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="font-medium text-foreground">Total nuevo 50%</span>
              <span className="text-xl font-bold text-foreground">$1.197.000</span>
            </div>
          </div>
        </div>

        {/* Option B - Recommended */}
        <div className="border-2 border-[var(--highlight)] rounded-md overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-[var(--highlight)] text-[var(--header-bg)] text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-bl-md flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            Recomendado
          </div>
          <div className="bg-[var(--highlight)]/10 px-5 py-4">
            <h4 className="text-lg font-semibold text-foreground">Opción B</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Recableado ambos pisos + unificación línea habitación y baño
            </p>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total obras</span>
              <span className="font-medium text-foreground">$1.270.000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">50% anticipo</span>
              <span className="font-medium text-foreground">$635.000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Pago parcial AP</span>
              <span className="font-medium text-foreground">$667.000</span>
            </div>
            <div className="flex justify-between items-center pt-3 bg-[var(--highlight)]/10 -mx-5 px-5 -mb-5 pb-5 rounded-b">
              <span className="font-medium text-foreground">Total nuevo 50%</span>
              <span className="text-xl font-bold text-[var(--accent-foreground)]">$1.302.000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
