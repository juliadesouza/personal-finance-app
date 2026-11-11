import PageHeader from "@/components/common/PageHeader";
import { GoalsSummary } from "@/components/goals/GoalsSummary";
import { SavingsFilter } from "@/components/goals/SavingsFilter";
import { SavingsTable } from "@/components/goals/SavingsTable";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { useGoals, useSavingDates, useSavings } from "@/hooks/use-goals";
import type { Period, Date } from "@/types/date";
import type { SavingSortField } from "@/types/goal";
import { ALL, getDefaultPeriod } from "@/utils/format";
import { useState } from "react";
import type { SortOrder } from "@/components/common/SortableHead";

const PAGE_SIZE = 12;

export default function Savings() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Period | null>(null);
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

  const { savingsQuery, pagination } = useSavings(
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

  const { data = {}, isPending = false } = savingsQuery;
  const { items: savings = [] } = data;

  const { goalsQuery } = useGoals();
  const { data: goals, isPending: isLoadingGoals = false } = goalsQuery;

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
          // onEdit={setEditingExpense}
          // onDelete={handleDelete}
          isLoading={isPending}
        />
      </main>
    </section>
  );
}
