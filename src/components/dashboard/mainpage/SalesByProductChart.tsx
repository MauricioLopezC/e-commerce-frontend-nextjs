"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SalesByProduct } from "@/interfaces/statistics"

export const description = "A bar chart with a custom label"

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ChartData {
  product: string
  total: number
}

interface SalesByProductChartProps {
  salesByProduct: SalesByProduct[]
}

export function SalesByProductChart({ salesByProduct: salesByCategory }: SalesByProductChartProps) {

  const chartData: ChartData[] = salesByCategory.map((item) => {
    return { product: item.name, total: item.total }
  })
  // const maxVentas = Math.max(...salesByCategory.map(item => item.total))

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
      // margin={{
      //   left: -20,
      // }}
      >
        <XAxis type="number" dataKey="total" hide />
        <YAxis
          dataKey="product"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="total" fill="var(--color-desktop)" radius={5} name={"Total"} />
      </BarChart>
    </ChartContainer>
  )
}
