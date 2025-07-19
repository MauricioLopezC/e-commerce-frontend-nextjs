"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SalesByCategory } from "@/interfaces/statistics"

export const description = "A donut chart"

const colores = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface SalesByCategoryChartProps {
  salesByCategory: SalesByCategory[]
}

interface ChartData {
  category: string
  total: number
}

export function SalesByCategoryChartPieDonut({ salesByCategory }: SalesByCategoryChartProps) {

  const chartConfig = salesByCategory.reduce((acc, item, index) => {
    acc[item.categoryName.toLowerCase()] = {
      label: item.categoryName,
      color: `hsl(${colores[index % colores.length]})`, // cicla si hay más de 5
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const chartData: ChartData[] = salesByCategory.map((item, idx) => ({
    category: item.categoryName,
    total: item.total,
    fill: `hsl(${colores[idx % colores.length]})`, // color visual
  })
  )

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="total"
          nameKey="category"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  )
}
