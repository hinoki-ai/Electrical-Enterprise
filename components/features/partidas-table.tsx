"use client";

import { useCurrentQuote } from "@/hooks/use-current-quote";

export function PartidasTable() {
  const { currentQuote, isLoading } = useCurrentQuote();

  if (isLoading) {
    return (
      <section>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-border"></span>
          Detalle de Partidas y Costos
        </h3>
        <div className="animate-pulse">
          <div className="border border-border rounded-md overflow-hidden">
            <div className="h-12 bg-secondary"></div>
            <div className="space-y-4 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-secondary rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentQuote?.lineItems || currentQuote.lineItems.length === 0) {
    return null;
  }

  const lineItems = currentQuote.lineItems.sort((a, b) => a.order - b.order);

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
            {lineItems.map((partida, index) => (
              <tr key={partida._id} className="group">
                <td className="px-4 py-4 align-top">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-sm font-medium text-foreground">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">{partida.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{partida.description}</p>
                  {partida.materials && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground/80">Materiales:</span> {partida.materials}
                    </p>
                  )}
                  {partida.options && partida.options.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {partida.options.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm bg-secondary/50 rounded px-3 py-2"
                        >
                          <span className="text-muted-foreground">• {item.label}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {partida.note && <p className="text-xs text-muted-foreground mt-2 italic">({partida.note})</p>}
                </td>
                <td className="px-4 py-4 text-right align-top">
                  {partida.value && (
                    <span
                      className={`font-semibold ${partida.conditional ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      {partida.value}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
