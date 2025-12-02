"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User, Lock, Zap } from "lucide-react"
import type { User as UserType } from "@/components/auth-context"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: UserType) => void
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const authenticateUser = useMutation(api.auth.authenticateUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin()
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      if (!username.trim() || !password.trim()) {
        setError("Por favor completa todos los campos")
        setIsLoading(false)
        return
      }

      const user = await authenticateUser({
        username: username.trim().toLowerCase(),
        password: password.trim(),
      })

      if (!user) {
        setError("Usuario o contraseña inválidos. Por favor verifica tus credenciales e intenta nuevamente.")
        setIsLoading(false)
        return
      }

      onLoginSuccess(user)
      onClose()
    } catch (err) {
      console.error("Login error:", err)

      // Map error messages to user-friendly messages
      let userMessage = "Ocurrió un error al iniciar sesión. Por favor intenta nuevamente."

      if (err instanceof Error) {
        const errorMsg = err.message.toLowerCase()

        if (errorMsg.includes("user not found") || errorMsg.includes("usuario no encontrado")) {
          userMessage = "No se encontró una cuenta con este usuario. Por favor verifica tu usuario o regístrate."
        } else if (errorMsg.includes("incorrect") || errorMsg.includes("password") || errorMsg.includes("contraseña")) {
          userMessage = "Usuario o contraseña inválidos. Por favor verifica tus credenciales e intenta nuevamente."
        } else if (errorMsg.includes("network") || errorMsg.includes("connection") || errorMsg.includes("fetch")) {
          userMessage = "Error de conexión. Por favor verifica tu internet e intenta nuevamente."
        } else if (errorMsg.includes("timeout")) {
          userMessage = "La solicitud expiró. Por favor intenta nuevamente."
        } else if (err.message && err.message.length < 100) {
          userMessage = err.message
        }
      }

      setError(userMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setUsername("")
    setPassword("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Iniciar Sesión
          </DialogTitle>
          <DialogDescription className="text-base">
            Ingresa tus credenciales para acceder a tu cuenta
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-username" className="text-base font-medium">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  id="login-username"
                  type="text"
                  placeholder="tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-lg pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="text-base font-medium">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground z-10" />
                <PasswordInput
                  id="login-password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg pl-10"
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

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 h-12 bg-orange-200 hover:bg-orange-300 text-orange-900 font-medium"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Iniciando sesión...
                </div>
              ) :
                "Iniciar Sesión"
              }
            </Button>
          </div>

          <div className="text-center mt-4 space-y-2">
            <p className="text-muted-foreground text-sm">
              Electrical Enterprise - Acceso Privado Únicamente
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
