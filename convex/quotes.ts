import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

const quoteItemValidator = v.object({
  id: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  value: v.number(),
  category: v.optional(v.string()),
  isOptional: v.boolean(),
  isIncluded: v.boolean(),
})

const quoteOptionValidator = v.object({
  id: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  items: v.array(v.string()),
  totalValue: v.number(),
  isRecommended: v.boolean(),
})

const annexItemValidator = v.object({
  id: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  value: v.number(),
  isOptional: v.boolean(),
  isIncluded: v.boolean(),
})

const annexValidator = v.object({
  id: v.string(),
  title: v.string(),
  items: v.array(annexItemValidator),
  totalValue: v.number(),
})

const paymentValidator = v.object({
  id: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  percentage: v.number(),
  amount: v.number(),
  isPaid: v.boolean(),
  paidAt: v.optional(v.number()),
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quotes").order("desc").collect()
  },
})

export const listByStatus = query({
  args: {
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quotes")
      .withIndex("by_status")
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect()
  },
})

export const listByClient = query({
  args: { clientId: v.id("clients") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quotes")
      .withIndex("by_client")
      .filter((q) => q.eq(q.field("clientId"), args.clientId))
      .order("desc")
      .collect()
  },
})

export const get = query({
  args: { id: v.id("quotes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    clientId: v.id("clients"),
    clientName: v.string(),
    clientRut: v.optional(v.string()),
    projectName: v.string(),
    projectType: v.union(
      v.literal("residential"),
      v.literal("commercial"),
      v.literal("industrial"),
      v.literal("renovation"),
      v.literal("emergency"),
      v.literal("regularization"),
    ),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    totalValue: v.number(),
    plan: v.union(v.literal("basic"), v.literal("standard"), v.literal("premium"), v.literal("enterprise")),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
    ),
    items: v.array(quoteItemValidator),
    options: v.optional(v.array(quoteOptionValidator)),
    annexes: v.optional(v.array(annexValidator)),
    payments: v.optional(v.array(paymentValidator)),
    notes: v.optional(v.string()),
    internalNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const quoteId = await ctx.db.insert("quotes", {
      ...args,
      sentAt: args.status === "sent" ? Date.now() : undefined,
    })

    // Update client stats if quote is sent/approved
    if (args.status === "sent" || args.status === "approved") {
      const client = await ctx.db.get(args.clientId)
      if (client) {
        await ctx.db.patch(args.clientId, {
          lastContact: Date.now(),
        })
      }
    }

    return quoteId
  },
})

export const update = mutation({
  args: {
    id: v.id("quotes"),
    projectName: v.optional(v.string()),
    projectType: v.optional(
      v.union(
        v.literal("residential"),
        v.literal("commercial"),
        v.literal("industrial"),
        v.literal("renovation"),
        v.literal("emergency"),
        v.literal("regularization"),
      ),
    ),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    totalValue: v.optional(v.number()),
    plan: v.optional(v.union(v.literal("basic"), v.literal("standard"), v.literal("premium"), v.literal("enterprise"))),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("sent"),
        v.literal("pending"),
        v.literal("approved"),
        v.literal("rejected"),
        v.literal("completed"),
      ),
    ),
    items: v.optional(v.array(quoteItemValidator)),
    options: v.optional(v.array(quoteOptionValidator)),
    annexes: v.optional(v.array(annexValidator)),
    payments: v.optional(v.array(paymentValidator)),
    notes: v.optional(v.string()),
    internalNotes: v.optional(v.string()),
    pdfGeneratedAt: v.optional(v.number()),
    pdfUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const quote = await ctx.db.get(id)
    if (!quote) throw new Error("Quote not found")

    const filtered: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        filtered[key] = value
      }
    }

    // Track status changes
    if (updates.status === "sent" && quote.status !== "sent") {
      filtered.sentAt = Date.now()
    }
    if (updates.status === "approved" && quote.status !== "approved") {
      filtered.approvedAt = Date.now()
      // Update client stats
      const client = await ctx.db.get(quote.clientId)
      if (client) {
        await ctx.db.patch(quote.clientId, {
          totalProjects: client.totalProjects + 1,
          totalValue: client.totalValue + quote.totalValue,
          lastContact: Date.now(),
        })
      }
    }
    if (updates.status === "completed" && quote.status !== "completed") {
      filtered.completedAt = Date.now()
    }

    await ctx.db.patch(id, filtered)
  },
})

