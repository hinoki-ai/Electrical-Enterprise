import { Lightbulb, ToggleRight, Lamp, Sun } from "lucide-react"

export function AnexoSection() {
  const items = [
    {
      id: 1,
      icon: ToggleRight,
      title: "Interruptor en combinación (mitad segundo piso)",
      description: "Instalación de la segunda mitad del sistema de conmutación de escalera.",
      note: "La otra mitad ya existe en el primer piso.",
      value: "$35.000",
    },
    {
      id: 2,
      icon: Lightbulb,
      title: "Luminarias de techo con interruptor simple",
      description: "Instalación de 2 luminarias de techo, cada una con su interruptor simple.",
      details: "Valor unitario (luminaria + interruptor): $70.000",
      value: "$140.000",
      label: "Total",
    },
    {
      id: 3,
      icon: Lamp,
      title: "Luminarias mixtas por cama",
      description:
        "Cada cama incluye: 1 módulo de interruptor + 2 enchufes, 1 luminaria individual (en buen estado, reutilizada; de lo contrario, se suma valor de luminaria).",
      details: "Cantidad: 4 camas (dos por habitación) · Valor unitario: $80.000",
      value: "$320.000",
      label: "Total",
    },
    {
      id: 4,
      icon: Sun,
      title: "Luminaria exterior",
      description:
        "En caso de requerir luz exterior: incluye luminaria exterior + interruptor + materiales adicionales según estándar.",
      value: "$80.000",
      optional: true,
    },
  ]

  return (
    <section>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[var(--header-bg)]">
        <span className="px-3 py-1 bg-[var(--header-bg)] text-[var(--header-foreground)] text-xs font-medium uppercase tracking-wider rounded">
          Anexo
        </span>
        <h2 className="text-xl font-semibold text-foreground">Instalaciones Eléctricas del Segundo Piso</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        El presente anexo detalla los trabajos adicionales correspondientes a la instalación eléctrica del segundo piso,
        todos con materiales incluidos.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`border rounded-md p-5 ${
              item.optional ? "border-dashed border-muted-foreground/30 bg-muted/30" : "border-border bg-card"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                  item.optional ? "bg-muted" : "bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.id}.</span>
                      {item.title}
                      {item.optional && (
                        <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">Opcional</span>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                    {item.note && <p className="text-xs text-muted-foreground mt-1 italic">({item.note})</p>}
                    {item.details && <p className="text-sm text-foreground/80 mt-2">{item.details}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {item.label && <span className="text-xs text-muted-foreground block mb-0.5">{item.label}</span>}
                    <span className="text-lg font-semibold text-foreground">{item.value}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Anexo Summary */}
      <div className="mt-8 bg-[var(--table-header)] rounded-md p-5">
        <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Resumen de Cobros del Anexo</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Interruptor combinación (½)</span>
            <span className="text-foreground">$25.000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dos luminarias de techo</span>
            <span className="text-foreground">$90.000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cuatro luminarias mixtas por cama</span>
            <span className="text-foreground">$280.000</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border pb-2">
            <span className="text-muted-foreground">Luminaria exterior (opcional, sin valor de la luminaria)</span>
            <span className="text-foreground">$70.000</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="font-medium text-foreground">Total adicional (sin luz exterior)</span>
            <span className="font-bold text-foreground">$495.000</span>
          </div>
          <div className="flex justify-between text-[var(--accent-foreground)]">
            <span className="font-medium">Total con luz exterior</span>
            <span className="font-bold">$575.000</span>
          </div>
        </div>
      </div>
    </section>
  )
}
