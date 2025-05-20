"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { revenueData } from "@/lib/mock-data"
import { useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface RevenueChartProps {
  data: typeof revenueData
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Calculate overall revenue growth (comparing first and last month)
  const firstMonth = data[0].revenue
  const lastMonth = data[data.length - 1].revenue
  const growth = ((lastMonth - firstMonth) / firstMonth) * 100

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardDescription>Monthly revenue for the past 6 months</CardDescription>
        </div>
        <div className={`flex items-center gap-1 ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {growth >= 0 ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(growth).toFixed(1)}%</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                }} 
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--chart-1))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}