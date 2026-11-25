import { getDates } from "@/services/expenses-service";
import { useQuery } from "@tanstack/react-query";
import type { FilterExpense } from "@/types/expense";
import type { FilterWallet } from "@/types/wallet";
import { getWallet as getWalletService } from "@/services/wallet-service";

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
  const getWallet = useQuery({
    queryKey: walletKeys.list(filters),
    queryFn: () => getWalletService(filters),
    enabled: options.enabled ?? true,
  });

  const { data, isPending } = getWallet;

  return {
    isPending,
    overview: data?.overview,
    savingsBudget: data?.savingsBudget,
    essentialBudget: data?.essentialBudget,
    discretionaryBudget: data?.discretionaryBudget,
    educationBudget: data?.educationBudget,
    topExpenses: data?.topExpenses,
    monthlyEssentialBudget: data?.monthlyEssentialBudget,
  };
}

export function useWalletDates() {
  return useQuery({
    queryKey: walletKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
