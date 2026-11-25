import { PiggyBank } from "lucide-react";
import { DetailedCard } from "./DetailedCard";
import { formatCurrency } from "@/utils/format";

type SavingsBudgetProps = {
  saved: number;
  target: number;
  remaining: number;
  progress: number;
};

type MessageProps = {
  remaining: number;
};

const Message = ({ remaining }: MessageProps) => {
  if (remaining > 0) {
    return (
      <p className="text-sm">
        <b className="font-semibold"> {formatCurrency(remaining)}</b> left to
        reach your monthly goal
      </p>
    );
  }

  return (
    <p className="text-sm">
      Congratulations! You've reached your monthly goal!
    </p>
  );
};

export function LoadingSavingsBudget() {
  return (
    <DetailedCard
      isLoading={true}
      amount={0}
      progress={0}
      target={0}
      title="Savings budget"
      description="Target: 30% of your monthly income"
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}

export function SavingsBudget({
  saved,
  target,
  remaining,
  progress,
}: SavingsBudgetProps) {
  return (
    <DetailedCard
      title="Savings budget"
      description="Target: 30% of your monthly income"
      amount={saved}
      target={target}
      progress={progress}
      message={<Message remaining={remaining} />}
      icon={<PiggyBank className="text-muted-foreground size-5" />}
    />
  );
}
