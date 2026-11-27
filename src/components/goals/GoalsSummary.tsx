import type { Goal } from "@/types/goal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency, formatDate } from "@/utils/format";
import { Calendar } from "lucide-react";
import { ProgressBar } from "../common/ProgressBar";
import { Skeleton } from "../ui/skeleton";

interface GoalsSummaryProps {
  goals: Goal[];
  isLoading: boolean;
}

export function LoadingGoalsSummary() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {Array.from({ length: 4 }, (_, idx) => (
        <Card
          className="w-full min-w-0 sm:w-70 shrink-0"
          key={`loading-goal-summary-${idx}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 flex-1" />
            </CardTitle>
            <CardDescription className="flex items-center text-xs gap-2">
              <Calendar className="size-3" />
              <Skeleton className="h-4 flex-1" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Skeleton className="h-4 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function GoalsSummary({ goals, isLoading }: GoalsSummaryProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {isLoading && <LoadingGoalsSummary />}
      {!isLoading &&
        goals?.length > 0 &&
        goals.map((goal: Goal) => (
          <Card
            className="w-full min-w-0 sm:w-70 shrink-0"
            key={`goal-card-${goal.id}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{goal.title}</span>
                <span>{goal.progress}%</span>
              </CardTitle>
              <CardDescription className="flex items-center text-xs gap-2">
                <Calendar className="size-3" /> {formatDate(goal.dueDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <span className="text-lg font-semibold">
                  {formatCurrency(goal.currentAmount) ?? 0}
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  / {formatCurrency(goal.targetAmount) ?? 0}
                </span>
              </div>
              <div>
                <ProgressBar progress={goal.progress ?? 0} />
                <div className="flex justify-between mt-2 text-xs">
                  {formatCurrency(goal.left) ?? 0} left
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
