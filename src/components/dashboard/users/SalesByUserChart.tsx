"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "TotalGastado",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartData {
  userName: string;
  totalSpent: number;
}

export function SalesByUserChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compras por cliente</CardTitle>
        <CardDescription>Total del valor de las compras por cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="userName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalSpent" fill="var(--color-desktop)" radius={8} name="Total" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm"> */}
      {/*   <div className="flex gap-2 font-medium leading-none"> */}
      {/*     Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
      {/*   </div> */}
      {/*   <div className="leading-none text-muted-foreground"> */}
      {/*     Showing total visitors for the last 6 months */}
      {/*   </div> */}
      {/* </CardFooter> */}
    </Card>
  )
}
