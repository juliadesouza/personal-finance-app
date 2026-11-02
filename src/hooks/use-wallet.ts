import { getDates } from "@/services/expenses-service";
import { useQuery } from "@tanstack/react-query";
import type { FilterExpense } from "@/types/expense";
import type { FilterWallet } from "@/types/wallet";
import { getWallet } from "@/services/wallet-service";

export const walletKeys = {
  all: ["wallet"] as const,
  list: (filters: FilterExpense) =>
    [...walletKeys.all, "list", filters] as const,
  dates: () => [...walletKeys.all, "dates"] as const,
};

export function useWallet(
  filters: FilterWallet = {},
  options: { enabled?: boolean } = {},
) {
  const { data } = useQuery({
    queryKey: walletKeys.list(filters),
    queryFn: () => getWallet(filters),
    enabled: options.enabled ?? true,
  });

  return {
    overview: data?.overview,
    savingsGoal: data?.savingsGoal,
    flexibleBudget: data?.flexibleBudget,
    topExpenses: data?.topExpenses,
    fixedExpenses: data?.fixedExpenses,
  };
}

export function useWalletDates() {
  return useQuery({
    queryKey: walletKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
