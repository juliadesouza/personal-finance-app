import PageHeader from "@/components/common/PageHeader";
import { WalletSummary } from "@/components/wallet/WalletSummary";
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
import { SavingGoalsWidget } from "@/components/dashboard/SavingGoalsWidget";
import { useExpenses } from "@/hooks/use-expenses";
import { ExpensesPieChartWidget } from "@/components/dashboard/ExpensesPieChartWidget";
import { MonthlyBudgetWidget } from "@/components/dashboard/MonthlyBudgetWidget";

export default function Dashboard() {
  const { user } = useAuth();
  const name = user?.name.split(" ")[0];

  const [selected, setSelected] = useState<Period | null>(null);

  const { data: dates } = useWalletDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const { summary } = useWallet(
    {
      year: Number(period.year),
      month: Number(period.month),
    },
    { enabled: !!dates },
  );

  const { expensesByCategory } = useExpenses(
    {
      year: Number(period.year),
      month: Number(period.month),
    },
    { enabled: !!dates },
  );

  const handleYearChange = (year: string | null) => {
    if (year) setSelected({ year, month: months[0] });
  };

  const handleMonthChange = (month: string | null) => {
    if (month) setSelected({ year: period.year, month });
  };
  console.log(summary);
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
          <WalletSummary {...summary} />
          <div className="grid grid-cols-3 gap-8">
            <MonthlyBudgetWidget
              income={summary?.income}
              expenses={summary?.expense?.amount}
              savings={summary?.saving?.amount}
            />
            <ExpensesPieChartWidget expenses={expensesByCategory.data} />
            <SavingGoalsWidget />
          </div>
        </div>
      </main>
    </section>
  );
}
