import { TrendingUp } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type FlexibleBudgetProps = {
  amount: number;
  left: number;
  available: number;
  percentage: number;
};

export function LoadingFlexibleBudget() {
  return (
    <DetailedCard
      title="Flexible budget"
      description="What’s left after savings and fixed costs"
      amount={0}
      target={0}
      progress={0}
      left={0}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="still free for extra spending"
      icon={<TrendingUp className="text-muted-foreground size-5" />}
      isLoading={true}
    />
  );
}

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
