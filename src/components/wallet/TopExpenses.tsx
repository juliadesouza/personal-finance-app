"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Expense } from "@/types/expense";
import { formatCurrency } from "@/utils/format";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--primary)",
  },
  title: {
    label: "Title",
    color: "var(--background)",
  },
} satisfies ChartConfig;

interface TopExpensesProps {
  expenses: Expense[];
  isLoading: boolean;
}

export function TopExpenses({
  expenses = [],
  isLoading = false,
}: TopExpensesProps) {
  const hasNoData = !isLoading && (!expenses || expenses.length === 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">Biggest expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="aspect-video w-full" />
        ) : hasNoData ? (
          <div className="text-muted-foreground text-center">
            <p>No expenses available.</p>
            <p>Add expenses to see your top 10.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-25 w-full">
            <BarChart
              accessibilityLayer
              data={expenses}
              layout="vertical"
              margin={{ right: 80 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis dataKey="title" type="category" hide />
              <XAxis dataKey="amount" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, _name, item) => (
                      <div className="flex w-full flex-col gap-0.5">
                        <span className="font-medium text-foreground">
                          {item.payload.title} - {formatCurrency(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={4}>
                <LabelList
                  dataKey="title"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-title) text-xs font-normal"
                  fontSize={12}
                />
                <LabelList
                  dataKey="amount"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: unknown) => formatCurrency(Number(value))}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
