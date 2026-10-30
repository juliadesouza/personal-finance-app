import {
  BanknoteArrowUpIcon,
  PiggyBank,
  ReceiptText,
  WalletIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";

type WalletSummaryProps = {
  balance: number;
  income: number;
  expense: {
    amount: number;
    percentage: number;
  };
  saving: {
    amount: number;
    percentage: number;
  };
};

export function WalletSummary({
  balance,
  income,
  expense,
  saving,
}: WalletSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-md text-muted-foreground font-normal">
              Income
            </span>
            <div className="flex items-center justify-center bg-sidebar p-2 rounded-md">
              <BanknoteArrowUpIcon className="text-primary size-4.5" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">{formatCurrency(income)}</h3>
          <p className="text-xs text-muted-foreground font-light">
            Total this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-md text-muted-foreground font-normal">
              Balance
            </span>
            <div className="flex items-center justify-center bg-[#FFF3DF] p-2 rounded-md">
              <WalletIcon className="text-warning size-4.5" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">{formatCurrency(balance)}</h3>
          <p className="text-xs text-muted-foreground font-light">
            Available to use
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-md text-muted-foreground font-normal">
              Expenses
            </span>
            <div className="flex items-center justify-center bg-[#F1EAFE] p-2 rounded-md">
              <ReceiptText className="text-[#8B5CF6] size-4.5" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">
            {formatCurrency(expense?.amount)}
          </h3>
          <p className="text-xs text-muted-foreground font-light">
            {expense?.percentage}% of income
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-md text-muted-foreground font-normal">
              Savings
            </span>
            <div className="flex items-center justify-center bg-[#E8F1FF] p-2 rounded-md">
              <PiggyBank className="text-[#3B82F6] size-4.5" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">
            {formatCurrency(saving?.amount)}
          </h3>
          <p className="text-xs text-muted-foreground font-light">
            {saving?.percentage}% of income
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
