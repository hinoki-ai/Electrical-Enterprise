import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { hashPasswordUtil, verifyPasswordUtil } from "./auth_actions";

// Validate password strength
function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least one letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  // Check for common weak passwords
  const weakPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123']
  if (weakPasswords.includes(password.toLowerCase())) {
    errors.push("This password is too common. Please choose a more secure password")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create master user - simplified for private enterprise use
export const createMasterUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const username = args.username.trim()
    const password = args.password.trim()

    if (!username) {
      throw new Error("Username is required")
    }

    if (!password) {
      throw new Error("Password is required")
    }

    // Validate username
    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long")
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error("Username can only contain letters, numbers, and underscores")
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(". "))
    }

    // Check if any users already exist (we want only one master user)
    const existingUsers = await ctx.db.query("users").collect()
    if (existingUsers.length > 0) {
      throw new Error("A master user already exists in the system")
    }

    // Hash the password
    const hashedPassword = await hashPasswordUtil(password)

    // Create master user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      username: username.toLowerCase(), // Store username in lowercase for case-insensitive login
      password: hashedPassword,
      role: "master",
      createdAt: Date.now(),
      needsPasswordChange: false,
      hasCompletedWelcome: true,
      emailVerified: true,
    })

    console.log(`✅ Master user created: ${username}`)

    return {
      _id: userId,
      email: args.email,
      username: username.toLowerCase(),
      role: "master",
      createdAt: Date.now(),
      hasCompletedWelcome: true,
      emailVerified: true,
    }
  },
})

// Simplified login function - only master user can log in
export const authenticateUser = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const inputUsername = args.username.trim()
    const trimmedPassword = args.password.trim()

    console.log("🔐 Login attempt:", { username: inputUsername })

    // Find user by username (case-insensitive search)
    const user = await ctx.db
      .query("users")
      .withIndex("username", (q) => q.eq("username", inputUsername.toLowerCase()))
      .first()

    if (!user) {
      console.log("❌ User not found with username:", inputUsername)
      return null
    }

    console.log("✅ User found:", { username: user.username, role: user.role })

    // Verify password
    const passwordMatches = await verifyPasswordUtil(trimmedPassword, user.password)

    if (!passwordMatches) {
      console.log("❌ Password mismatch")
      return null
    }

    console.log("✅ Authentication successful for user:", user.username)

    // Return user without password
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "master",
      createdAt: user.createdAt,
      hasCompletedWelcome: user.hasCompletedWelcome,
      displayName: user.displayName,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
    }
  },
})

// Simple login function (alias for authenticateUser)
export const login = authenticateUser

export const getCurrentUser = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "master",
      createdAt: user.createdAt,
      hasCompletedWelcome: user.hasCompletedWelcome,
      displayName: user.displayName,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
    }
  },
})

export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()
    return users.map(user => ({
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "master",
      createdAt: user.createdAt,
    }))
  },
})

export const isAuthenticated = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()
    return users.length > 0
  },
})