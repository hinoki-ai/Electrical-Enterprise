"use client"

import { Plus, Calculator, ListTodo, Users, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Plus, label: "Nueva", active: true },
  { icon: ListTodo, label: "Cotizaciones" },
  { icon: Calculator, label: "Calcular" },
  { icon: Users, label: "Clientes" },
  { icon: BarChart3, label: "Stats" },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, i) => (
          <button
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
              item.active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className={cn("w-5 h-5", item.active && "text-accent")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
