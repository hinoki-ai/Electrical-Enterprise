import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Clients table
  clients: defineTable({
    name: v.string(),
    rut: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    location: v.optional(v.string()),
    totalProjects: v.number(),
    totalValue: v.number(),
    rating: v.number(),
    responseSpeed: v.union(v.literal("fast"), v.literal("medium"), v.literal("slow")),
    notes: v.optional(v.string()),
    lastContact: v.optional(v.number()),
  })
    .index("by_name", ["name"])
    .index("by_rut", ["rut"]),

  // Quotes/Projects table
  quotes: defineTable({
    // Client reference
    clientId: v.id("clients"),
    clientName: v.string(),
    clientRut: v.optional(v.string()),

    // Project details
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

    // Financial
    totalValue: v.number(),
    plan: v.union(v.literal("basic"), v.literal("standard"), v.literal("premium"), v.literal("enterprise")),

    // Status tracking
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
    ),
    sentAt: v.optional(v.number()),
    approvedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),

    // Line items (partidas)
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.optional(v.string()),
        value: v.number(),
        category: v.optional(v.string()),
        isOptional: v.boolean(),
        isIncluded: v.boolean(),
      }),
    ),

    // Options (like Option A / Option B)
    options: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          description: v.optional(v.string()),
          items: v.array(v.string()), // item IDs included
          totalValue: v.number(),
          isRecommended: v.boolean(),
        }),
      ),
    ),

    // Annexes
    annexes: v.optional(
      v.array(
        v.object({
          id: v.string(),
          title: v.string(),
          items: v.array(
            v.object({
              id: v.string(),
              name: v.string(),
              description: v.optional(v.string()),
              value: v.number(),
              isOptional: v.boolean(),
              isIncluded: v.boolean(),
            }),
          ),
          totalValue: v.number(),
        }),
      ),
    ),

    // Payment structure
    payments: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          description: v.optional(v.string()),
          percentage: v.number(),
          amount: v.number(),
          isPaid: v.boolean(),
          paidAt: v.optional(v.number()),
        }),
      ),
    ),

    // PDF metadata
    pdfGeneratedAt: v.optional(v.number()),
    pdfUrl: v.optional(v.string()),

    // Notes
    notes: v.optional(v.string()),
    internalNotes: v.optional(v.string()),
  })
    .index("by_client", ["clientId"])
    .index("by_status", ["status"])
    .index("by_creation", ["_creationTime"]),

  // Materials catalog
  materials: defineTable({
    name: v.string(),
    brand: v.optional(v.string()),
    unit: v.string(),
    unitPrice: v.number(),
    category: v.string(),
    specifications: v.optional(v.string()),
  })
    .index("by_category", ["category"])
    .index("by_name", ["name"]),

  // Quote templates
  templates: defineTable({
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
  }).index("by_type", ["projectType"]),

  // Business settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
})
