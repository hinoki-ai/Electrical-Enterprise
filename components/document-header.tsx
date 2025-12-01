import { Zap } from "lucide-react"

export function DocumentHeader() {
  return (
    <header className="bg-[var(--header-bg)] text-[var(--header-foreground)] px-10 py-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-md bg-[var(--highlight)] flex items-center justify-center">
            <Zap className="w-8 h-8 text-[var(--header-bg)]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Agustín Arancibia Mac-Guire</h1>
            <p className="text-sm text-[var(--header-foreground)]/70 mt-0.5">Instalador Industrial Certificado</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-[var(--header-foreground)]/70">R.U.T.</p>
          <p className="font-medium">19.435.988-8</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--header-foreground)]/20">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--header-foreground)]/50 mb-1">
              Propuesta Técnica
            </p>
            <h2 className="text-xl font-medium">Proyecto Eléctrico Residencial</h2>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-[var(--header-foreground)]/50 mb-1">Fecha</p>
            <p className="font-medium">24 de noviembre de 2025</p>
          </div>
        </div>
      </div>
    </header>
  )
}
