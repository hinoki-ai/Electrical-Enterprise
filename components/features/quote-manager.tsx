"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentQuote } from "@/hooks/use-current-quote";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Save, FolderOpen, Plus } from "lucide-react";

export function QuoteManager() {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [newQuoteName, setNewQuoteName] = useState("");

  // Convex hooks
  const quotes = useQuery(api.quotes.getAllQuotes);
  const createQuote = useMutation(api.quotes.createQuote);
  const createCompleteQuote = useMutation(api.quotes.createCompleteQuote);
  const { setCurrentQuoteId } = useCurrentQuote();

  const handleCreateQuote = async () => {
    if (!newQuoteName.trim()) return;

    // Create a new quote with default data
    const quoteId = await createQuote({
      clientName: "Nuevo Cliente",
      clientRut: "",
      projectTitle: newQuoteName,
      projectDescription: "Descripción del proyecto...",
      scope: "Alcance del proyecto...",
      recommendation: "",
      recommendationReason: "",
      notes: "",
    });

    setNewQuoteName("");
    setIsCreateDialogOpen(false);

    // Redirect to quote page
    if (quoteId) {
      setCurrentQuoteId(quoteId);
      router.push(`/quote/${quoteId}`);
    }
  };

  const handleSaveCurrent = async () => {
    // Save the complete default quote with all line items (Lorena's quote)
    const quoteId = await createCompleteQuote({});

    // Redirect to quote page
    if (quoteId) {
      setCurrentQuoteId(quoteId);
      router.push(`/quote/${quoteId}`);
    }
  };

  const handleLoadQuote = (quoteId: string) => {
    router.push(`/quote/${quoteId}`);
    setIsLoadDialogOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex gap-2">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quote-name">Quote Name</Label>
                <Input
                  id="quote-name"
                  value={newQuoteName}
                  onChange={(e) => setNewQuoteName(e.target.value)}
                  placeholder="Enter quote name..."
                />
              </div>
              <Button onClick={handleCreateQuote} className="w-full">
                Create Quote
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button size="sm" variant="outline" onClick={handleSaveCurrent}>
          <Save className="w-4 h-4 mr-2" />
          Save Current
        </Button>

        <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <FolderOpen className="w-4 h-4 mr-2" />
              Load Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Load Quote</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quotes?.length ? (
                quotes.map((quote) => (
                  <Card
                    key={quote._id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleLoadQuote(quote._id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{quote.projectTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{quote.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        Creada: {new Date(quote.createdAt).toLocaleDateString("es-CL")}
                      </p>
                      {quote.updatedAt !== quote.createdAt && (
                        <p className="text-xs text-muted-foreground">
                          Actualizada: {new Date(quote.updatedAt).toLocaleDateString("es-CL")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay cotizaciones guardadas. Click &quot;Save Current&quot; para crear la cotización de Lorena.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
