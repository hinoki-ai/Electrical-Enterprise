"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Calculator, ListTodo, Users, BarChart3, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Inicio", href: "/dashboard" },
  { icon: Plus, label: "Nueva", href: "/quote/new" },
  { icon: ListTodo, label: "Cotizaciones", href: "/quotes" },
  { icon: Calculator, label: "Calcular", href: "/calculator" },
  { icon: Users, label: "Clientes", href: "/clients" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/")
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-accent")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
