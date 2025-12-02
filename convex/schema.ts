import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Users table for authentication
  users: defineTable({
    email: v.string(), // User's email - must be unique (enforced by application logic)
    username: v.string(), // Unique username - must be unique across all users
    password: v.string(), // Will be hashed using PBKDF2
    role: v.optional(v.union(v.literal("master"), v.literal("quoter"))), // Global role: master (admin) or quoter (user)
    createdAt: v.number(),
    needsPasswordChange: v.optional(v.boolean()), // Track if user needs to change password
    createdBy: v.optional(v.id("users")), // Who created this user
    avatar: v.optional(v.string()), // Avatar image URL
    displayName: v.optional(v.string()), // Custom display name set by user
    hasCompletedWelcome: v.optional(v.boolean()), // Track if user has completed welcome setup
    emailVerified: v.optional(v.boolean()), // Track if user has verified their email
    emailVerificationToken: v.optional(v.string()), // Verification token sent via email
    emailVerificationExpiresAt: v.optional(v.number()), // When the verification token expires
    resetToken: v.optional(v.string()), // Password reset token
    resetTokenExpiresAt: v.optional(v.number()), // When the reset token expires
  }).index("email", ["email"]).index("username", ["username"]).index("role", ["role"]),

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
    .index("by_status", ["status"]),

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

  // Calculator sessions for storing calculator state and presets
  calculatorSessions: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    sessionKey: v.optional(v.string()), // For anonymous sessions

    // Calculator configuration
    selectedPlanId: v.string(),
    projectValue: v.number(),
    billingCycle: v.string(), // "monthly" | "quarterly" | "semestral" | "annual"
    projectSize: v.string(), // "small" | "medium" | "large" | "industrial"
    materialQuality: v.string(), // "standard" | "premium"
    urgency: v.string(), // "normal" | "priority" | "urgent"
    paymentType: v.string(), // "monthly" | "upfront"
    includeVAT: v.boolean(),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
    isPreset: v.boolean(), // true for saved presets, false for temporary sessions
    userId: v.optional(v.string()), // null for anonymous sessions
  })
    .index("by_user", ["userId"])
    .index("by_preset", ["isPreset"])
    .index("by_session_key", ["sessionKey"]),

  // Business settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
})
