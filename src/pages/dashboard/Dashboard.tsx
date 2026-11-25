import PageHeader from "@/components/common/PageHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { useWalletDates, useWallet } from "@/hooks/use-wallet";
import { useAuth } from "@/providers/auth/auth-context";
import type { Period, Date } from "@/types/date";
import { getDefaultPeriod, getMonthLabel } from "@/utils/format";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useState } from "react";
import { SavingsGoalList } from "@/components/dashboard/SavingsGoalList";
import { useExpensesByCategory } from "@/hooks/use-expenses";
import { ExpensesByCategory } from "@/components/dashboard/ExpensesByCategory";
import { MonthlyBudget } from "@/components/dashboard/MonthlyBudget";
import { useGoals } from "@/hooks/use-goals";

export default function Dashboard() {
  const { user } = useAuth();
  const name = user?.name.split(" ")[0];

  const [selected, setSelected] = useState<Period | null>(null);

  const { data: dates } = useWalletDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const { overview, isPending = false } = useWallet(
    {
      year: Number(period.year),
      month: Number(period.month),
    },
    { enabled: !!dates },
  );

  const { data: expensesByCategory } = useExpensesByCategory(
    { year: Number(period.year), month: Number(period.month) },
    { enabled: !!dates },
  );

  const { getGoals } = useGoals(
    {
      year: Number(period.year),
      month: Number(period.month),
    },
    { enabled: !!dates },
  );

  const { data: goals = [], isPending: isPendingGoals } = getGoals;

  const handleYearChange = (year: string | null) => {
    if (year) setSelected({ year, month: months[0] });
  };

  const handleMonthChange = (month: string | null) => {
    if (month) setSelected({ year: period.year, month });
  };

  return (
    <section className="w-full">
      <PageHeader
        title={`Welcome back, ${name}!`}
        description="It's the best time to manage your finances."
      />
      <main>
        <div className="flex items-center gap-2 mb-8">
          <Select value={period.year} onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue>{period.year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {dateOptions.map((d) => (
                <SelectItem key={d.year} value={d.year}>
                  {d.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={period.month} onValueChange={handleMonthChange}>
            <SelectTrigger>
              <SelectValue>{getMonthLabel(period.month)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {getMonthLabel(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-8">
          <WalletOverview {...overview} isLoading={isPending} />
          <div className="grid grid-cols-3 gap-8">
            <MonthlyBudget
              income={overview?.income}
              expenses={overview?.expense?.amount}
              savings={overview?.saving?.amount}
              isLoading={isPending}
            />
            <ExpensesByCategory
              expenses={expensesByCategory}
              isLoading={isPending}
            />
            <SavingsGoalList goals={goals} isLoading={isPendingGoals} />
          </div>
        </div>
      </main>
    </section>
  );
}
