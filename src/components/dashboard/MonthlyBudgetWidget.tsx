import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/utils/format";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type MonthlyBudgetWidgetProps = {
  income: number;
  expenses: number;
  savings: number;
};

export function MonthlyBudgetWidget({
  income,
  expenses,
  savings,
}: MonthlyBudgetWidgetProps) {
  const remaining = income - (expenses + savings);
  const percentage = Math.round(((expenses + savings) / income) * 100);

  const chartData = [{ income: income, expenses: expenses + savings }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-normal">Monthly budget</CardTitle>
        <CardDescription className="text-xl font-semibold">
          {formatCurrency(income)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <div>
          <ChartContainer config={chartConfig} className="w-[250px] h-[250px]">
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={110}
            >
              <RadialBar
                dataKey="income"
                fill="var(--color-chart-1)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="expenses"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-sidebar)"
                className="stroke-transparent stroke-2"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="min-w-[180px] [&_.justify-between]:gap-8"
                  />
                }
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-xl font-bold"
                          >
                            {formatCurrency(remaining)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            {percentage}% spent
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
