import {
  createGoal as createGoalService,
  deleteGoal as deleteGoalService,
  updateGoal as updateGoalService,
  getGoals as getGoalService,
  getTotal as getTotalService,
  getDates,
} from "@/services/goals-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterGoal } from "@/types/goal";
import { invalidateWallet } from "@/lib/invalidate-wallet";

export const goalsKeys = {
  all: ["goals"] as const,
  list: (filters: FilterGoal) => ["goals", filters] as const,
  dates: () => [...goalsKeys.all, "dates"] as const,
  total: () => [...goalsKeys.all, "total"] as const,
};

export function useGoals(
  filters: FilterGoal = {},
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();

  const getGoals = useQuery({
    queryKey: goalsKeys.list(filters),
    queryFn: () => getGoalService(filters),
    enabled: options.enabled ?? true,
  });

  const getTotal = useQuery({
    queryKey: goalsKeys.total(),
    queryFn: getTotalService,
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
    getGoals,
    getTotal,
    createGoal,
    deleteGoal,
    updateGoal,
  };
}

export function useGoalDates() {
  return useQuery({
    queryKey: goalsKeys.dates(),
    queryFn: getDates,
    staleTime: 5 * 60 * 1000,
  });
}
