"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import type { QuoteContextType } from "@/types/quote";

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [currentQuoteId, setCurrentQuoteId] = useState<Id<"quotes"> | null>(null);

  const currentQuote = useQuery(
    api.quotes.getQuoteWithDetails,
    currentQuoteId ? { quoteId: currentQuoteId } : "skip"
  );

  const isLoading = currentQuote === undefined;

  return (
    <QuoteContext.Provider
      value={{
        currentQuoteId,
        setCurrentQuoteId,
        currentQuote,
        isLoading,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useCurrentQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error("useCurrentQuote must be used within a QuoteProvider");
  }
  return context;
}
