import { TrendingUp } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type FlexibleBudgetProps = {
  amount: number;
  left: number;
  available: number;
  percentage: number;
};

export function FlexibleBudget({
  amount,
  left,
  available,
  percentage,
}: FlexibleBudgetProps) {
  return (
    <DetailedCard
      title="Flexible budget"
      description="What’s left after savings and fixed costs"
      amount={amount}
      target={available}
      progress={percentage}
      left={left}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="still free for extra spending"
      icon={<TrendingUp className="text-muted-foreground size-5" />}
    />
  );
}
