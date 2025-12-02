import { formatCLP } from "@/lib/utils"

interface PartidaSubItem {
  label: string
  value: number
}

interface PartidaItem {
  id: string
  name: string
  description?: string
  value: number
  category?: string
  isOptional: boolean
  isIncluded: boolean
  materials?: string
  subItems?: PartidaSubItem[]
  note?: string
  conditional?: boolean
}

interface PartidasTableProps {
  items: PartidaItem[]
}

export function PartidasTable({ items }: PartidasTableProps) {
  const includedItems = items.filter((item) => item.isIncluded && !item.isOptional)

  return (
    <section>
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border"></span>
        Detalle de Partidas y Costos
      </h3>

      <div className="border border-border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--table-header)]">
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-4 py-3 w-12">
                N.º
              </th>
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-4 py-3">
                Descripción
              </th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground px-4 py-3 w-32">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {includedItems.map((item, index) => (
              <tr key={item.id} className="group">
                <td className="px-4 py-4 align-top">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-sm font-medium text-foreground">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  )}
                  {item.materials && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground/80">Materiales:</span> {item.materials}
                    </p>
                  )}
                  {item.subItems && (
                    <div className="mt-3 space-y-1.5">
                      {item.subItems.map((subItem, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm bg-secondary/50 rounded px-3 py-2"
                        >
                          <span className="text-muted-foreground">• {subItem.label}</span>
                          <span className="font-medium text-foreground">{formatCLP(subItem.value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.note && <p className="text-xs text-muted-foreground mt-2 italic">({item.note})</p>}
                </td>
                <td className="px-4 py-4 text-right align-top">
                  <span
                    className={`font-semibold ${item.conditional ? "text-muted-foreground" : "text-foreground"}`}
                  >
                    {formatCLP(item.value)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
