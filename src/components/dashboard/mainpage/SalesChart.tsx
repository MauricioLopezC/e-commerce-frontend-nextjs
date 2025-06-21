"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TotalSalesByMonth } from "@/interfaces/statistics"

// const chartData = [
//   { month: "January", total_sales: 186 },
//   { month: "February", total_sales: 305 },
//   { month: "March", total_sales: 0 },
//   { month: "April", total_sales: 73 },
//   { month: "May", total_sales: 0 },
//   { month: "June", total_sales: 214 },
//   { month: "July", total_sales: 100 },
//   { month: "Agosto", total_sales: 94 },
//   { month: "Septiembre", total_sales: 0 },
//   { month: "Octubre", total_sales: 300 },
//   { month: "Noviembre", total_sales: 196 },
//   { month: "Diciembre", total_sales: 200 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function SalesChart({ AllSalesByMonth }: { AllSalesByMonth: TotalSalesByMonth[] }) {
  const chartData = AllSalesByMonth.map((item) => {
    const date = new Date(item.month)
    const monthname = date.toLocaleString('es-AR', { month: 'long' })
    return { month: monthname, total_sales: item.total_sales }
  })
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="total_sales" fill="var(--color-desktop)" radius={8} name={"Total"} />
      </BarChart>
    </ChartContainer>
  )
}
export default SalesChart
