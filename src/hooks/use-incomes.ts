import {
  createIncome,
  deleteIncome,
  getDates,
  getIncomes,
  updateIncome,
} from "@/services/incomes-service";
import type { FilterIncome } from "@/types/income";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesKeys } from "./use-expenses";

export const incomesKeys = {
  all: ["incomes"] as const,
  list: (filters: FilterIncome) =>
    [...incomesKeys.all, "list", filters] as const,
  dates: () => [...incomesKeys.all, "dates"] as const,
};

export function useIncomes(
  filters: FilterIncome = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const incomes = useQuery({
    queryKey: incomesKeys.list(filters),
    queryFn: () => getIncomes(filters),
    enabled: options.enabled ?? true,
  });

  const createMutation = useMutation({
    mutationKey: ["create-income"],
    mutationFn: createIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomesKeys.all }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-mutation"],
    mutationFn: deleteIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomesKeys.all }),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-mutation"],
    mutationFn: updateIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomesKeys.all }),
  });

  return { ...incomes, createMutation, deleteMutation, updateMutation };
}

export function useIncomesDates() {
  return useQuery({
    queryKey: expensesKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
