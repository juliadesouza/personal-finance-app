import {
  createIncome,
  deleteIncome,
  getDates,
  getIncome,
  updateIncome,
} from "@/services/income-service";
import type { FilterIncome } from "@/types/income";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesKeys } from "./use-expenses";

export const incomeKeys = {
  all: ["income"] as const,
  list: (filters: FilterIncome) =>
    [...incomeKeys.all, "list", filters] as const,
  dates: () => [...incomeKeys.all, "dates"] as const,
};

export function useIncome(
  filters: FilterIncome = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const income = useQuery({
    queryKey: incomeKeys.list(filters),
    queryFn: () => getIncome(filters),
    enabled: options.enabled ?? true,
  });

  const createMutation = useMutation({
    mutationKey: ["create-income"],
    mutationFn: createIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-income"],
    mutationFn: deleteIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-income"],
    mutationFn: updateIncome,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
  });

  return { ...income, createMutation, deleteMutation, updateMutation };
}

export function useIncomeDates() {
  return useQuery({
    queryKey: expensesKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
