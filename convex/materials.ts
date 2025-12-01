import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("materials").collect()
  },
})

export const listByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("materials")
      .withIndex("by_category")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect()
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    brand: v.optional(v.string()),
    unit: v.string(),
    unitPrice: v.number(),
    category: v.string(),
    specifications: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("materials", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("materials"),
    name: v.optional(v.string()),
    brand: v.optional(v.string()),
    unit: v.optional(v.string()),
    unitPrice: v.optional(v.number()),
    category: v.optional(v.string()),
    specifications: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const filtered = Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined))
    await ctx.db.patch(id, filtered)
  },
})

export const remove = mutation({
  args: { id: v.id("materials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Seed common electrical materials
export const seedDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("materials").collect()
    if (existing.length > 0) return

    const materials = [
      { name: "Cable EVA 2.5mm", brand: "Nexans", unit: "metro", unitPrice: 850, category: "Cables" },
      { name: "Cable EVA 1.5mm", brand: "Nexans", unit: "metro", unitPrice: 650, category: "Cables" },
      { name: "Cable EVA 4.0mm", brand: "Nexans", unit: "metro", unitPrice: 1200, category: "Cables" },
      { name: "Canaleta 20x12", brand: "Legrand", unit: "unidad", unitPrice: 2500, category: "Canaletas" },
      { name: "Canaleta 32x12", brand: "Legrand", unit: "unidad", unitPrice: 3500, category: "Canaletas" },
      { name: "Enchufe doble", brand: "BTicino", unit: "unidad", unitPrice: 8500, category: "Enchufes" },
      { name: "Enchufe simple", brand: "BTicino", unit: "unidad", unitPrice: 5500, category: "Enchufes" },
      { name: "Interruptor simple", brand: "BTicino", unit: "unidad", unitPrice: 4500, category: "Interruptores" },
      { name: "Interruptor doble", brand: "BTicino", unit: "unidad", unitPrice: 7500, category: "Interruptores" },
      { name: "Conmutador", brand: "BTicino", unit: "unidad", unitPrice: 6500, category: "Interruptores" },
      { name: "Tablero 12 polos", brand: "Schneider", unit: "unidad", unitPrice: 45000, category: "Tableros" },
      { name: "Tablero 24 polos", brand: "Schneider", unit: "unidad", unitPrice: 75000, category: "Tableros" },
      { name: "Automático 10A", brand: "Schneider", unit: "unidad", unitPrice: 8500, category: "Protecciones" },
      { name: "Automático 16A", brand: "Schneider", unit: "unidad", unitPrice: 8500, category: "Protecciones" },
      { name: "Automático 20A", brand: "Schneider", unit: "unidad", unitPrice: 9000, category: "Protecciones" },
      { name: "Diferencial 25A", brand: "Schneider", unit: "unidad", unitPrice: 35000, category: "Protecciones" },
      { name: "Luminaria LED panel", brand: "Philips", unit: "unidad", unitPrice: 25000, category: "Iluminación" },
      { name: "Luminaria exterior", brand: "Philips", unit: "unidad", unitPrice: 35000, category: "Iluminación" },
    ]

    for (const m of materials) {
      await ctx.db.insert("materials", m)
    }
  },
})
