import { AdvancedCalculator } from "@/components/features/advanced-calculator";
import { Suspense } from "react";
import { LoadingCard } from "@/components/ui/loading";

export default function AdvancedCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <LoadingCard
            title="Cargando calculadora..."
            description="Preparando la calculadora avanzada de proyectos"
          />
        }>
          <AdvancedCalculator />
        </Suspense>
      </main>
    </div>
  );
}
