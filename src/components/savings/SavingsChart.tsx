"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSavings } from "@/hooks/use-savings";
import type { Saving } from "@/types/saving";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  amount: {
    label: "Savings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartData = {
  date: string;
  amount: number;
};

export function SavingsChart() {
  const { savingsQuery } = useSavings();
  const { data, isPending = false } = savingsQuery;

  const savings: Saving[] = data?.items ?? [];

  const chartData = Object.values(
    savings.reduce<Record<string, ChartData>>((acc, saving) => {
      const date = saving.date.slice(0, 7);

      if (!acc[date]) {
        acc[date] = {
          date,
          amount: 0,
        };
      }

      acc[date].amount += Number(saving.amount);

      return acc;
    }, {}),
  ).sort((a, b) => a.date.localeCompare(b.date));

  const hasNoData = !isPending && savings.length === 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings overview</CardTitle>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <Skeleton className="h-45 w-full" />
        ) : hasNoData ? (
          <div className="flex h-45 items-center justify-center text-sm text-muted-foreground">
            No savings registered yet.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-45 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              barCategoryGap="40%"
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                width={85}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year}`;
                }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />

              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={4}
                barSize={14}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
