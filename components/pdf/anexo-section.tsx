import { Lightbulb, ToggleRight, Lamp, Sun } from "lucide-react"
import { formatCLP } from "@/lib/utils"

interface AnnexItem {
  id: string
  name: string
  description?: string
  value: number
  isOptional: boolean
  isIncluded: boolean
  note?: string
  details?: string
  label?: string
  iconType?: string
}

interface AnnexSummaryItem {
  label: string
  value: number
}

interface AnexoData {
  id: string
  title: string
  description?: string
  items: AnnexItem[]
  summaryItems?: AnnexSummaryItem[]
  totalValue: number
  totalWithOptional?: number
}

interface AnexoSectionProps {
  annex: AnexoData
}

const getIcon = (iconType?: string) => {
  switch (iconType) {
    case "lightbulb":
      return Lightbulb
    case "lamp":
      return Lamp
    case "sun":
      return Sun
    default:
      return ToggleRight
  }
}

export function AnexoSection({ annex }: AnexoSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[var(--header-bg)]">
        <span className="px-3 py-1 bg-[var(--header-bg)] text-[var(--header-foreground)] text-xs font-medium uppercase tracking-wider rounded">
          Anexo
        </span>
        <h2 className="text-xl font-semibold text-foreground">{annex.title}</h2>
      </div>

      {annex.description && (
        <p className="text-sm text-muted-foreground mb-6">
          {annex.description}
        </p>
      )}

      <div className="space-y-4">
        {annex.items.map((item) => {
          const IconComponent = getIcon(item.iconType)
          return (
            <div
              key={item.id}
              className={`border rounded-md p-5 ${
                item.isOptional ? "border-dashed border-muted-foreground/30 bg-muted/30" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                    item.isOptional ? "bg-muted" : "bg-secondary"
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.id}.</span>
                        {item.name}
                        {item.isOptional && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">Opcional</span>
                        )}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                      )}
                      {item.note && <p className="text-xs text-muted-foreground mt-1 italic">({item.note})</p>}
                      {item.details && <p className="text-sm text-foreground/80 mt-2">{item.details}</p>}
                    </div>
                    <div className="text-right flex-shrink-0">
                      {item.label && <span className="text-xs text-muted-foreground block mb-0.5">{item.label}</span>}
                      <span className="text-lg font-semibold text-foreground">{formatCLP(item.value)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Anexo Summary */}
      {annex.summaryItems && annex.summaryItems.length > 0 && (
        <div className="mt-8 bg-[var(--table-header)] rounded-md p-5">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Resumen de Cobros del Anexo</h4>
          <div className="space-y-2">
            {annex.summaryItems.map((summaryItem, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{summaryItem.label}</span>
                <span className="text-foreground">{formatCLP(summaryItem.value)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-medium text-foreground">Total adicional</span>
              <span className="font-bold text-foreground">{formatCLP(annex.totalValue)}</span>
            </div>
            {annex.totalWithOptional && (
              <div className="flex justify-between text-[var(--accent-foreground)]">
                <span className="font-medium">Total con opcionales</span>
                <span className="font-bold">{formatCLP(annex.totalWithOptional)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
