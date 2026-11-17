import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import GoalsFilter from "@/components/goals/GoalsFilter";
import { useGoals, useGoalDates } from "@/hooks/use-goals";
import type { FilterGoal, Goal, GoalStatus } from "@/types/goal";
import { GoalCard, LoadingGoalCard } from "@/components/goals/GoalCard";
import type { Date, Period } from "@/types/date";
import { ALL, getDefaultPeriod } from "@/utils/format";
import { GoalsTotal } from "@/components/goals/GoalsTotal";
import { SavingsChart } from "@/components/savings/SavingsChart";

export default function Goals() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | null>(null);

  const { data: dates } = useGoalDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selectedPeriod ?? getDefaultPeriod(dateOptions);

  const filters: FilterGoal = {
    year: period.year === ALL ? undefined : Number(period.year),
    month: period.month === ALL ? undefined : Number(period.month),
    status: selectedStatus ?? undefined,
  };

  const { getGoals, getTotal } = useGoals(filters, {
    enabled: !!dates,
  });

  const { data: goals = [], isPending } = getGoals;
  const { data: total = [], isPending: isPendingTotal } = getTotal;

  const handlePeriodChange = (next: Period) => {
    setSelectedPeriod(next);
  };

  const handleStatusChange = (newStatus: GoalStatus | null) => {
    setSelectedStatus(newStatus);
  };

  const hasNoData = !isPending && goals.length === 0;
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined,
  );

  return (
    <section className="w-full">
      <PageHeader
        title="Goals"
        description="Create financial goals and track your savings."
      />

      <main>
        <GoalsFilter
          dateOptions={dateOptions}
          period={period}
          status={selectedStatus}
          onPeriodChange={handlePeriodChange}
          onStatusChange={handleStatusChange}
        />

        <div className="grid grid-cols-3 gap-8">
          {!isPending &&
            goals.map((goal: Goal) => (
              <GoalCard {...goal} key={`goal-card-${goal.id}`} />
            ))}

          {isPending &&
            Array.from({ length: 3 }, (_, i) => (
              <LoadingGoalCard key={`goal-card-${i}`} />
            ))}
        </div>

        {hasNoData && (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <h3 className="text-xl font-semibold mb-4">
              {hasActiveFilters ? "No goals found" : "Create your first goal"}
            </h3>

            <p className="text-md text-muted-foreground">
              {hasActiveFilters
                ? "No goals match the selected filters. Try changing your filters."
                : "Set a target, choose a date and track your progress along the way."}
            </p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-8 mt-8">
          <GoalsTotal items={total} isLoading={isPendingTotal} />
          <div className="col-span-2">
            <SavingsChart />
          </div>
        </div>
      </main>
    </section>
  );
}
