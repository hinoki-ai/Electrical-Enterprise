import { Star } from "lucide-react"
import { formatCLP } from "@/lib/utils"

interface OptionItem {
  label: string
  value: number
}

interface QuoteOption {
  id: string
  name: string
  description?: string
  totalValue: number
  isRecommended: boolean
  items?: OptionItem[]
}

interface OptionsComparisonProps {
  options: QuoteOption[]
}

export function OptionsComparison({ options }: OptionsComparisonProps) {
  return (
    <section>
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border"></span>
        Resumen de Totales
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`border rounded-md overflow-hidden ${
              option.isRecommended ? "border-2 border-[var(--highlight)]" : "border-border"
            } relative`}
          >
            {option.isRecommended && (
              <div className="absolute top-0 right-0 bg-[var(--highlight)] text-[var(--header-bg)] text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-bl-md flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                Recomendado
              </div>
            )}
            <div className={`${option.isRecommended ? "bg-[var(--highlight)]/10" : "bg-secondary"} px-5 py-4`}>
              <h4 className="text-lg font-semibold text-foreground">{option.name}</h4>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              )}
            </div>
            <div className="p-5 space-y-3">
              {option.items && option.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{formatCLP(item.value)}</span>
                </div>
              ))}
              <div className={`flex justify-between items-center pt-3 ${
                option.isRecommended ? "bg-[var(--highlight)]/10 -mx-5 px-5 -mb-5 pb-5 rounded-b" : ""
              }`}>
                <span className="font-medium text-foreground">Total</span>
                <span className={`text-xl font-bold ${
                  option.isRecommended ? "text-[var(--accent-foreground)]" : "text-foreground"
                }`}>
                  {formatCLP(option.totalValue)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
