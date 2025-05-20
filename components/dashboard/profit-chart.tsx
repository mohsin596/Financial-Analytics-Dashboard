"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { profitMarginData } from "@/lib/mock-data"

interface ProfitChartProps {
  data: typeof profitMarginData
}

export function ProfitChart({ data }: ProfitChartProps) {
  // Calculate average margin
  const avgMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Margins</CardTitle>
        <CardDescription>
          Average: {avgMargin.toFixed(1)}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="department" 
                tick={{ fill: 'hsl(var(--muted-foreground))', angle: -45, textAnchor: 'end' }}
                height={60}
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                unit="%" 
                domain={[0, 'dataMax + 5']}
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Profit Margin']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                }} 
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <Bar 
                dataKey="margin" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}