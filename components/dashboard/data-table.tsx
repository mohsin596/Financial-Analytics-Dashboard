"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { detailedFinancialData } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"

interface DataTableProps {
  data: typeof detailedFinancialData
}

type SortField = "department" | "revenue" | "expenses" | "profit" | "margin" | "growth"
type SortDirection = "asc" | "desc"

export function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("revenue")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [searchTerm, setSearchTerm] = useState("")

  // Sort and filter data
  const sortedAndFilteredData = [...data]
    .filter(item => 
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1
      if (a[sortField] < b[sortField]) return -1 * modifier
      if (a[sortField] > b[sortField]) return 1 * modifier
      return 0
    })

  // Toggle sort direction or change sort field
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" 
      ? <ArrowUpAZ className="ml-2 h-4 w-4" /> 
      : <ArrowDownAZ className="ml-2 h-4 w-4" />
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Financial Data</CardTitle>
            <CardDescription>Detailed breakdown by department</CardDescription>
          </div>
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("department")}
                    className="flex items-center font-medium"
                  >
                    Department
                    {getSortIcon("department")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("revenue")}
                    className="flex items-center font-medium"
                  >
                    Revenue
                    {getSortIcon("revenue")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("expenses")}
                    className="flex items-center font-medium"
                  >
                    Expenses
                    {getSortIcon("expenses")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("profit")}
                    className="flex items-center font-medium"
                  >
                    Profit
                    {getSortIcon("profit")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("margin")}
                    className="flex items-center font-medium"
                  >
                    Margin
                    {getSortIcon("margin")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("growth")}
                    className="flex items-center font-medium"
                  >
                    Growth
                    {getSortIcon("growth")}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                sortedAndFilteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.department}</TableCell>
                    <TableCell>{formatCurrency(row.revenue)}</TableCell>
                    <TableCell>{formatCurrency(row.expenses)}</TableCell>
                    <TableCell>{formatCurrency(row.profit)}</TableCell>
                    <TableCell>{row.margin}%</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${row.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {row.growth >= 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {Math.abs(row.growth)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}