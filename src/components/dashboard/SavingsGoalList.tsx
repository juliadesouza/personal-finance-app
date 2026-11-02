import { useGoals } from "@/hooks/use-goals";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Goal } from "@/types/goal";
import { formatCurrency } from "@/utils/format";
import { ProgressBar } from "../common/ProgressBar";

export function SavingsGoalList() {
  const { data: goals } = useGoals();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">Saving goals</CardTitle>
      </CardHeader>
      <CardContent>
        {goals?.map((goal: Goal) => (
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
        ))}
      </CardContent>
    </Card>
  );
}
