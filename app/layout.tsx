import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers/providers"
import { DataProvider } from "@/lib/data-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "ElectriQuote — Sistema de Cotizaciones",
  description: "Sistema profesional de cotizaciones para electricistas certificados",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <DataProvider>
            {children}
          </DataProvider>
        </Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
