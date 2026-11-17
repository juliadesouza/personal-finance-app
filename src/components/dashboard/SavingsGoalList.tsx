import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Goal } from "@/types/goal";
import { formatCurrency } from "@/utils/format";
import { ProgressBar } from "../common/ProgressBar";
import { Skeleton } from "../ui/skeleton";
import { GOAL_STATUS_ICON } from "../goals/GoalStatus";

type SavingsGoalList = {
  goals: Goal[];
  isLoading: boolean;
};

export function SavingsGoalList({ goals, isLoading }: SavingsGoalList) {
  const hasNoData = !goals || goals.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">Saving goals</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-5 w-75" />
        ) : hasNoData ? (
          <p className="text-center text-muted-foreground">
            No goals match the selected filters.
          </p>
        ) : (
          goals?.map((goal: Goal) => {
            const StatusIcon = GOAL_STATUS_ICON[goal.status];
            return (
              <div key={`saving-widget-${goal.id}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-md flex gap-2 items-center">
                    <StatusIcon className="size-3" />
                    {goal.title}
                  </span>
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
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
