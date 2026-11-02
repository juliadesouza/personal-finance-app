import { WalletOverviewCard } from "./WalletOverviewCard";

type WalletOverviewProps = {
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

export function WalletOverview({
  balance,
  income,
  expense,
  saving,
}: WalletOverviewProps) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <WalletOverviewCard
        title="Income"
        subtitle="Received this month"
        value={income}
      />
      <WalletOverviewCard
        title="Balance"
        subtitle="Available to spend"
        value={balance}
      />
      <WalletOverviewCard
        title="Expenses"
        subtitle={`${expense?.percentage}% of your income`}
        value={expense?.amount}
      />
      <WalletOverviewCard
        title="Savings"
        subtitle={`${saving?.percentage}% of income saved`}
        value={saving?.amount}
      />
    </div>
  );
}
