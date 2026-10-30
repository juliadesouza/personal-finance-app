import { PiggyBank } from "lucide-react";
import { DetailedCard } from "./DetailedCard";

type SavingsSummaryProps = {
  amount: number;
  target: number;
  left: number;
  progress: number;
};

export function SavingsSummary({
  amount,
  target,
  left,
  progress,
}: SavingsSummaryProps) {
  return (
    <DetailedCard
      title="Savings progress"
      description="30% of monthly income"
      amount={amount}
      target={target}
      progress={progress}
      left={left}
      warningTitle="MONTHLY INSIGHT"
      warningSubtitle="left to reach your target"
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}
