import { TrendingUp } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type SavingsSummaryProps = {
  amount: number;
  left: number;
  available: number;
  percentage: number;
};

export function ExtraExpensesSummary({
  amount,
  left,
  available,
  percentage,
}: SavingsSummaryProps) {
  return (
    <DetailedCard
      title="Extra expenses"
      description="Available after savings and fixed costs"
      amount={amount}
      target={available}
      progress={percentage}
      left={left}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="still available for extra expenses"
      icon={<TrendingUp className="text-muted-foreground size-5" />}
    />
  );
}
