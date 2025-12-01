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

// Sample data for demo
const sampleClients: Client[] = [
  {
    id: "1",
    name: "María González",
    phone: "+56 9 8765 4321",
    email: "maria@email.com",
    totalProjects: 3,
    totalValue: 8200000,
    rating: 5,
    responseSpeed: "fast",
    createdAt: new Date("2024-01-15"),
    lastContact: new Date("2025-05-20"),
  },
  {
    id: "2",
    name: "Tech Corp SPA",
    phone: "+56 2 2345 6789",
    email: "contacto@techcorp.cl",
    totalProjects: 1,
    totalValue: 15000000,
    rating: 4,
    responseSpeed: "slow",
    createdAt: new Date("2024-06-01"),
    lastContact: new Date("2025-05-28"),
  },
  {
    id: "3",
    name: "Graciela Muñoz",
    phone: "+56 9 1234 5678",
    totalProjects: 2,
    totalValue: 4500000,
    rating: 5,
    responseSpeed: "fast",
    createdAt: new Date("2024-03-10"),
    lastContact: new Date("2025-05-30"),
  },
]

const sampleQuotes: Quote[] = [
  {
    id: "q1",
    clientId: "2",
    clientName: "Tech Corp SPA",
    projectName: "Renovación Oficinas",
    projectType: "commercial",
    value: 15000000,
    plan: "premium",
    status: "sent",
    createdAt: new Date("2025-05-26"),
    updatedAt: new Date("2025-05-26"),
    sentAt: new Date("2025-05-26"),
  },
  {
    id: "q2",
    clientId: "1",
    clientName: "María González",
    projectName: "Ampliación Casa",
    projectType: "residential",
    value: 3500000,
    plan: "standard",
    status: "sent",
    createdAt: new Date("2025-05-27"),
    updatedAt: new Date("2025-05-27"),
    sentAt: new Date("2025-05-27"),
  },
  {
    id: "q3",
    clientId: "3",
    clientName: "Graciela Muñoz",
    projectName: "Proyecto Eléctrico Completo",
    projectType: "residential",
    value: 2890000,
    plan: "standard",
    status: "pending",
    createdAt: new Date("2025-05-30"),
    updatedAt: new Date("2025-05-30"),
    sentAt: new Date("2025-05-30"),
  },
  {
    id: "q4",
    clientId: "1",
    clientName: "María González",
    projectName: "Reparación Emergencia",
    projectType: "emergency",
    value: 450000,
    plan: "basic",
    status: "approved",
    createdAt: new Date("2025-05-28"),
    updatedAt: new Date("2025-05-29"),
    sentAt: new Date("2025-05-28"),
  },
  {
    id: "q5",
    clientId: "2",
    clientName: "Tech Corp SPA",
    projectName: "Panel Industrial",
    projectType: "industrial",
    value: 8000000,
    plan: "enterprise",
    status: "pending",
    createdAt: new Date("2025-05-25"),
    updatedAt: new Date("2025-05-25"),
  },
  {
    id: "q6",
    clientId: "3",
    clientName: "Graciela Muñoz",
    projectName: "Nueva Construcción",
    projectType: "residential",
    value: 25000000,
    plan: "premium",
    status: "draft",
    createdAt: new Date("2025-05-29"),
    updatedAt: new Date("2025-05-29"),
    notes: "Pendiente confirmar planos",
  },
]

const sampleMetrics: BusinessMetrics = {
  monthlyRevenue: 28500000,
  previousMonthRevenue: 25400000,
  profitMargin: 32,
  avgProjectValue: 3200000,
  quoteConversion: 68,
  clientSatisfaction: 4.7,
  planStats: [
    { plan: "basic", quotes: 45, winRate: 72 },
    { plan: "standard", quotes: 38, winRate: 65 },
    { plan: "premium", quotes: 12, winRate: 58 },
    { plan: "enterprise", quotes: 3, winRate: 100 },
  ],
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [metrics] = useState<BusinessMetrics>(sampleMetrics)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem("electriquote_quotes")
    const savedClients = localStorage.getItem("electriquote_clients")

    if (savedQuotes) {
      try {
        const parsed = JSON.parse(savedQuotes)
        setQuotes(
          parsed.map((q: Quote) => ({
            ...q,
            createdAt: new Date(q.createdAt),
            updatedAt: new Date(q.updatedAt),
            sentAt: q.sentAt ? new Date(q.sentAt) : undefined,
          })),
        )
      } catch {
        setQuotes(sampleQuotes)
      }
    } else {
      setQuotes(sampleQuotes)
    }

    if (savedClients) {
      try {
        const parsed = JSON.parse(savedClients)
        setClients(
          parsed.map((c: Client) => ({
            ...c,
            createdAt: new Date(c.createdAt),
            lastContact: c.lastContact ? new Date(c.lastContact) : undefined,
          })),
        )
      } catch {
        setClients(sampleClients)
      }
    } else {
      setClients(sampleClients)
    }

    setIsLoaded(true)
  }, [])

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
