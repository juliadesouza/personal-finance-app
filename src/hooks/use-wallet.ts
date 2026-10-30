// src/hooks/use-expenses.ts
import { getDates } from "@/services/expenses-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterExpense } from "@/types/expense";
import type { FilterWallet } from "@/types/wallet";
import { getSummary } from "@/services/wallet-service";

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
  const queryClient = useQueryClient();

  const summary = useQuery({
    queryKey: walletKeys.list(filters),
    queryFn: () => getSummary(filters),
    enabled: options.enabled ?? true,
  });

  return { summary };
}

export function useWalletDates() {
  return useQuery({
    queryKey: walletKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
