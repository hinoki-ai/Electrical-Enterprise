"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useAuth() {
  const currentUser = useQuery(api.auth.getCurrentUser);
  const isAuthenticated = useQuery(api.auth.isAuthenticated);

  const logout = () => {
    window.location.href = "/";
  };

  return {
    user: currentUser,
    isAuthenticated: isAuthenticated ?? false,
    isLoading: currentUser === undefined || isAuthenticated === undefined,
    logout,
  };
}

