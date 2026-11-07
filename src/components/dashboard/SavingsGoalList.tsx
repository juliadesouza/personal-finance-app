import { useGoals } from "@/hooks/use-goals";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Goal } from "@/types/goal";
import { formatCurrency } from "@/utils/format";
import { ProgressBar } from "../common/ProgressBar";
import { Skeleton } from "../ui/skeleton";

export function SavingsGoalList() {
  const { data: goals = [], isPending } = useGoals();

  const hasNoData = !goals || goals.length === 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">Saving goals</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="h-5 w-75" />
        ) : hasNoData ? (
          <p className="text-center text-muted-foreground">
            No goals created yet.
          </p>
        ) : (
          goals?.map((goal: Goal) => (
            <div key={`saving-widget-${goal.id}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-md">{goal.title}</span>
                <span className="text-md text-primary font-medium">
                  {formatCurrency(goal.currentAmount)}
                </span>
              </div>
              <ProgressBar
                progress={goal.progress}
                showPercentage={true}
                height={20}
                backgroundColor="#e7ebe0"
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
