import { formatCurrency } from "@/utils/format";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ShoppingBag } from "lucide-react";
import type { ExpenseOverview } from "@/types/wallet";
import { SegmentsProgressBar } from "../common/SegmentsProgressBar";

type ExpenseOverviewProps = {
  expenses: Array<ExpenseOverview>;
};

type ExpenseBannerType = {
  title: string;
  amount: number;
  percentage: number;
  color: string;
};

const COLORS = ["#9675B5", "#D99555"];

function ExpenseBanner({
  title,
  amount,
  percentage,
  color,
}: ExpenseBannerType) {
  return (
    <div className="bg-[#EFEEED] rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="size-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div>
          <h3 className="text-md font-medium">{title} expenses</h3>
          <span className="text-xs text-muted-foreground">
            {percentage}% of total expenses
          </span>
        </div>
      </div>
      <span className="text-lg font-semibold">{formatCurrency(amount)}</span>
    </div>
  );
}

export function ExpenseOverview({ expenses }: ExpenseOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg text-primary font-semibold">
            Expenses overview
          </span>
          <ShoppingBag className="text-muted-foreground size-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          {expenses?.map((expense: ExpenseOverview, i) => (
            <ExpenseBanner
              title={expense.title}
              amount={expense.total}
              percentage={expense.percentage}
              color={COLORS[i]}
            />
          ))}
        </div>
        <SegmentsProgressBar
          segments={expenses.map((expense, i) => ({
            label: expense.title,
            percentage: expense.percentage,
            color: COLORS[i],
          }))}
        />
      </CardContent>
    </Card>
  );
}
