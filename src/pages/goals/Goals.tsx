import PageHeader from "@/components/common/PageHeader";
import { AddGoal } from "@/components/goals/AddGoal";
import { useGoals } from "@/hooks/use-goals";
import type { Goal } from "@/types/goal";
import { GoalCard } from "@/components/goals/GoalCard";

export default function Goals() {
  const { data: goals } = useGoals();

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
        <div className="grid grid-cols-3">
          {goals?.map((goal: Goal) => (
            <GoalCard {...goal} key={`goal-card-${goal.id}`} />
          ))}
        </div>
      </main>
    </section>
  );
}
