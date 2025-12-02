"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/auth-context";
import { DivineParsingOracleProvider } from "@/components/language/ChunkedLanguageProvider";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

// Dynamically import QuoteProvider to avoid SSR issues
const DynamicQuoteProvider = dynamic(
  () => import("@/hooks/use-current-quote").then(mod => ({ default: mod.QuoteProvider })),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  const themeContent = (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );

  const content = (
    <DivineParsingOracleProvider initialNamespaces={["common"]}>
      {themeContent}
    </DivineParsingOracleProvider>
  );

  if (!convex) {
    return (
      <AuthProvider>
        {content}
      </AuthProvider>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
        <DynamicQuoteProvider>
          {content}
        </DynamicQuoteProvider>
      </AuthProvider>
    </ConvexProvider>
  );
}
