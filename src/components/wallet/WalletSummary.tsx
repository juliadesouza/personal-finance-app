import { SummaryCard } from "./SummaryCard";

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
      <SummaryCard title="Income" subtitle="Total this month" value={income} />
      <SummaryCard
        title="Balance"
        subtitle="Available to use"
        value={balance}
      />
      <SummaryCard
        title="Expenses"
        subtitle={`${expense?.percentage}% of income`}
        value={expense?.amount}
      />
      <SummaryCard
        title="Savings"
        subtitle={`${saving?.percentage}% of income`}
        value={saving?.amount}
      />
    </div>
  );
}
