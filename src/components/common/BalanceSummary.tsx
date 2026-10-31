import { BanknoteArrowUp, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { BalanceCard } from "./BalanceCard";

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

export function BalanceSummary({
  balance,
  income,
  expense,
  saving,
}: WalletSummaryProps) {
  return (
    <div className="grid grid-cols-4 gap-8 mb-8">
      <BalanceCard
        title="Income"
        value={income}
        icon={<BanknoteArrowUp className="size-5 text-muted-foreground" />}
      />
      <BalanceCard
        title="Balance"
        value={balance}
        icon={<Wallet className="size-5 text-muted-foreground" />}
      />
      <BalanceCard
        title="Expenses"
        value={expense?.amount}
        icon={<ReceiptText className="size-5 text-muted-foreground" />}
      />
      <BalanceCard
        title="Savings"
        value={saving?.amount}
        icon={<PiggyBank className="size-5 text-muted-foreground" />}
      />
    </div>
  );
}
