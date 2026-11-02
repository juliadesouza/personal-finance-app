import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import type { Expense, ExpenseSortField, SortOrder } from "@/types/expense";
import { useExpenses, useExpenseDates } from "@/hooks/use-expenses";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { toast } from "@/components/ui/toast";
import { EditExpense } from "@/components/expenses/EditExpense";
import { type Period, type Date } from "@/types/date";
import { getDefaultPeriod, ALL } from "@/utils/format";
import ExpensesFilter from "@/components/expenses/ExpensesFilter";
import ExpensesTable from "@/components/expenses/ExpensesTable";
import { BalanceSummary } from "@/components/common/BalanceSummary";
import { useWallet } from "@/hooks/use-wallet";

const PAGE_SIZE = 12;

export default function Expenses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Period | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [sort, setSort] = useState<{
    sortBy: ExpenseSortField;
    order: SortOrder;
  }>({
    sortBy: "date",
    order: "desc",
  });

  const { data: dates } = useExpenseDates();

  const debouncedSearch = useDebouncedValue(search.trim());
  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);

  const { expenses, pagination, deleteMutation } = useExpenses(
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

  const { overview } = useWallet(
    {
      year: Number(period.year),
      month: Number(period.month),
    },
    { enabled: !!dates },
  );

  const handlePeriodChange = (next: Period) => {
    setSelected(next);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (field: ExpenseSortField) => {
    setSort((prev) =>
      prev.sortBy === field
        ? { sortBy: field, order: prev.order === "asc" ? "desc" : "asc" }
        : { sortBy: field, order: "asc" },
    );
    setPage(1);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The expense was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The expense could not be deleted.",
        }),
    });
  };

  return (
    <section className="w-full">
      <PageHeader title="Expenses" description="Track your daily expenses." />
      <main>
        <BalanceSummary {...overview} />
        <ExpensesFilter
          dateOptions={dateOptions}
          period={period}
          search={search}
          onPeriodChange={handlePeriodChange}
          onSearchChange={handleSearchChange}
        />
        <div>
          <ExpensesTable
            expenses={expenses ?? []}
            sort={sort}
            pagination={pagination}
            onSort={handleSort}
            onPageChange={setPage}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
          {editingExpense && (
            <EditExpense
              key={editingExpense.id}
              id={editingExpense.id}
              title={editingExpense.title}
              amount={editingExpense.amount}
              date={editingExpense.date}
              categoryId={editingExpense.category.id}
              paymentMethodId={editingExpense.payment.id}
              purposeId={editingExpense.purpose.id}
              isSimulation={editingExpense.isSimulation}
              open
              onOpenChange={() => setEditingExpense(null)}
            />
          )}
        </div>
      </main>
    </section>
  );
}
