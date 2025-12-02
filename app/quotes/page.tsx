"use client"

import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { QuotesQueue } from "@/components/dashboard/quotes-queue"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDivineParsing } from "@/components/language/ChunkedLanguageProvider"

export default function QuotesPage() {
  const { t } = useDivineParsing(["quotes"])
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{t("page.title")}</h1>
              <p className="text-muted-foreground">{t("page.description")}</p>
            </div>
            <Link href="/quote/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
{t("new_quote")}
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("search.placeholder")}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
{t("filters")}
            </Button>
          </div>
        </div>

        <QuotesQueue />
      </main>

      <MobileNav />
    </div>
  )
}
