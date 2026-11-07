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
  isLoading: boolean;
};

export function WalletOverview({
  balance,
  income,
  expense,
  saving,
  isLoading,
}: WalletOverviewProps) {
  const expensesSubtitle = expense?.percentage
    ? `${expense?.percentage}% of your income`
    : "Add income and expenses to see your progress";

  const savingsSubtitle = saving?.percentage
    ? `${saving.percentage}% of income saved`
    : "Add income and savings to see your progress";

  return (
    <div className="grid grid-cols-4 gap-8">
      <WalletOverviewCard
        title="Income"
        subtitle="Received this month"
        value={income}
        isLoading={isLoading}
      />
      <WalletOverviewCard
        title="Balance"
        subtitle="Available to spend"
        value={balance}
        isLoading={isLoading}
      />
      <WalletOverviewCard
        title="Expenses"
        subtitle={expensesSubtitle}
        value={expense?.amount}
        isLoading={isLoading}
      />
      <WalletOverviewCard
        title="Savings"
        subtitle={savingsSubtitle}
        value={saving?.amount}
        isLoading={isLoading}
      />
    </div>
  );
}
