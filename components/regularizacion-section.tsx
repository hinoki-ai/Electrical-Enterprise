import { FileCheck } from "lucide-react"

export function RegularizacionSection() {
  return (
    <section>
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border"></span>
        Regularización Aumento de Potencia (AP)
      </h3>

      <div className="bg-secondary/30 border border-border rounded-md p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-foreground leading-relaxed">
              50% del saldo adeudado por gestiones administrativas y técnicas:
              <span className="font-medium"> 5 solicitudes presenciales en Copelec Chillán</span> y reestructuración del
              TE1 según nuevas exigencias SEC.
            </p>

            <div className="mt-4 p-4 bg-card rounded border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Pago final (1/6 restante):</span> contra aceptación de
                papeles por Copelec.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between p-4 bg-[var(--header-bg)] text-[var(--header-foreground)] rounded">
              <span className="text-sm uppercase tracking-wider opacity-80">Monto a pagar hoy</span>
              <span className="text-2xl font-semibold">$667.000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
