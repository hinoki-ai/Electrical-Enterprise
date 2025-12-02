import { formatCLP } from "@/lib/utils"

interface PaymentOption {
  name: string
  amount: number
  isRecommended?: boolean
  description?: string
}

interface Payment {
  id: string
  name: string
  description?: string
  percentage?: number
  amount?: number
  options?: PaymentOption[]
  note?: string
}

interface ResumenCobrosProps {
  payments: Payment[]
  introText?: string
}

export function ResumenCobros({ payments, introText }: ResumenCobrosProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[var(--header-bg)]">
        <span className="px-3 py-1 bg-[var(--header-bg)] text-[var(--header-foreground)] text-xs font-medium uppercase tracking-wider rounded">
          Reseña
        </span>
        <h2 className="text-xl font-semibold text-foreground">Reseña de Cobros</h2>
      </div>

      {introText && (
        <p className="text-sm text-muted-foreground mb-6">
          {introText}
        </p>
      )}

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={payment.id} className="border border-border rounded-md overflow-hidden">
            <div className="bg-secondary px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-foreground">{payment.name}</h4>
                {payment.description && (
                  <p className="text-xs text-muted-foreground">{payment.description}</p>
                )}
              </div>
            </div>
            <div className="p-5">
              {payment.note && (
                <p className="text-sm text-muted-foreground mb-3">
                  {payment.note}
                </p>
              )}
              {payment.options && payment.options.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {payment.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`rounded p-3 ${
                        option.isRecommended
                          ? "bg-[var(--highlight)]/10 border border-[var(--highlight)]/30"
                          : "bg-muted/50"
                      }`}
                    >
                      <p className="text-xs text-muted-foreground mb-1">{option.name}</p>
                      <p className={`text-lg font-semibold ${
                        option.isRecommended ? "text-[var(--accent-foreground)]" : "text-foreground"
                      }`}>
                        {formatCLP(option.amount)}
                      </p>
                      {option.isRecommended && (
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-[var(--accent-foreground)] font-medium">
                          Recomendado
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : payment.amount ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded p-3">
                    <p className="text-xs text-muted-foreground mb-1">Monto único</p>
                    <p className="text-lg font-semibold text-foreground">{formatCLP(payment.amount)}</p>
                  </div>
                  <div className="bg-muted/30 rounded p-3 opacity-50">
                    <p className="text-xs text-muted-foreground mb-1">—</p>
                    <p className="text-lg font-semibold text-muted-foreground">—</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
