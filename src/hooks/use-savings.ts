import {
  createSaving as createSavingService,
  updateSaving as updateSavingService,
  deleteSaving as deleteSavingService,
  getSavings as getSavingsService,
  getDates,
} from "@/services/savings-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterSaving } from "@/types/saving";
import { invalidateGoals } from "@/lib/invalidate-goals";

export const savingsKeys = {
  all: ["savings"] as const,
  list: (filters: FilterSaving) =>
    [...savingsKeys.all, "list", filters] as const,
  dates: () => [...savingsKeys.all, "dates"] as const,
};

export function useSavings(
  filters: FilterSaving = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const getSavings = useQuery({
    queryKey: savingsKeys.list(filters),
    queryFn: () => getSavingsService(filters),
    enabled: options.enabled ?? true,
  });

  const createSaving = useMutation({
    mutationKey: ["create-saving"],
    mutationFn: createSavingService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: savingsKeys.all,
        }),
        invalidateGoals(queryClient),
      ]),
  });

  const deleteSaving = useMutation({
    mutationKey: ["delete-goal"],
    mutationFn: deleteSavingService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: savingsKeys.all }),
        invalidateGoals(queryClient),
      ]),
  });

  const updateSaving = useMutation({
    mutationKey: ["update-goal"],
    mutationFn: updateSavingService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: savingsKeys.all }),
        invalidateGoals(queryClient),
      ]),
  });

  return {
    getSavings,
    createSaving,
    deleteSaving,
    updateSaving,
    pagination: {
      page: getSavings?.data?.page,
      totalPages: getSavings?.data?.totalPages,
      total: getSavings?.data?.total,
      pageSize: getSavings?.data?.pageSize,
    },
  };
}

export function useSavingDates() {
  return useQuery({
    queryKey: savingsKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
