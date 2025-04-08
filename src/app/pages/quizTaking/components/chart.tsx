"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

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

const chartData = [
  { answer: "correct", type: 49, fill: "#F1E7E7" }, // lighter color
  { answer: "wrong", type: 21, fill: "#BDB395" },   // tan color
  { answer: "pass", type: 10, fill: "#D4C9BE" },    // beige color
]

const chartConfig = {
  type: {
    label: "Type",
  },
  correct: {
    label: "Correct",
    color: "#22c55e",
  },
  wrong: {
    label: "Wrong",
    color: "#ef4444",
  },
  pass: {
    label: "Pass",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Answer Summary</CardTitle>
        <CardDescription>Quiz Results (Jan - June 2024)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-black"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="answer" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="type"
              outerRadius={80}
              label={({ name, value, index }) => chartData[index].answer}
              labelLine={true}
              className="font-bold text-stone-600"
            >
              <LabelList
                dataKey="type"
                className="fill-white font-bold"
                stroke="none"
                fontSize={14}
                fill="white"
                formatter={(value: number) => {
                  const total = chartData.reduce((acc, cur) => acc + cur.type, 0)
                  const percent = ((value / total) * 100).toFixed(1)
                  return `${percent}%`
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total quiz responses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}