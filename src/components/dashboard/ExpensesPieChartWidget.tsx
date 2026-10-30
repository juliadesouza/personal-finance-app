"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/utils/format";

type ExpenseCategory = {
  amount: number;
  title: string;
  fill: string;
  id: number;
};

type ExpensesPieChartWidgetProps = {
  expenses?: ExpenseCategory[];
};

export function ExpensesPieChartWidget({
  expenses = [],
}: ExpensesPieChartWidgetProps) {
  const total = React.useMemo(
    () => expenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    [expenses],
  );

  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color?: string }> = {
      amount: {
        label: "Amount",
      },
    };

    for (const expense of expenses) {
      const { id, title, fill } = expense;
      config[`category-${id}`] = {
        label: title,
        color: fill,
      };
    }
    return config;
  }, [expenses]);

  const chartData = React.useMemo(
    () =>
      expenses.map((expense) => ({
        ...expense,
        category: `category-${expense.id}`,
        amount: Number(expense.amount),
        fill: expense.fill,
      })),
    [expenses],
  );

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent>Sem despesas</CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle className="text-lg font-normal">
          Expenses by category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center">
        <div>
          {expenses.map((expense) => (
            <div className="flex items-center gap-2">
              <div
                className="size-3 border-1 rounded-2xl"
                style={{ backgroundColor: expense.fill }}
              />
              <span>{expense.title}</span>
            </div>
          ))}
        </div>
        <div>
          <ChartContainer config={chartConfig} className="w-[250px] h-[180px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="min-w-[180px] [&_.justify-between]:gap-8"
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="title"
                innerRadius={70}
                outerRadius={90}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {formatCurrency(total)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total for month
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
