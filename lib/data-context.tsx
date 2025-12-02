"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export type QuoteStatus = "draft" | "sent" | "pending" | "approved" | "rejected"
export type ProjectType = "residential" | "commercial" | "industrial" | "renovation" | "emergency"
export type Plan = "basic" | "standard" | "premium" | "enterprise"

export interface Quote {
  id: string
  clientId: string
  clientName: string
  clientPhone?: string
  projectName: string
  projectType: ProjectType
  value: number
  plan: Plan
  status: QuoteStatus
  createdAt: Date
  updatedAt: Date
  sentAt?: Date
  notes?: string
}

export interface Client {
  id: string
  name: string
  phone?: string
  email?: string
  totalProjects: number
  totalValue: number
  rating: number
  responseSpeed: "fast" | "medium" | "slow"
  createdAt: Date
  lastContact?: Date
}

export interface BusinessMetrics {
  monthlyRevenue: number
  previousMonthRevenue: number
  profitMargin: number
  avgProjectValue: number
  quoteConversion: number
  clientSatisfaction: number
  planStats: {
    plan: Plan
    quotes: number
    winRate: number
  }[]
}

interface DataContextType {
  quotes: Quote[]
  clients: Client[]
  metrics: BusinessMetrics
  addQuote: (quote: Omit<Quote, "id" | "createdAt" | "updatedAt">) => void
  updateQuote: (id: string, updates: Partial<Quote>) => void
  deleteQuote: (id: string) => void
  addClient: (client: Omit<Client, "id" | "createdAt" | "totalProjects" | "totalValue">) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  getClientByName: (name: string) => Client | undefined
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    try {
      const savedQuotes = localStorage.getItem("electriquote_quotes")
      if (savedQuotes) {
        const parsed = JSON.parse(savedQuotes)
        return parsed.map((q: Quote) => ({
          ...q,
          createdAt: new Date(q.createdAt),
          updatedAt: new Date(q.updatedAt),
          sentAt: q.sentAt ? new Date(q.sentAt) : undefined,
        }))
      }
    } catch {
      // Fall through to default
    }
    return []
  })

  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const savedClients = localStorage.getItem("electriquote_clients")
      if (savedClients) {
        const parsed = JSON.parse(savedClients)
        return parsed.map((c: Client) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          lastContact: c.lastContact ? new Date(c.lastContact) : undefined,
        }))
      }
    } catch {
      // Fall through to default
    }
    return []
  })

  const [metrics] = useState<BusinessMetrics>({
    monthlyRevenue: 0,
    previousMonthRevenue: 0,
    profitMargin: 0,
    avgProjectValue: 0,
    quoteConversion: 0,
    clientSatisfaction: 0,
    planStats: [],
  })
  const [isLoaded, setIsLoaded] = useState(true)

  // Save to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("electriquote_quotes", JSON.stringify(quotes))
    }
  }, [quotes, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("electriquote_clients", JSON.stringify(clients))
    }
  }, [clients, isLoaded])

  const addQuote = useCallback((quote: Omit<Quote, "id" | "createdAt" | "updatedAt">) => {
    const newQuote: Quote = {
      ...quote,
      id: `q${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setQuotes((prev) => [newQuote, ...prev])
  }, [])

  const updateQuote = useCallback((id: string, updates: Partial<Quote>) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates, updatedAt: new Date() } : q)))
  }, [])

  const deleteQuote = useCallback((id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id))
  }, [])

  const addClient = useCallback((client: Omit<Client, "id" | "createdAt" | "totalProjects" | "totalValue">) => {
    const newClient: Client = {
      ...client,
      id: `c${Date.now()}`,
      createdAt: new Date(),
      totalProjects: 0,
      totalValue: 0,
    }
    setClients((prev) => [newClient, ...prev])
  }, [])

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const getClientByName = useCallback(
    (name: string) => {
      return clients.find((c) => c.name.toLowerCase().includes(name.toLowerCase()))
    },
    [clients],
  )

  return (
    <DataContext.Provider
      value={{
        quotes,
        clients,
        metrics,
        addQuote,
        updateQuote,
        deleteQuote,
        addClient,
        updateClient,
        getClientByName,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
