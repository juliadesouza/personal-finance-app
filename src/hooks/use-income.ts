import {
  createIncome as createIncomeService,
  deleteIncome as deleteIncomeService,
  getIncome as getIncomeService,
  updateIncome as updateIncomeService,
  getDates,
} from "@/services/income-service";
import type { FilterIncome } from "@/types/income";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invalidateWallet } from "@/lib/invalidate-wallet";

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

  const getIncome = useQuery({
    queryKey: incomeKeys.list(filters),
    queryFn: () => getIncomeService(filters),
    enabled: options.enabled ?? true,
  });

  const createIncome = useMutation({
    mutationKey: ["create-income"],
    mutationFn: createIncomeService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const deleteIncome = useMutation({
    mutationKey: ["delete-income"],
    mutationFn: deleteIncomeService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const updateIncome = useMutation({
    mutationKey: ["update-income"],
    mutationFn: updateIncomeService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: incomeKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  return { getIncome, createIncome, deleteIncome, updateIncome };
}

export function useIncomeDates() {
  return useQuery({
    queryKey: incomeKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
