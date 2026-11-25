import { House } from "lucide-react";
import { DetailedCard } from "./DetailedCard";
import { formatCurrency } from "@/utils/format";

type EssentialBudgetProps = {
  spent: number;
  target: number;
  remaining: number;
  progress: number;
  budgetPercentage: number;
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

  if (remaining === 0) {
    return (
      <p className="text-sm">
        You've reached your essentials budget for this month.
      </p>
    );
  }

  return (
    <p className="text-sm">
      <b className="font-semibold text-destructive">
        {formatCurrency(Math.abs(remaining))}
      </b>{" "}
      over your essentials budget this month
    </p>
  );
};

export function LoadingEssentialBudget() {
  return (
    <DetailedCard
      isLoading={true}
      amount={0}
      progress={0}
      target={0}
      title="Essential budget"
      description="Target: x% of your monthly income"
      icon={<House className="text-muted-foreground size-5" />}
    />
  );
}
export function EssentialBudget({
  spent,
  target,
  remaining,
  progress,
  budgetPercentage,
}: EssentialBudgetProps) {
  return (
    <DetailedCard
      title="Essential budget"
      description={`Target: ${budgetPercentage}% of your monthly income`}
      amount={spent}
      target={target}
      progress={progress}
      message={<Message remaining={remaining} />}
      icon={<House className="text-muted-foreground size-5" />}
    />
  );
}
