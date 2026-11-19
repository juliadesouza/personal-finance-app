import { PiggyBank } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type SavingsGoalProps = {
  amount: number;
  target: number;
  left: number;
  progress: number;
};

export function LoadingSavingsGoals() {
  return (
    <DetailedCard
      isLoading={true}
      amount={0}
      progress={0}
      left={0}
      target={0}
      title="Savings goal"
      description="Target: 30% of your monthly income"
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="to go to hit this month’s goal"
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}
export function SavingsGoal({
  amount,
  target,
  left,
  progress,
}: SavingsGoalProps) {
  const subtitle =
    left > 0
      ? "left to reach your monthly goal"
      : "Congratulations! You've reached your monthly goal!";
  return (
    <DetailedCard
      title="Savings goal"
      description="Target: 30% of your monthly income"
      amount={amount}
      target={target}
      progress={progress}
      left={left > 0 ? left : undefined}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle={subtitle}
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}
