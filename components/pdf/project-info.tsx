import { User, FileText, AlertCircle, CheckCircle2 } from "lucide-react"

interface ProjectInfoProps {
  clientName: string
  clientRut?: string
  projectDescription?: string
  scope?: string
  recommendation?: string
  notes?: string
}

export function ProjectInfo({
  clientName,
  clientRut,
  projectDescription,
  scope,
  recommendation,
  notes
}: ProjectInfoProps) {
  return (
    <section>
      {/* Client Info */}
      <div className="flex items-start gap-3 pb-6 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Solicitante</p>
          <p className="text-lg font-medium text-foreground">{clientName}</p>
          {clientRut && <p className="text-sm text-muted-foreground">R.U.T. {clientRut}</p>}
        </div>
      </div>

      {/* Description */}
      {projectDescription && (
        <div className="mt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Descripción del Proyecto</p>
              <p className="text-foreground leading-relaxed">
                {projectDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scope */}
      {scope && (
        <div className="mt-6 bg-secondary/50 rounded-md p-5">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-medium">Alcance:</span> {scope}
          </p>
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="mt-4 flex items-start gap-3 p-4 bg-[var(--highlight)]/10 border-l-4 border-[var(--highlight)] rounded-r-md">
          <CheckCircle2 className="w-5 h-5 text-[var(--accent-foreground)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[var(--accent-foreground)]">Recomendación</p>
            <p className="text-sm text-muted-foreground mt-1">
              {recommendation}
            </p>
          </div>
        </div>
      )}

      {/* Note */}
      {notes && (
        <div className="mt-4 flex items-start gap-3 p-4 bg-muted/50 rounded-md">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">{notes}</p>
        </div>
      )}
    </section>
  )
}
