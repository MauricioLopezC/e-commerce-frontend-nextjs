"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SalesByCategory } from "@/interfaces/statistics"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface SalesByCategoryChartProps {
  salesByCategory: SalesByCategory[]
}

interface ChartData {
  category: string
  total: number
}


function SalesByCategoryChart({ salesByCategory }: SalesByCategoryChartProps) {
  const chartData: ChartData[] = salesByCategory.map((item) => {
    return { category: item.categoryname, total: item.total }
  })
  console.log(chartData)
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="total" fill="var(--color-desktop)" radius={8} name={"Total"} />
      </BarChart>
    </ChartContainer>
  )
}
export default SalesByCategoryChart
