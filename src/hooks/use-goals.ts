import {
  createGoal as createGoalService,
  deleteGoal as deleteGoalService,
  updateGoal as updateGoalService,
  createSaving as createSavingService,
  getSavings,
  getGoals,
  getSavingDates,
} from "@/services/goals-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterGoal, FilterSaving } from "@/types/goal";
import { invalidateWallet } from "@/lib/invalidate-finance";

export const goalsKeys = {
  all: ["goals"] as const,
  list: (filters: FilterGoal) => [...goalsKeys.all, "list", filters] as const,
};

export function useGoals(filters: FilterGoal = {}) {
  const queryClient = useQueryClient();

  const goalsQuery = useQuery({
    queryKey: goalsKeys.list(filters),
    queryFn: () => getGoals(filters),
  });

  const createGoal = useMutation({
    mutationKey: ["create-goal"],
    mutationFn: createGoalService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const deleteGoal = useMutation({
    mutationKey: ["delete-goal"],
    mutationFn: deleteGoalService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  const updateGoal = useMutation({
    mutationKey: ["update-goal"],
    mutationFn: updateGoalService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
        invalidateWallet(queryClient),
      ]),
  });

  return {
    goalsQuery,
    createGoal,
    deleteGoal,
    updateGoal,
  };
}

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

  const savingsQuery = useQuery({
    queryKey: savingsKeys.list(filters),
    queryFn: () => getSavings(filters),
    enabled: options.enabled ?? true,
  });

  const createSaving = useMutation({
    mutationKey: ["create-saving"],
    mutationFn: createSavingService,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...goalsKeys.all, ...savingsKeys.all],
        }),
        invalidateWallet(queryClient),
      ]),
  });

  return {
    savingsQuery,
    createSaving,
    pagination: {
      page: savingsQuery?.data?.page,
      totalPages: savingsQuery?.data?.totalPages,
      total: savingsQuery?.data?.total,
      pageSize: savingsQuery?.data?.pageSize,
    },
  };
}

export function useSavingDates() {
  return useQuery({
    queryKey: savingsKeys.dates(),
    queryFn: getSavingDates,
    staleTime: 5 * 60 * 1000,
  });
}
