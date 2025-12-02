"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export interface User {
  _id: Id<"users">
  email: string
  username: string
  role: "master" | "quoter"
  createdAt: number
  hasCompletedWelcome?: boolean
  displayName?: string
  avatar?: string
  emailVerified?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const currentUser = useQuery(api.auth.getCurrentUser)
  const isAuthenticatedQuery = useQuery(api.auth.isAuthenticated)

  const login = (userData: User) => {
    // This is just for optimistic updates, the actual state comes from Convex queries
    // The login/logout actions should be handled by Convex mutations
  }

  const logout = () => {
    // This is just for optimistic updates, the actual state comes from Convex queries
    // The login/logout actions should be handled by Convex mutations
    // Redirect to homepage for login
    window.location.href = "/"
  }

  const value: AuthContextType = {
    user: currentUser ?? null,
    isAuthenticated: isAuthenticatedQuery ?? false,
    isInitializing: currentUser === undefined || isAuthenticatedQuery === undefined,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
