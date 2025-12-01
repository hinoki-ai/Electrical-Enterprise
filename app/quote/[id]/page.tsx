"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { QuoteEditor } from "@/components/quote/quote-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function QuotePage() {
  const params = useParams()
  const router = useRouter()
  const quoteId = params.id as Id<"quotes">

  const quote = useQuery(api.quotes.get, { id: quoteId })
  const client = useQuery(api.clients.get, quote ? { id: quote.clientId } : "skip")

  if (quote === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (quote === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Cotización no encontrada</p>
        <Button asChild>
          <Link href="/">Volver al Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-lg">{quote.projectName}</h1>
            <p className="text-sm text-muted-foreground">{quote.clientName}</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <QuoteEditor quote={quote} client={client} />
      </main>
    </div>
  )
}
