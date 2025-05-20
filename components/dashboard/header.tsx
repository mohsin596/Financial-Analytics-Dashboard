"use client"

import { Activity, LineChart } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Financial Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>Market is Open</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}