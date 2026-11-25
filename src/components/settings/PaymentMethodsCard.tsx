import { toast } from "@/components/ui/toast";
import SettingsCard from "./SettingsCard";
import { CreditCard } from "lucide-react";
import type { PaymentMethodData } from "@/types/setting";
import { usePayments } from "@/hooks/use-payments";

export function PaymentMethodsCard() {
  const { getPayments, createPayment, deletePayment } = usePayments();

  const data = getPayments?.data ?? [];
  const isPending = getPayments?.isPending;

  const handleAdd = (method: PaymentMethodData) => {
    createPayment.mutate(method, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Payment method created successfully.",
        });
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "Unable to create payment method.",
        });
      },
    });
  };

  const handleDelete = (id: number) => {
    deletePayment.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "Payment method deleted successfully.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "Unable to delete payment method.",
        }),
    });
  };

  return (
    <SettingsCard
      title="Payment Methods"
      items={data}
      isPending={isPending}
      icon={<CreditCard />}
      type="payment-method"
      onAdd={handleAdd}
      onDelete={handleDelete}
    />
  );
}
