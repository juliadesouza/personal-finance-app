import { BalanceSummary } from "@/components/common/BalanceSummary";
import PageHeader from "@/components/common/PageHeader";
import { EditIncome } from "@/components/income/EditIncome";
import IncomeFilter from "@/components/income/IncomeFilter";
import { IncomeTable } from "@/components/income/IncomeTable";
import { toast } from "@/components/ui/toast";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { useIncome, useIncomeDates } from "@/hooks/use-income";
import { useWallet } from "@/hooks/use-wallet";
import { type Period, type Date } from "@/types/date";
import type { Income } from "@/types/income";
import { getDefaultPeriod, ALL } from "@/utils/format";
import { useState } from "react";

export default function Income() {
  const [selected, setSelected] = useState<Period | null>(null);
  const [search, setSearch] = useState("");
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  const { data: dates } = useIncomeDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);

  const debouncedSearch = useDebouncedValue(search.trim());
  const { data: income, deleteMutation } = useIncome(
    {
      year: period.year === ALL ? undefined : Number(period.year),
      month: period.month === ALL ? undefined : Number(period.month),
      ...(debouncedSearch && { search: debouncedSearch }),
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
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The income was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The income could not be deleted.",
        }),
    });
  };

  return (
    <section className="w-full">
      <PageHeader title="Income" description="Track your daily income." />
      <main>
        <BalanceSummary {...overview} />
        <IncomeFilter
          dateOptions={dateOptions}
          period={period}
          search={search}
          onPeriodChange={handlePeriodChange}
          onSearchChange={handleSearchChange}
        />
        <div>
          <IncomeTable
            income={income ?? []}
            onEdit={setEditingIncome}
            onDelete={handleDelete}
          />
          {editingIncome && (
            <EditIncome
              id={editingIncome?.id}
              open
              onOpenChange={() => setEditingIncome(null)}
              title={editingIncome?.title}
              amount={editingIncome?.amount}
              date={editingIncome?.date}
            />
          )}
        </div>
      </main>
    </section>
  );
}
