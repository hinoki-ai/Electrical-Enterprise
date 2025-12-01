import { Id } from "@/convex/_generated/dataModel";

export interface QuoteContextType {
  currentQuoteId: Id<"quotes"> | null;
  setCurrentQuoteId: (id: Id<"quotes"> | null) => void;
  currentQuote: any;
  isLoading: boolean;
}

