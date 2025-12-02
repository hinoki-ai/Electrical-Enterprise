"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, Search, Bell, Settings, Menu, Home, Plus, ListTodo, Calculator, Users, BarChart3, FileText, BookTemplate, Database, BookOpen, Package, FileCheck, HelpCircle, Mail, MessageCircle, AlertCircle, User, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SettingsDialog } from "./settings-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-context"

const mainNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Plus, label: "Nueva Cotización", href: "/quote/new" },
  { icon: ListTodo, label: "Cotizaciones", href: "/quotes" },
  { icon: Calculator, label: "Calculadora", href: "/calculator" },
  { icon: Calculator, label: "Calculadora Avanzada", href: "/advanced-calculator" },
  { icon: Users, label: "Clientes", href: "/clients" },
  { icon: BarChart3, label: "Reportes", href: "/reports" },
]

const resourceNavItems = [
  { icon: BookOpen, label: "Guía de Precios", href: "/resources/price-guide" },
  { icon: Package, label: "Materiales", href: "/resources/materials" },
  { icon: FileCheck, label: "Contratos", href: "/resources/contracts" },
  { icon: FileText, label: "Regulaciones", href: "/resources/regulations" },
]

const supportNavItems = [
  { icon: AlertCircle, label: "Emergencia", href: "/support/emergency" },
  { icon: MessageCircle, label: "WhatsApp", href: "/support/whatsapp" },
  { icon: Mail, label: "Email", href: "/support/email" },
  { icon: HelpCircle, label: "Ayuda", href: "/support/help" },
]

const otherNavItems = [
  { icon: BookTemplate, label: "Plantillas", href: "/templates" },
  { icon: Database, label: "Respaldo", href: "/backup" },
  { icon: User, label: "Perfil", href: "/profile" },
  { icon: BellRing, label: "Notificaciones", href: "/notifications" },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-none">ElectriQuote</h1>
              <p className="text-xs text-primary-foreground/70">{user?.username || ""}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              href="/dashboard"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/dashboard" || pathname === "/"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Inicio
            </Link>
            <Link
              href="/quotes"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/quotes" || pathname.startsWith("/quote")
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Cotizaciones
            </Link>
            <Link
              href="/calculator"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/calculator" || pathname === "/advanced-calculator"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Calculadora
            </Link>
            <Link
              href="/clients"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/clients"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Clientes
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors outline-none">
                Más
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Navegación</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mainNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Package className="w-4 h-4 mr-2" />
                    Recursos
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {resourceNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Soporte
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {supportNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                {otherNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
              <Input
                type="search"
                placeholder="Buscar cliente, proyecto, cotización..."
                className="w-full pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <SettingsDialog>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </SettingsDialog>
            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Navegación</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mainNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Package className="w-4 h-4 mr-2" />
                    Recursos
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {resourceNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Soporte
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {supportNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                {otherNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