export const remove = mutation({
  args: { id: v.id("quotes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Alias for list - getAllQuotes
export const getAllQuotes = list

// Simplified createQuote mutation (without requiring clientId)
export const createQuote = mutation({
  args: {
    clientName: v.string(),
    clientRut: v.optional(v.string()),
    projectTitle: v.string(),
    projectDescription: v.optional(v.string()),
    scope: v.optional(v.string()),
    recommendation: v.optional(v.string()),
    recommendationReason: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Create or find client
    let clientId
    const existingClient = await ctx.db
      .query("clients")
      .withIndex("by_name")
      .filter((q) => q.eq(q.field("name"), args.clientName))
      .first()

    if (existingClient) {
      clientId = existingClient._id
    } else {
      clientId = await ctx.db.insert("clients", {
        name: args.clientName,
        rut: args.clientRut,
        totalProjects: 0,
        totalValue: 0,
        rating: 0,
        responseSpeed: "medium",
      })
    }

    // Create quote with default values
    const quoteId = await ctx.db.insert("quotes", {
      clientId,
      clientName: args.clientName,
      clientRut: args.clientRut,
      projectName: args.projectTitle,
      projectType: "residential",
      description: args.projectDescription,
      totalValue: 0,
      plan: "standard",
      status: "draft",
      items: [],
      notes: args.notes,
    })

    return quoteId
  },
})

// Create complete quote with default line items (Lorena's quote)
export const createCompleteQuote = mutation({
  args: {},
  handler: async (ctx) => {
    // Create default client
    const clientId = await ctx.db.insert("clients", {
      name: "Lorena",
      totalProjects: 0,
      totalValue: 0,
      rating: 0,
      responseSpeed: "medium",
    })

    // Default line items for Lorena's quote
    const defaultItems = [
      {
        id: "1",
        name: "Instalación eléctrica básica",
        description: "Cableado e instalación básica",
        value: 500000,
        category: "instalacion",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "2",
        name: "Tablero eléctrico",
        description: "Tablero principal con protecciones",
        value: 300000,
        category: "equipamiento",
        isOptional: false,
        isIncluded: true,
      },
    ]

    const totalValue = defaultItems.reduce((sum, item) => sum + item.value, 0)

    const quoteId = await ctx.db.insert("quotes", {
      clientId,
      clientName: "Lorena",
      projectName: "Instalación Eléctrica Residencial",
      projectType: "residential",
      description: "Instalación eléctrica completa para vivienda",
      totalValue,
      plan: "standard",
      status: "draft",
      items: defaultItems,
    })

    return quoteId
  },
})

// Get quote with details including line items transformed
export const getQuoteWithDetails = query({
  args: { quoteId: v.id("quotes") },
  handler: async (ctx, args) => {
    const quote = await ctx.db.get(args.quoteId)
    if (!quote) return null

    // Transform items to lineItems format for compatibility
    const lineItems = quote.items.map((item, index) => ({
      _id: item.id,
      title: item.name,
      description: item.description || "",
      value: `$${item.value.toLocaleString("es-CL")}`,
      order: index,
      conditional: item.isOptional && !item.isIncluded,
      materials: undefined,
      options: undefined,
      note: undefined,
    }))

    return {
      ...quote,
      projectTitle: quote.projectName,
      projectDescription: quote.description,
      lineItems,
    }
  },
})

// Get metrics for business intelligence
export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    const quotes = await ctx.db.query("quotes").collect()
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000

    const thisMonthQuotes = quotes.filter((q) => q._creationTime >= thirtyDaysAgo)
    const lastMonthQuotes = quotes.filter((q) => q._creationTime >= sixtyDaysAgo && q._creationTime < thirtyDaysAgo)

    const approvedThisMonth = thisMonthQuotes.filter((q) => q.status === "approved" || q.status === "completed")
    const approvedLastMonth = lastMonthQuotes.filter((q) => q.status === "approved" || q.status === "completed")

    const monthlyRevenue = approvedThisMonth.reduce((sum, q) => sum + q.totalValue, 0)
    const previousMonthRevenue = approvedLastMonth.reduce((sum, q) => sum + q.totalValue, 0)

    const sentThisMonth = thisMonthQuotes.filter((q) => q.status !== "draft").length
    const approvedCount = approvedThisMonth.length
    const conversionRate = sentThisMonth > 0 ? Math.round((approvedCount / sentThisMonth) * 100) : 0

    // Plan stats
    const planStats = (["basic", "standard", "premium", "enterprise"] as const).map((plan) => {
      const planQuotes = quotes.filter((q) => q.plan === plan)
      const planApproved = planQuotes.filter((q) => q.status === "approved" || q.status === "completed")
      return {
        plan,
        quotes: planQuotes.length,
        winRate: planQuotes.length > 0 ? Math.round((planApproved.length / planQuotes.length) * 100) : 0,
      }
    })

    return {
      monthlyRevenue,
      previousMonthRevenue,
      profitMargin: 32, // Could be calculated from actual costs
      avgProjectValue: approvedThisMonth.length > 0 ? Math.round(monthlyRevenue / approvedThisMonth.length) : 0,
      quoteConversion: conversionRate,
      clientSatisfaction: 4.7, // Could come from ratings
      planStats,
      totalQuotes: quotes.length,
      activeQuotes: quotes.filter((q) => q.status === "sent" || q.status === "pending").length,
    }
  },
})
