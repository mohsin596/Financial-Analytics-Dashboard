import { subMonths, format } from 'date-fns';

// Generate last 6 months dates
const generateLastSixMonths = () => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    months.push(format(date, 'MMM yyyy'));
  }
  return months;
};

export const months = generateLastSixMonths();

// Department names
export const departments = ['Sales', 'Marketing', 'HR', 'Engineering', 'Finance'];

// Mock revenue data for last 6 months
export const revenueData = months.map((month, index) => ({
  month,
  revenue: 50000 + Math.floor(Math.random() * 30000),
  previousRevenue: 45000 + Math.floor(Math.random() * 25000),
}));

// Mock expense categories
export const expenseCategories = [
  { name: 'Salaries', value: 32000, color: 'hsl(var(--chart-1))' },
  { name: 'Rent', value: 8000, color: 'hsl(var(--chart-2))' },
  { name: 'Utilities', value: 3500, color: 'hsl(var(--chart-3))' },
  { name: 'Marketing', value: 7500, color: 'hsl(var(--chart-4))' },
  { name: 'Equipment', value: 5000, color: 'hsl(var(--chart-5))' },
];

// Mock profit margins by department
export const profitMarginData = departments.map((department) => ({
  department,
  margin: 15 + Math.floor(Math.random() * 20),
  previousMargin: 14 + Math.floor(Math.random() * 18),
}));

// Detailed financial data for the table
export const detailedFinancialData = departments.map((department) => {
  const revenue = 50000 + Math.floor(Math.random() * 50000);
  const expenses = revenue * (0.5 + Math.random() * 0.3);
  const profit = revenue - expenses;
  const margin = (profit / revenue) * 100;

  return {
    id: department.toLowerCase(),
    department,
    revenue,
    expenses,
    profit,
    margin: parseFloat(margin.toFixed(2)),
    growth: -10 + Math.floor(Math.random() * 30),
  };
});

// Mock API functions
export const fetchFinancialData = async (dateRange?: { start: Date; end: Date }, department?: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If no filters are applied, return all data
  if (!dateRange && !department) {
    return {
      revenue: revenueData,
      expenses: expenseCategories,
      profitMargins: profitMarginData,
      detailedData: detailedFinancialData,
    };
  }

  // Filter data based on department
  let filteredDetailedData = [...detailedFinancialData];
  let filteredProfitMargins = [...profitMarginData];

  if (department && department !== 'All') {
    filteredDetailedData = detailedFinancialData.filter((item) => item.department === department);
    filteredProfitMargins = profitMarginData.filter((item) => item.department === department);
  }

  // For demo purposes, we're not actually filtering by date since our mock data
  // doesn't have real dates, but in a real app, you would filter here

  return {
    revenue: revenueData,
    expenses: expenseCategories,
    profitMargins: filteredProfitMargins,
    detailedData: filteredDetailedData,
  };
};

// Function to add new financial data
export const addFinancialData = async (newData: {
  department: string;
  revenue: number;
  expenses: number;
}) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Calculate profit and margin
  const profit = newData.revenue - newData.expenses;
  const margin = (profit / newData.revenue) * 100;

  // In a real application, this would send the data to an API
  // For now, we'll just return the processed data
  return {
    ...newData,
    profit,
    margin: parseFloat(margin.toFixed(2)),
    id: Date.now().toString(),
    growth: Math.floor(Math.random() * 20),
  };
};