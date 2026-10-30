// src/hooks/use-expenses.ts
import {
  createExpense,
  getDates,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpensesByCategory,
} from "@/services/expenses-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterExpense } from "@/types/expense";

export const expensesKeys = {
  all: ["expenses"] as const,
  list: (filters: FilterExpense) =>
    [...expensesKeys.all, "list", filters] as const,
  dates: () => [...expensesKeys.all, "dates"] as const,
  categories: () => [...expensesKeys.all, "categories"] as const,
};

export function useExpenses(
  filters: FilterExpense = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const expenses = useQuery({
    queryKey: expensesKeys.list(filters),
    queryFn: () => getExpenses(filters),
    enabled: options.enabled ?? true,
  });

  const createMutation = useMutation({
    mutationKey: ["create-expense"],
    mutationFn: createExpense,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-expense"],
    mutationFn: deleteExpense,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-expense"],
    mutationFn: updateExpense,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
  });

  const expensesByCategory = useQuery({
    queryKey: expensesKeys.categories(),
    queryFn: () => getExpensesByCategory(filters),
    enabled: options.enabled ?? true,
  });

  return {
    ...expenses,
    createMutation,
    deleteMutation,
    updateMutation,
    expensesByCategory,
  };
}

export function useExpenseDates() {
  return useQuery({
    queryKey: expensesKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
