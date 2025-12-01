"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { Zap, Lock, User } from "lucide-react"
import type { User } from "@/components/auth-context"

interface SignupPanelProps {
  onSignupSuccess: (user: User) => void
  onShowLogin: () => void
}

export function SignupPanel({ onSignupSuccess, onShowLogin }: SignupPanelProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const createMasterUser = useMutation(api.auth.createMasterUser)

  // Dismiss keyboard on swipe up
  const dismissKeyboard = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  const swipeHandlers = {
    onTouchStart: dismissKeyboard,
    onTouchMove: dismissKeyboard,
    onTouchEnd: dismissKeyboard,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!username.trim() || !password.trim()) {
        setError("Please fill in all fields")
        return
      }

      // Username validation
      if (username.length < 3) {
        setError("Username must be at least 3 characters long")
        return
      }

      if (username.length > 30) {
        setError("Username must be no more than 30 characters long")
        return
      }

      // Check if username contains only alphanumeric characters and underscores
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError("Username can only contain letters, numbers, and underscores")
        return
      }

      // Password strength validation
      if (password.length < 8) {
        setError("Password must be at least 8 characters long")
        return
      }

      if (!/[a-zA-Z]/.test(password)) {
        setError("Password must contain at least one letter")
        return
      }

      if (!/\d/.test(password)) {
        setError("Password must contain at least one number")
        return
      }

      // Check for common weak passwords
      const weakPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123']
      if (weakPasswords.includes(password.toLowerCase())) {
        setError("This password is too common. Please choose a more secure password")
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      // Since this is a private enterprise system, we'll use the createMasterUser function
      // But first check if a master user already exists
      const result = await createMasterUser({
        email: `${username}@enterprise.local`, // Create a dummy email since we don't need it
        username: username.trim(),
        password: password.trim(),
      })

      if (!result) {
        setError("Failed to create account. Please try again.")
        return
      }

      onSignupSuccess(result as User)
    } catch (err) {
      console.error("Signup error:", err)

      // Map error messages to user-friendly messages
      let userMessage = "An error occurred while creating your account. Please try again."

      if (err instanceof Error) {
        const errorMsg = err.message.toLowerCase()

        if (errorMsg.includes("username already exists") || errorMsg.includes("username ya existe")) {
          userMessage = "This username is already taken. Please choose a different username."
        } else         if (errorMsg.includes("username is required") || errorMsg.includes("username") && errorMsg.includes("required")) {
          userMessage = "Username is required. Please enter a username."
        } else if (errorMsg.includes("password") && errorMsg.includes("required")) {
          userMessage = "Password is required. Please enter a password."
        } else if (errorMsg.includes("password must be at least") || errorMsg.includes("8 characters")) {
          userMessage = "Password must be at least 8 characters long."
        } else if (errorMsg.includes("letra") || errorMsg.includes("número") || errorMsg.includes("number")) {
          userMessage = "Password must contain at least one letter and one number."
        } else if (errorMsg.includes("invalid email") || errorMsg.includes("email") && errorMsg.includes("invalid")) {
          userMessage = "Email format is invalid. Please check your email."
        } else if (errorMsg.includes("network") || errorMsg.includes("connection") || errorMsg.includes("fetch")) {
          userMessage = "Connection error. Please check your internet and try again."
        } else if (errorMsg.includes("timeout")) {
          userMessage = "Request timed out. Please try again."
        } else if (err.message && err.message.length < 100) {
          userMessage = err.message
        }
      }

      setError(userMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm login-panel">
      {/* Signup Card */}
      <Card className="bg-gradient-to-br from-orange-200/90 via-orange-200/90 to-orange-100/90 backdrop-blur-2xl shadow-xl">
        <CardHeader className="pb-0">
          {/* Electrical Enterprise Header */}
          <div className="text-center mb-4 max-w-[95%] mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Electrical Enterprise
              </h1>
            </div>
          </div>

          <div className="text-center -mt-4 -mb-4">
            <p className="text-sm text-slate-700 font-medium">
              Private Enterprise System
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-0">
          <form onSubmit={handleSubmit} className="space-y-4" {...swipeHandlers}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-slate-900">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 rounded-lg pl-10 text-sm bg-yellow-100/80"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-900">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-500 z-10" />
                  <PasswordInput
                    id="password"
                    placeholder="Minimum 8 characters (letters and numbers)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 rounded-lg pl-10 text-sm bg-yellow-100/80"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-900">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-500 z-10" />
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-10 rounded-lg pl-10 text-sm bg-yellow-100/80"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-900/20 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-7 mt-2 w-full rounded-lg font-medium text-sm text-slate-800 bg-gradient-to-r from-yellow-200 via-orange-300 to-orange-500 hover:from-yellow-300 hover:via-orange-400 hover:to-orange-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center -mt-4 -mb-5">
              <p className="text-slate-900 text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={onShowLogin}
                  className="p-0 h-auto font-semibold text-slate-900 hover:text-slate-800"
                >
                  Sign In
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
