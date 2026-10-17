// src/hooks/use-expenses.ts
import {
  createExpense,
  getDates,
  getExpenses,
} from "@/services/expenses-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExpenseFilters } from "@/types/expense";

export const expensesKeys = {
  all: ["expenses"] as const,
  list: (filters: ExpenseFilters) =>
    [...expensesKeys.all, "list", filters] as const,
  dates: () => [...expensesKeys.all, "dates"] as const,
};

export function useExpenses(
  filters: ExpenseFilters = {},
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: expensesKeys.list(filters),
    queryFn: () => getExpenses(filters),
    enabled: options.enabled ?? true,
  });
}

export function useExpenseDates() {
  return useQuery({
    queryKey: expensesKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-expense"],
    mutationFn: createExpense,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
  });
}
