import { Gift } from "lucide-react";
import { DetailedCard } from "./DetailedCard";
import { formatCurrency } from "@/utils/format";

interface DiscretionaryBudgetProps {
  spent: number;
  target: number;
  remaining: number;
  progress: number;
  budgetPercentage: number;
}

interface MessageProps {
  remaining: number;
}

const Message = ({ remaining }: MessageProps) => {
  if (remaining > 0) {
    return (
      <p className="text-sm">
        <b className="font-semibold"> {formatCurrency(remaining)}</b> left to
        reach your monthly goal
      </p>
    );
  }

  if (remaining === 0) {
    return (
      <p className="text-sm">You've reached your free budget for this month.</p>
    );
  }

  return (
    <p className="text-sm">
      <b className="font-semibold text-destructive">
        {formatCurrency(Math.abs(remaining))}
      </b>{" "}
      over your free budget this month
    </p>
  );
};

export function LoadingDiscretionaryBudget() {
  return (
    <DetailedCard
      isLoading={true}
      amount={0}
      progress={0}
      target={0}
      title="Free budget"
      description="Target: x% of your monthly income"
      icon={<Gift className="text-muted-foreground size-5" />}
    />
  );
}
export function DiscretionaryBudget({
  spent,
  target,
  remaining,
  progress,
  budgetPercentage,
}: DiscretionaryBudgetProps) {
  return (
    <DetailedCard
      title="Free budget"
      description={`Target: ${budgetPercentage}% of your monthly income`}
      amount={spent}
      target={target}
      progress={progress}
      message={<Message remaining={remaining} />}
      icon={<Gift className="text-muted-foreground size-5" />}
    />
  );
}
