import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPayments as getPaymentsService,
  createPayment as createPaymentService,
  deletePayment as deletePaymentService,
} from "@/services/settings-service";
import { type PaymentMethodData } from "@/types/setting";

export function usePayments() {
  const queryClient = useQueryClient();

  const getPayments = useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentsService,
  });

  const createPayment = useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (data: PaymentMethodData) => createPaymentService(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });

  const deletePayment = useMutation({
    mutationKey: ["delete-payment"],
    mutationFn: (id: number) => deletePaymentService(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });

  return { getPayments, createPayment, deletePayment };
}
