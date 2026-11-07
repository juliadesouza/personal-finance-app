import PageHeader from "@/components/common/PageHeader";
import { AddGoal } from "@/components/goals/AddGoal";
import { useGoals } from "@/hooks/use-goals";
import type { Goal } from "@/types/goal";
import { GoalCard, LoadingGoalCard } from "@/components/goals/GoalCard";

export default function Goals() {
  const { data: goals, isPending } = useGoals();

  const hasNoData = !isPending && goals.length === 0;

  return (
    <section className="w-full">
      <PageHeader
        title="Goals"
        description="Create financial goals and track your savings."
      />
      <main>
        <div className="flex items-center justify-between mb-8">
          <AddGoal />
        </div>
        <div className="grid grid-cols-3 gap-8">
          {!isPending &&
            goals.length > 0 &&
            goals?.map((goal: Goal) => (
              <GoalCard {...goal} key={`goal-card-${goal.id}`} />
            ))}
          {isPending &&
            Array.from({ length: 3 }, (_, i) => (
              <LoadingGoalCard key={`goal-card-${i}`} />
            ))}
        </div>
        {!isPending && hasNoData && (
          <div className="flex flex-col align-center justify-center text-center">
            <h3 className="text-xl font-semibold mb-4">
              Create your first goal
            </h3>
            <p className="text-md text-muted-foreground">
              Set a target, choose a date and track your progress along the way.
            </p>
          </div>
        )}
      </main>
    </section>
  );
}
