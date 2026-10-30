import {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal,
  addSaving,
} from "@/services/goals-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FilterGoal } from "@/types/goal";

export const goalsKeys = {
  all: ["goals"] as const,
  list: (filters: FilterGoal) => [...goalsKeys.all, "list", filters] as const,
};

export function useGoals(filters: FilterGoal = {}) {
  const queryClient = useQueryClient();

  const goals = useQuery({
    queryKey: goalsKeys.list(filters),
    queryFn: () => getGoals(filters),
  });

  const createMutation = useMutation({
    mutationKey: ["create-goal"],
    mutationFn: createGoal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-goal"],
    mutationFn: deleteGoal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-goal"],
    mutationFn: updateGoal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
  });

  const savingMutation = useMutation({
    mutationKey: ["add-saving"],
    mutationFn: addSaving,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsKeys.all }),
  });

  return {
    ...goals,
    createMutation,
    deleteMutation,
    updateMutation,
    savingMutation,
  };
}
