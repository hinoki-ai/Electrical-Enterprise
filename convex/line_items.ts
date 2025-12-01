import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Add a line item to a quote
export const addLineItem = mutation({
  args: {
    quoteId: v.id("quotes"),
    title: v.string(),
    description: v.string(),
    value: v.optional(v.string()),
    materials: v.optional(v.string()),
    note: v.optional(v.string()),
    conditional: v.optional(v.boolean()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { quoteId, ...itemData } = args;
    return await ctx.db.insert("lineItems", {
      quoteId,
      ...itemData,
    });
  },
});

// Add an option to a line item
export const addLineItemOption = mutation({
  args: {
    lineItemId: v.id("lineItems"),
    label: v.string(),
    value: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { lineItemId, ...optionData } = args;
    return await ctx.db.insert("lineItemOptions", {
      lineItemId,
      ...optionData,
    });
  },
});

// Update a line item
export const updateLineItem = mutation({
  args: {
    lineItemId: v.id("lineItems"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    value: v.optional(v.string()),
    materials: v.optional(v.string()),
    note: v.optional(v.string()),
    conditional: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { lineItemId, ...updates } = args;
    await ctx.db.patch(lineItemId, updates);
  },
});

// Delete a line item and its options
export const deleteLineItem = mutation({
  args: { lineItemId: v.id("lineItems") },
  handler: async (ctx, args) => {
    // Delete all options first
    const options = await ctx.db
      .query("lineItemOptions")
      .withIndex("by_line_item", (q) => q.eq("lineItemId", args.lineItemId))
      .collect();

    await Promise.all(options.map(option => ctx.db.delete(option._id)));

    // Delete the line item
    await ctx.db.delete(args.lineItemId);
  },
});
