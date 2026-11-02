import { PiggyBank } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type SavingsGoalProps = {
  amount: number;
  target: number;
  left: number;
  progress: number;
};

export function SavingsGoal({
  amount,
  target,
  left,
  progress,
}: SavingsGoalProps) {
  return (
    <DetailedCard
      title="Savings goal"
      description="Target: 30% of your monthly income"
      amount={amount}
      target={target}
      progress={progress}
      left={left}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="to go to hit this month’s goal"
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}
