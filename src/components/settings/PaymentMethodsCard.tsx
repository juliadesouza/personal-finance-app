import { toast } from "@/components/ui/toast";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { PaymentMethodData } from "@/types/setting";
import { usePayments } from "@/hooks/use-payments";

export default function PaymentMethodsCard() {
  const { getPayments, createPayment, deletePayment } = usePayments();

  const data = getPayments?.data ?? [];
  const isPending = getPayments?.isPending;

  const handleAdd = async (method: PaymentMethodData) => {
    createPayment.mutate(method, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "The payment method was created.",
        });
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "The payment method could not be created.",
        });
      },
    });
  };

  const handleDelete = async (id: number) => {
    deletePayment.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The payment method was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The payment method could not be deleted.",
        }),
    });
  };

  return (
    <>
      <SettingsCard
        title="Payment Methods"
        items={data}
        isPending={isPending}
        icon={<TagIcon />}
        type="payment-method"
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </>
  );
}
