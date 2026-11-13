import {
  createGoal as createGoalService,
  deleteGoal as deleteGoalService,
  updateGoal as updateGoalService,
  getGoals,
} from "@/services/goals-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterGoal } from "@/types/goal";
import { invalidateWallet } from "@/lib/invalidate-wallet";

export const goalsKeys = {
  all: ["goals"] as const,
};

export function useGoals(filters: FilterGoal = {}) {
  const queryClient = useQueryClient();

  const goalsQuery = useQuery({
    queryKey: goalsKeys.all,
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
