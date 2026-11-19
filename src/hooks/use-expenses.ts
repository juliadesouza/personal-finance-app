import {
  createExpense as createExpenseService,
  getExpenses as getExpensesService,
  deleteExpense as deleteExpenseService,
  updateExpense as updateExpenseService,
  getDates,
  getExpensesByCategory,
} from "@/services/expenses-service";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { FilterExpense } from "@/types/expense";
import { invalidateWallet } from "@/lib/invalidate-wallet";

export const expensesKeys = {
  all: ["expenses"] as const,
  list: (filters: FilterExpense) =>
    [...expensesKeys.all, "list", filters] as const,
  dates: () => [...expensesKeys.all, "dates"] as const,
  categories: (filters: FilterExpense) =>
    [...expensesKeys.all, "categories", filters] as const,
};

export function useExpenses(
  filters: FilterExpense = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const getExpenses = useQuery({
    queryKey: expensesKeys.list(filters),
    queryFn: () => getExpensesService(filters),
    enabled: options.enabled ?? true,
    placeholderData: keepPreviousData,
  });

  const createExpense = useMutation({
    mutationKey: ["create-expense"],
    mutationFn: createExpenseService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const deleteExpense = useMutation({
    mutationKey: ["delete-expense"],
    mutationFn: deleteExpenseService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const updateExpense = useMutation({
    mutationKey: ["update-expense"],
    mutationFn: updateExpenseService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: expensesKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  return {
    getExpenses,
    pagination: {
      page: getExpenses?.data?.page,
      totalPages: getExpenses?.data?.totalPages,
      total: getExpenses?.data?.total,
      pageSize: getExpenses?.data?.pageSize,
    },
    createExpense,
    deleteExpense,
    updateExpense,
  };
}

export function useExpenseDates() {
  return useQuery({
    queryKey: expensesKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}

export function useExpensesByCategory(
  filters: FilterExpense,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: expensesKeys.categories(filters),
    queryFn: () => getExpensesByCategory(filters),
    enabled: options.enabled ?? true,
  });
}
