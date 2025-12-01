import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all calculator presets for a user
export const getUserPresets = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("calculatorSessions")
      .withIndex("by_preset", (q) => q.eq("isPreset", true));

    if (args.userId) {
      query = query.filter((q) => q.eq("userId", args.userId));
    }

    return await query.order("desc").collect();
  },
});

// Get a specific calculator session
export const getSession = query({
  args: { sessionId: v.id("calculatorSessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

// Create a new calculator session (for presets or temporary state)
export const createSession = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    selectedPlanId: v.string(),
    projectValue: v.number(),
    billingCycle: v.string(),
    projectSize: v.string(),
    materialQuality: v.string(),
    urgency: v.string(),
    paymentType: v.string(),
    includeVAT: v.boolean(),
    isPreset: v.boolean(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("calculatorSessions", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update an existing calculator session
export const updateSession = mutation({
  args: {
    sessionId: v.id("calculatorSessions"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    selectedPlanId: v.optional(v.string()),
    projectValue: v.optional(v.number()),
    billingCycle: v.optional(v.string()),
    projectSize: v.optional(v.string()),
    materialQuality: v.optional(v.string()),
    urgency: v.optional(v.string()),
    paymentType: v.optional(v.string()),
    includeVAT: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { sessionId, ...updates } = args;
    await ctx.db.patch(sessionId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete a calculator session
export const deleteSession = mutation({
  args: { sessionId: v.id("calculatorSessions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sessionId);
  },
});

// Save current calculator state as a preset
export const saveAsPreset = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    selectedPlanId: v.string(),
    projectValue: v.number(),
    billingCycle: v.string(),
    projectSize: v.string(),
    materialQuality: v.string(),
    urgency: v.string(),
    paymentType: v.string(),
    includeVAT: v.boolean(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("calculatorSessions", {
      ...args,
      isPreset: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get anonymous session by session key
export const getAnonymousSession = query({
  args: { sessionKey: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("calculatorSessions")
      .withIndex("by_session_key", (q) => q.eq("sessionKey", args.sessionKey))
      .filter((q) => q.neq("isPreset", true))
      .collect();

    return sessions[0] || null; // Return the first (most recent) session
  },
});

// Create or update a temporary session for anonymous users
export const upsertAnonymousSession = mutation({
  args: {
    sessionKey: v.string(), // Unique key for anonymous sessions
    selectedPlanId: v.string(),
    projectValue: v.number(),
    billingCycle: v.string(),
    projectSize: v.string(),
    materialQuality: v.string(),
    urgency: v.string(),
    paymentType: v.string(),
    includeVAT: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { sessionKey, ...data } = args;

    // Check if session already exists
    const existingSessions = await ctx.db
      .query("calculatorSessions")
      .withIndex("by_session_key", (q) => q.eq("sessionKey", args.sessionKey))
      .filter((q) => q.neq("isPreset", true))
      .collect();

    const now = Date.now();

    if (existingSessions.length > 0) {
      // Update existing session
      const sessionId = existingSessions[0]._id;
      await ctx.db.patch(sessionId, {
        ...data,
        updatedAt: now,
      });
      return sessionId;
    } else {
      // Create new session
      return await ctx.db.insert("calculatorSessions", {
        name: `Anonymous Session ${sessionKey}`,
        sessionKey,
        ...data,
        isPreset: false,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});
