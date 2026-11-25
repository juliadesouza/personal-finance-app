import PageHeader from "@/components/common/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EssentialBudget,
  LoadingEssentialBudget,
} from "@/components/wallet/EssentialBudget";
import { MonthlyEssentialBudget } from "@/components/wallet/MonthlyEssentialBudget";
import {
  DiscretionaryBudget,
  LoadingDiscretionaryBudget,
} from "@/components/wallet/DiscretionaryBudget";
import {
  SavingsBudget,
  LoadingSavingsBudget,
} from "@/components/wallet/SavingsBudget";
import { TopExpenses } from "@/components/wallet/TopExpenses";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { useWalletDates, useWallet } from "@/hooks/use-wallet";
import type { Period, Date } from "@/types/date";
import { getDefaultPeriod, getMonthLabel } from "@/utils/format";
import { useState } from "react";
import {
  EducationBudget,
  LoadingEducationBudget,
} from "@/components/wallet/EducationBudget";

export default function Wallet() {
  const [selected, setSelected] = useState<Period | null>(null);

  const { data: dates } = useWalletDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const {
    isPending,
    overview,
    savingsBudget,
    essentialBudget,
    discretionaryBudget,
    educationBudget,
    topExpenses,
    monthlyEssentialBudget,
  } = useWallet(
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

  return (
    <section className="w-full pb-3 mb-3">
      <PageHeader
        title="Wallet"
        description="Your balance, savings and spending at a glance."
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
          <div className="grid grid-cols-2 gap-8">
            {isPending ? (
              <LoadingSavingsBudget />
            ) : (
              <SavingsBudget {...savingsBudget} />
            )}
            {isPending ? (
              <LoadingEssentialBudget />
            ) : (
              <EssentialBudget {...essentialBudget} />
            )}
            {isPending ? (
              <LoadingDiscretionaryBudget />
            ) : (
              <DiscretionaryBudget {...discretionaryBudget} />
            )}
            {isPending ? (
              <LoadingEducationBudget />
            ) : (
              <EducationBudget {...educationBudget} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <TopExpenses expenses={topExpenses} isLoading={isPending} />
            <MonthlyEssentialBudget
              expenses={monthlyEssentialBudget?.data}
              average={monthlyEssentialBudget?.average}
              isLoading={isPending}
            />
          </div>
        </div>
      </main>
    </section>
  );
}
