export function PartidasTable() {
  const partidas = [
    {
      id: 1,
      title: "Cambio de switch/conmutador",
      description: "Suministro e instalación de conmutador en tablero de 42 A para conexión de generador.",
      value: "$100.000",
    },
    {
      id: 2,
      title: "Preparación de pisos y obras civiles",
      description: "Recuperación de baldosas, visitas técnicas (Sodimac y vendedor de piedra laja) y asesoría.",
      value: "$70.000",
    },
    {
      id: 3,
      title: "Recableado de circuitos (norma SEC)",
      description: "Instalación de dos subalimentadores y división de ramales para separar enchufes y luces.",
      materials: "Cable EVA Nexans (2.5 mm / 1.5 mm), tierra de protección y canaletas Legrand.",
      subItems: [
        { label: "Primer piso", value: "$650.000" },
        { label: "Ambos pisos", value: "$850.000" },
      ],
    },
    {
      id: 4,
      title: "Recableado habitación principal y baño",
      description: "Reinstalación de 4 enchufes y 1 luminaria. Definición del color de línea al momento de compra.",
      subItems: [
        { label: "Solo habitación", value: "$190.000" },
        { label: "Habitación + baño", value: "$250.000" },
      ],
    },
    {
      id: 5,
      title: "Inspección y reparación 2.º piso",
      description: "Revisión y arreglo de falla eléctrica.",
      value: "$50.000",
      note: "Se descuenta si se elige recableado completo – Opción B",
      conditional: true,
    },
  ]

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
            {partidas.map((partida) => (
              <tr key={partida.id} className="group">
                <td className="px-4 py-4 align-top">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-sm font-medium text-foreground">
                    {partida.id}
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
                  {partida.subItems && (
                    <div className="mt-3 space-y-1.5">
                      {partida.subItems.map((item, idx) => (
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
