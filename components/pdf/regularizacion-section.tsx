import { FileCheck } from "lucide-react"
import { formatCLP } from "@/lib/utils"

interface RegularizacionData {
  description: string
  paymentNote?: string
  amountToPay: number
}

interface RegularizacionSectionProps {
  data: RegularizacionData
}

export function RegularizacionSection({ data }: RegularizacionSectionProps) {
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
              {data.description}
            </p>

            {data.paymentNote && (
              <div className="mt-4 p-4 bg-card rounded border border-border">
                <p className="text-sm text-muted-foreground">
                  {data.paymentNote}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between p-4 bg-[var(--header-bg)] text-[var(--header-foreground)] rounded">
              <span className="text-sm uppercase tracking-wider opacity-80">Monto a pagar hoy</span>
              <span className="text-2xl font-semibold">{formatCLP(data.amountToPay)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
