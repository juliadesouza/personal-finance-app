"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency, formatMonthLong, formatMonth } from "@/utils/format";

const chartConfig = {
  total: {
    label: "Fixed expenses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type FixedExpensesProps = {
  expenses: { month: string; total: number }[];
  average: number;
};

export function FixedExpenses({
  expenses = [],
  average = 0,
}: FixedExpensesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">
          Fixed expenses by month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={expenses} margin={{ top: 24 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatMonth(String(value))}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatMonthLong(String(value))}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                dataKey="total"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: unknown) => formatCurrency(Number(value))}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="font-medium leading-none">
          Monthly average: {formatCurrency(average)}
        </div>
        <div className="leading-none text-muted-foreground">
          Based on the 6 months before the selected one
        </div>
      </CardFooter>
    </Card>
  );
}
