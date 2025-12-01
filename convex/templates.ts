import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("templates").collect()
  },
})

export const getByType = query({
  args: { projectType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("templates")
      .withIndex("by_type")
      .filter((q) => q.eq(q.field("projectType"), args.projectType))
      .collect()
  },
})

export const getDefault = query({
  args: { projectType: v.string() },
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_type")
      .filter((q) => q.eq(q.field("projectType"), args.projectType))
      .collect()
    return templates.find((t) => t.isDefault) || templates[0]
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    projectType: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.optional(v.string()),
        defaultValue: v.number(),
        category: v.optional(v.string()),
        isOptional: v.boolean(),
      }),
    ),
    isDefault: v.boolean(),
  },
  handler: async (ctx, args) => {
    // If this is default, unset other defaults for this type
    if (args.isDefault) {
      const existing = await ctx.db
        .query("templates")
        .withIndex("by_type")
        .filter((q) => q.eq(q.field("projectType"), args.projectType))
        .collect()
      for (const t of existing) {
        if (t.isDefault) {
          await ctx.db.patch(t._id, { isDefault: false })
        }
      }
    }
    return await ctx.db.insert("templates", args)
  },
})

export const remove = mutation({
  args: { id: v.id("templates") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Seed default templates
export const seedDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("templates").collect()
    if (existing.length > 0) return

    // Residential template based on the original PDF
    await ctx.db.insert("templates", {
      name: "Proyecto Residencial Completo",
      description: "Instalación eléctrica residencial con recableado y regularización",
      projectType: "residential",
      isDefault: true,
      items: [
        {
          id: "switch",
          name: "Cambio de switch/conmutador",
          description: "Suministro e instalación de conmutador en tablero de 42 A para conexión de generador",
          defaultValue: 100000,
          category: "Instalación",
          isOptional: false,
        },
        {
          id: "civil",
          name: "Preparación de pisos y obras civiles",
          description: "Recuperación de baldosas, visitas técnicas y asesoría",
          defaultValue: 70000,
          category: "Obra Civil",
          isOptional: false,
        },
        {
          id: "recableado_p1",
          name: "Recableado primer piso (norma SEC)",
          description:
            "Instalación de subalimentadores y división de ramales. Materiales: cable EVA Nexans (2.5mm/1.5mm), tierra de protección y canaletas Legrand",
          defaultValue: 650000,
          category: "Recableado",
          isOptional: false,
        },
        {
          id: "recableado_p2",
          name: "Recableado ambos pisos (norma SEC)",
          description:
            "Instalación de subalimentadores y división de ramales para ambos pisos. Materiales: cable EVA Nexans (2.5mm/1.5mm), tierra de protección y canaletas Legrand",
          defaultValue: 850000,
          category: "Recableado",
          isOptional: true,
        },
        {
          id: "habitacion",
          name: "Recableado habitación principal",
          description: "Reinstalación de 4 enchufes y 1 luminaria",
          defaultValue: 190000,
          category: "Recableado",
          isOptional: false,
        },
        {
          id: "enchufe_individual",
          name: "Enchufe individual",
          description: "Suministro e instalación de enchufe simple",
          defaultValue: 30000,
          category: "Enchufes",
          isOptional: true,
        },
        {
          id: "enchufe_doble",
          name: "Enchufe doble",
          description: "Suministro e instalación de enchufe doble",
          defaultValue: 45000,
          category: "Enchufes",
          isOptional: true,
        },
        {
          id: "habitacion_bano",
          name: "Recableado habitación + baño",
          description: "Reinstalación de enchufes y luminarias en habitación principal y baño",
          defaultValue: 250000,
          category: "Recableado",
          isOptional: true,
        },
        {
          id: "inspeccion_p2",
          name: "Inspección y reparación 2º piso",
          description: "Revisión y arreglo de falla eléctrica (se descuenta si se elige recableado completo)",
          defaultValue: 50000,
          category: "Inspección",
          isOptional: true,
        },
      ],
    })

    // Emergency template
    await ctx.db.insert("templates", {
      name: "Reparación de Emergencia",
      description: "Reparación eléctrica urgente",
      projectType: "emergency",
      isDefault: true,
      items: [
        {
          id: "diagnostico",
          name: "Diagnóstico de emergencia",
          description: "Evaluación urgente del problema eléctrico",
          defaultValue: 50000,
          category: "Diagnóstico",
          isOptional: false,
        },
        {
          id: "reparacion",
          name: "Reparación urgente",
          description: "Reparación del problema detectado",
          defaultValue: 150000,
          category: "Reparación",
          isOptional: false,
        },
        {
          id: "materiales",
          name: "Materiales de emergencia",
          description: "Materiales necesarios para la reparación",
          defaultValue: 75000,
          category: "Materiales",
          isOptional: false,
        },
      ],
    })

    // Commercial template
    await ctx.db.insert("templates", {
      name: "Proyecto Comercial",
      description: "Instalación eléctrica para locales comerciales",
      projectType: "commercial",
      isDefault: true,
      items: [
        {
          id: "tablero",
          name: "Tablero eléctrico comercial",
          description: "Suministro e instalación de tablero trifásico",
          defaultValue: 450000,
          category: "Tablero",
          isOptional: false,
        },
        {
          id: "cableado",
          name: "Cableado general",
          description: "Instalación de circuitos para iluminación y enchufes",
          defaultValue: 800000,
          category: "Cableado",
          isOptional: false,
        },
        {
          id: "iluminacion",
          name: "Sistema de iluminación",
          description: "Instalación de luminarias comerciales",
          defaultValue: 350000,
          category: "Iluminación",
          isOptional: false,
        },
        {
          id: "enchufe_comercial",
          name: "Enchufe comercial",
          description: "Suministro e instalación de enchufe industrial/comercial",
          defaultValue: 50000,
          category: "Enchufes",
          isOptional: true,
        },
        {
          id: "interruptor",
          name: "Interruptor simple",
          description: "Suministro e instalación de interruptor",
          defaultValue: 25000,
          category: "Interruptores",
          isOptional: true,
        },
      ],
    })
  },
})
