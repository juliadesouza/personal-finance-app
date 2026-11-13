import type { QueryClient } from "@tanstack/react-query";
import { goalsKeys } from "@/hooks/use-goals";

export function invalidateGoals(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: goalsKeys.all });
}
