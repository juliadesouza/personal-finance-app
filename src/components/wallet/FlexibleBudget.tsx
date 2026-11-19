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
  const message =
    left > 0
      ? `available for extra spending this month.`
      : `${Math.abs(left)} over your flexible spending budget.`;
  return (
    <DetailedCard
      title="Extra spending"
      description="What you can spend after covering savings and fixed expenses"
      amount={amount}
      target={available}
      progress={percentage}
      left={left > 0 ? left : undefined}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle={message}
      icon={<TrendingUp className="text-muted-foreground size-5" />}
    />
  );
}
