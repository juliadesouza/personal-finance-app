import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/utils/format";

const chartConfig = {
  used: { label: "Used" },
} satisfies ChartConfig;

function getBarColor(usedPct: number) {
  if (usedPct > 100) return "var(--destructive)";
  if (usedPct >= 80) return "#f59e0b";
  return "var(--chart-1)";
}

type MonthlyBudgetProps = {
  income: number;
  expenses: number;
  savings: number;
};

export function MonthlyBudget({
  income,
  expenses,
  savings,
}: MonthlyBudgetProps) {
  const spent = expenses + savings;
  const remaining = income - spent;
  const overBudget = remaining < 0;

  const usedPct = income > 0 ? (spent / income) * 100 : spent > 0 ? 101 : 0;
  const leftPct = Math.max(0, Math.round(100 - usedPct));

  const data = [
    {
      name: "used",
      value: Math.min(usedPct, 100),
      fill: getBarColor(usedPct),
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-normal">Monthly budget</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer config={chartConfig} className="aspect-square size-55">
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={78}
            outerRadius={100}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              dataKey="value"
              angleAxisId={0}
              background={{ fill: "var(--muted)" }}
              cornerRadius={12}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          y={(viewBox.cy || 0) - 5}
                          className={`fill-foreground text-xl font-bold ${
                            overBudget ? "fill-destructive" : "fill-foreground"
                          }`}
                        >
                          {formatCurrency(remaining)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground text-sm"
                        >
                          {overBudget ? "over budget" : `${leftPct}% left`}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4 pt-4 text-sm">
        <div>
          <p className="text-muted-foreground">Income</p>
          <p className="font-medium">{formatCurrency(income)}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Spent</p>
          <p className="font-medium">{formatCurrency(spent)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
