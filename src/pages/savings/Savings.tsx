import PageHeader from "@/components/common/PageHeader";
import { GoalsSummary } from "@/components/goals/GoalsSummary";
import { SavingsFilter } from "@/components/savings/SavingsFilter";
import { SavingsTable } from "@/components/savings/SavingsTable";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { useSavingDates, useSavings } from "@/hooks/use-savings";
import { useGoals } from "@/hooks/use-goals";
import type { Period, Date } from "@/types/date";
import type { Saving, SavingSortField } from "@/types/saving";
import { ALL, getDefaultPeriod } from "@/utils/format";
import { useState } from "react";
import type { SortOrder } from "@/components/common/SortableHead";
import { toast } from "@/components/ui/toast";
import { EditSaving } from "@/components/savings/EditSaving";

const PAGE_SIZE = 12;

export default function Savings() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Period | null>(null);
  const [editingSaving, setEditingSaving] = useState<Saving | null>(null);
  const [sort, setSort] = useState<{
    sortBy: SavingSortField;
    order: SortOrder;
  }>({
    sortBy: "date",
    order: "desc",
  });

  const { data: dates } = useSavingDates();

  const debouncedSearch = useDebouncedValue(search.trim());
  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);

  const { getSavings, deleteSaving, pagination } = useSavings(
    {
      year: period.year === ALL ? undefined : Number(period.year),
      month: period.month === ALL ? undefined : Number(period.month),
      sortBy: sort.sortBy,
      order: sort.order,
      ...(debouncedSearch && { search: debouncedSearch }),
      page,
      pageSize: PAGE_SIZE,
    },
    { enabled: !!dates },
  );

  const { data = {}, isPending = false } = getSavings;
  const { items: savings = [] } = data;

  const { getGoals } = useGoals();
  const { data: goals, isPending: isLoadingGoals = false } = getGoals;

  const handlePeriodChange = (next: Period) => {
    setSelected(next);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (field: SavingSortField) => {
    setSort((prev) =>
      prev.sortBy === field
        ? { sortBy: field, order: prev.order === "asc" ? "desc" : "asc" }
        : { sortBy: field, order: "asc" },
    );
    setPage(1);
  };

  const handleDelete = (id: number) => {
    deleteSaving.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The saving was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The saving could not be deleted.",
        }),
    });
  };

  return (
    <section className="w-full">
      <PageHeader
        title="Savings"
        description="Track all your savings contributions across your goals."
      />
      <main className="flex flex-col gap-8">
        <GoalsSummary isLoading={isLoadingGoals} goals={goals} />
        <SavingsFilter
          dateOptions={dateOptions}
          period={period}
          search={search}
          onPeriodChange={handlePeriodChange}
          onSearchChange={handleSearchChange}
        />
        <SavingsTable
          savings={savings ?? []}
          sort={sort}
          pagination={pagination}
          onSort={handleSort}
          onPageChange={setPage}
          onEdit={setEditingSaving}
          onDelete={handleDelete}
          isLoading={isPending}
        />
        {editingSaving && (
          <EditSaving
            key={editingSaving.id}
            id={editingSaving.id}
            amount={editingSaving.amount}
            date={editingSaving.date}
            goalId={editingSaving.goal.id}
            open
            onOpenChange={() => setEditingSaving(null)}
          />
        )}
      </main>
    </section>
  );
}
