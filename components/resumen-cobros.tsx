export function ResumenCobros() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[var(--header-bg)]">
        <span className="px-3 py-1 bg-[var(--header-bg)] text-[var(--header-foreground)] text-xs font-medium uppercase tracking-wider rounded">
          Reseña
        </span>
        <h2 className="text-xl font-semibold text-foreground">Reseña de Cobros</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Para claridad del cliente, los cobros se distribuyen en tres proyectos, pagados en dos cuotas de 50% cada una:
      </p>

      <div className="space-y-4">
        {/* Cobro 1 */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="bg-secondary px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-foreground">Obras principales (anticipo 50%)</h4>
              <p className="text-xs text-muted-foreground">Corresponde al anticipo de la obra seleccionada</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">Sin segundo piso</p>
              <p className="text-lg font-semibold text-foreground">$530.000</p>
            </div>
            <div className="bg-[var(--highlight)]/10 rounded p-3 border border-[var(--highlight)]/30">
              <p className="text-xs text-muted-foreground mb-1">Con segundo piso</p>
              <p className="text-lg font-semibold text-[var(--accent-foreground)]">$635.000</p>
            </div>
          </div>
        </div>

        {/* Cobro 2 - standardized to match items 1 and 3 with grid layout */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="bg-secondary px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-foreground">Retomar obras del aumento de potencia</h4>
              <p className="text-xs text-muted-foreground">Anticipo 1/6 del total de AP, el 50% del ⅓ restante</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground mb-3">
              Pago administrativo/técnico asociado al proceso SEC + Copelec.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded p-3">
                <p className="text-xs text-muted-foreground mb-1">Monto único</p>
                <p className="text-lg font-semibold text-foreground">$667.000</p>
              </div>
              <div className="bg-muted/30 rounded p-3 opacity-50">
                <p className="text-xs text-muted-foreground mb-1">—</p>
                <p className="text-lg font-semibold text-muted-foreground">—</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cobro 3 - highlighted "Con luminaria exterior" as recommended */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="bg-secondary px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-foreground">Mitad del anexo del segundo piso</h4>
              <p className="text-xs text-muted-foreground">Corresponde al 50% de los valores adicionales del anexo</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">Sin luminaria exterior</p>
              <p className="text-lg font-semibold text-foreground">$247.500</p>
            </div>
            <div className="bg-[var(--highlight)]/10 rounded p-3 border border-[var(--highlight)]/30">
              <p className="text-xs text-muted-foreground mb-1">Con luminaria exterior</p>
              <p className="text-lg font-semibold text-[var(--accent-foreground)]">$287.500</p>
              <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-[var(--accent-foreground)] font-medium">
                Recomendado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
