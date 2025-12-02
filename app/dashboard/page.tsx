"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { useDivineParsing } from "@/components/language/ChunkedLanguageProvider"
import { DashboardHeader } from "@/components/dashboard/header"
import { QuickQuote } from "@/components/dashboard/quick-quote"
import { QuotesQueue } from "@/components/dashboard/quotes-queue"
import { CalculatorWidget } from "@/components/dashboard/calculator-widget"
import { ClientManager } from "@/components/dashboard/client-manager"
import { BusinessIntelligence } from "@/components/dashboard/business-intelligence"
import { ToolsPanel } from "@/components/dashboard/tools-panel"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function Dashboard() {
  const { isAuthenticated, isInitializing, user } = useAuth()
  const { t } = useDivineParsing(["dashboard"])
  const router = useRouter()

  // Redirect unauthenticated users to homepage
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push("/")
    }
  }, [isInitializing, isAuthenticated, router])

  // Show loading while checking authentication
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold mb-2">{t("loading")}</h1>
        </div>
      </div>
    )
  }

  // Don't render dashboard for unauthenticated users
  if (!isAuthenticated || !user) {
    return null
  }
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Primary Actions */}
          <div className="lg:col-span-8 space-y-6">
            <QuickQuote />
            <QuotesQueue />
            <ClientManager />
          </div>

          {/* Right Column - Tools & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <CalculatorWidget />
            <BusinessIntelligence />
            <ToolsPanel />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
