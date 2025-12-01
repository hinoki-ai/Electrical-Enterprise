import { User, FileText, AlertCircle, CheckCircle2 } from "lucide-react"

export function ProjectInfo() {
  return (
    <section>
      {/* Client Info */}
      <div className="flex items-start gap-3 pb-6 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Solicitante</p>
          <p className="text-lg font-medium text-foreground">Sra. Lorena Paris Briones</p>
          <p className="text-sm text-muted-foreground">R.U.T. 9.014.976-8</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Descripción del Proyecto</p>
            <p className="text-foreground leading-relaxed">
              Finalización de aumento de potencia, recableado de circuitos (luces y enchufes), revisión del segundo piso
              y obras civiles asociadas. Todos los valores incluyen materiales.
            </p>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="mt-6 bg-secondary/50 rounded-md p-5">
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-medium">Alcance:</span> El alcance se limita a la instalación de subalimentadores
          (troncales), separación de circuitos y reparación de fallas críticas. No incluye cambio de cableado en todos
          los enchufes, excepto en la habitación principal.
        </p>
      </div>

      {/* Recommendation */}
      <div className="mt-4 flex items-start gap-3 p-4 bg-[var(--highlight)]/10 border-l-4 border-[var(--highlight)] rounded-r-md">
        <CheckCircle2 className="w-5 h-5 text-[var(--accent-foreground)] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-[var(--accent-foreground)]">Recomendación: Opción B</p>
          <p className="text-sm text-muted-foreground mt-1">
            Para dejar líneas matrices de ambos pisos en norma y operativas.
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 flex items-start gap-3 p-4 bg-muted/50 rounded-md">
        <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">La renovación total de la casa requiere una cotización nueva.</p>
      </div>
    </section>
  )
}
