import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPayments,
  createPayment,
  deletePayment,
} from "@/services/settings-service";
import { type PaymentMethodData } from "@/types/category";

export function usePayments() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["payments"], queryFn: getPayments });

  const createMutation = useMutation({
    mutationKey: ["createPayment"],
    mutationFn: (data: PaymentMethodData) => createPayment(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deletePayment"],
    mutationFn: (id: number) => deletePayment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });

  return { query, createMutation, deleteMutation };
}
