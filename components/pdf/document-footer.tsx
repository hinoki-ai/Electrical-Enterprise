import { Zap, MapPin } from "lucide-react"

interface DocumentFooterProps {
  executorName: string
  executorCertification: string
  location: string
  generationDate?: Date
}

export function DocumentFooter({
  executorName,
  executorCertification,
  location,
  generationDate = new Date()
}: DocumentFooterProps) {
  return (
    <footer className="mt-12 pt-8 border-t-2 border-[var(--header-bg)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[var(--header-bg)] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[var(--highlight)]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-foreground">{executorName}</p>
            <p className="text-xs text-muted-foreground">{executorCertification}</p>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>Propuesta válida por 30 días</p>
          <p className="text-xs mt-1">
            Documento generado el {generationDate.toLocaleDateString("es-CL")}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {location}
        </span>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Este documento constituye una propuesta formal de servicios. Los valores indicados incluyen materiales y mano de
        obra según las especificaciones descritas.
      </p>
    </footer>
  )
}
