"use client"

import { useState, useEffect } from "react"
import { DateRange } from "react-day-picker"
import { DashboardHeader } from "@/components/dashboard/header"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { ProfitChart } from "@/components/dashboard/profit-chart"
import { DataTable } from "@/components/dashboard/data-table"
import { Filters } from "@/components/dashboard/filters"
import { DataInputForm } from "@/components/dashboard/data-input-form"
import { fetchFinancialData, addFinancialData } from "@/lib/mock-data"

export default function Dashboard() {
  // State for financial data
  const [data, setData] = useState({
    revenue: [],
    expenses: [],
    profitMargins: [],
    detailedData: [],
  })
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const financialData = await fetchFinancialData()
        setData(financialData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle date range filter change
  const handleDateRangeChange = async (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return
    
    setLoading(true)
    try {
      const filteredData = await fetchFinancialData(range)
      setData(filteredData)
    } catch (error) {
      console.error("Error filtering by date:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle department filter change
  const handleDepartmentChange = async (department: string) => {
    setLoading(true)
    try {
      const filteredData = await fetchFinancialData(undefined, department)
      setData(filteredData)
    } catch (error) {
      console.error("Error filtering by department:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle data submission from form
  const handleDataSubmit = async (formData: {
    department: string
    revenue: number
    expenses: number
  }) => {
    // Add new data via the mock API
    const newEntry = await addFinancialData(formData)
    
    // Update the detailed data in state
    setData(prevData => ({
      ...prevData,
      detailedData: [...prevData.detailedData, newEntry]
    }))
    
    // Refresh all data
    const refreshedData = await fetchFinancialData()
    setData(refreshedData)
    
    return newEntry
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 container py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-3 h-[300px] bg-muted/20 animate-pulse rounded-lg"></div>
            {[1, 2].map((i) => (
              <div key={i} className="h-[280px] bg-muted/20 animate-pulse rounded-lg"></div>
            ))}
            <div className="col-span-3 h-[400px] bg-muted/20 animate-pulse rounded-lg"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Filters */}
          <Filters 
            onDateRangeChange={handleDateRangeChange} 
            onDepartmentChange={handleDepartmentChange} 
          />
          
          {/* Revenue Chart */}
          <RevenueChart data={data.revenue} />
          
          {/* Expense Breakdown */}
          <ExpenseChart data={data.expenses} />
          
          {/* Profit Margins */}
          <ProfitChart data={data.profitMargins} />
          
          {/* Data Table */}
          <DataTable data={data.detailedData} />
          
          {/* Data Input Form */}
          <DataInputForm onDataSubmit={handleDataSubmit} />
        </div>
      </main>
    </div>
  )
}