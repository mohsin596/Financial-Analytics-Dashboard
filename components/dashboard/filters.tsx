"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/dashboard/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { departments } from "@/lib/mock-data"
import { DateRange } from "react-day-picker"
import { addMonths } from "date-fns"

interface FiltersProps {
  onDateRangeChange: (range: DateRange | undefined) => void
  onDepartmentChange: (department: string) => void
}

export function Filters({ onDateRangeChange, onDepartmentChange }: FiltersProps) {
  // Default date range (last 6 months)
  const defaultDateRange = {
    from: addMonths(new Date(), -6),
    to: new Date(),
  }
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange)

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    onDateRangeChange(range)
  }

  // Handle department change
  const handleDepartmentChange = (department: string) => {
    onDepartmentChange(department)
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <div className="text-sm font-medium mb-2">Date Range</div>
            <DatePickerWithRange 
              dateRange={dateRange} 
              onDateRangeChange={handleDateRangeChange} 
            />
          </div>
          <div className="w-full sm:w-1/3">
            <div className="text-sm font-medium mb-2">Department</div>
            <Select onValueChange={handleDepartmentChange} defaultValue="All">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}