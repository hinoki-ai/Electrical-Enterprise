import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").order("desc").collect()
  },
})

export const get = query({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const getByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_name")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first()
  },
})

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const allClients = await ctx.db.query("clients").collect()
    const searchLower = args.query.toLowerCase()
    return allClients.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.rut?.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower),
    )
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    rut: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clients", {
      ...args,
      totalProjects: 0,
      totalValue: 0,
      rating: 5,
      responseSpeed: "medium",
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("clients"),
    name: v.optional(v.string()),
    rut: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    location: v.optional(v.string()),
    rating: v.optional(v.number()),
    responseSpeed: v.optional(v.union(v.literal("fast"), v.literal("medium"), v.literal("slow"))),
    notes: v.optional(v.string()),
    lastContact: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const filtered = Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined))
    await ctx.db.patch(id, filtered)
  },
})

export const incrementStats = mutation({
  args: {
    id: v.id("clients"),
    projectValue: v.number(),
  },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.id)
    if (!client) throw new Error("Client not found")

    await ctx.db.patch(args.id, {
      totalProjects: client.totalProjects + 1,
      totalValue: client.totalValue + args.projectValue,
      lastContact: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
