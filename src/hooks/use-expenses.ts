import {
  createExpense,
  getDates,
  getExpenses,
} from "@/services/expenses-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useExpenses() {
  const queryClient = useQueryClient();

  const queryExpenses = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const queryDates = useQuery({
    queryKey: ["expenses-dates"],
    queryFn: getDates,
  });

  const createMutation = useMutation({
    mutationKey: ["create-expense"],
    mutationFn: createExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });

  return {
    expenses: { ...queryExpenses },
    dates: { ...queryDates },
    createMutation,
  };
}
