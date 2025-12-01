import { query } from "./_generated/server";

// Anonymous access - no user authentication required
// This is suitable for a quote management system where anyone can create quotes

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Return anonymous user for quote management
    return {
      _id: "anonymous",
      name: "Anonymous User",
      email: "",
      role: "user",
    };
  },
});

export const isAuthenticated = query({
  args: {},
  handler: async (ctx) => {
    // Always allow access for anonymous quote management
    return true;
  },
});

