"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { HomepageMobile } from "@/components/homepage-mobile"
import { HomepageDesktop } from "@/components/homepage-desktop"
import { LoginModal } from "@/components/login-modal"
import type { User } from "@/components/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const { isAuthenticated, isInitializing, user, login } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [showLogin, setShowLogin] = useState(false)

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isInitializing && isAuthenticated && user) {
      router.push("/dashboard")
    }
  }, [isInitializing, isAuthenticated, user, router])

  const handleSignupSuccess = (user: User) => {
    // Log the user in immediately after signup
    login(user)
    // Redirect will happen via useEffect when user is loaded
  }

  const handleCloseLogin = () => {
    setShowLogin(false)
  }

  // Show loading while checking authentication
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold mb-2">Cargando...</h1>
        </div>
      </div>
    )
  }

  // Authenticated users will be redirected to dashboard
  // Show homepage for unauthenticated users

  return (
    <>
      {isMobile ? (
        <HomepageMobile
          onSignupSuccess={handleSignupSuccess}
          onShowLogin={() => setShowLogin(true)}
        />
      ) : (
        <HomepageDesktop
          onSignupSuccess={handleSignupSuccess}
          onShowLogin={() => setShowLogin(true)}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onClose={handleCloseLogin}
          onLoginSuccess={(user) => {
            // Log the user in
            login(user)
            setShowLogin(false)
            // Redirect will happen via useEffect when user is loaded
          }}
        />
      )}
    </>
  )
}
