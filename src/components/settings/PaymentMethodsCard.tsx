import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { PaymentMethodData } from "@/types/setting";
import { usePayments } from "@/hooks/use-payments";

export default function PaymentMethodsCard() {
  const { data, isPending, isError, createMutation, deleteMutation } =
    usePayments();

  useEffect(() => {
    if (isError) {
      toast.add({
        type: "error",
        title: "The payment methods could not be loaded.",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.add({ type: "success", title: "The payment method was created." });
    }
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.add({ type: "success", title: "The payment method was deleted." });
    }
  }, [deleteMutation.isSuccess]);

  const handleAdd = async (method: PaymentMethodData) => {
    try {
      await createMutation.mutateAsync(method);
    } catch {
      toast.add({
        type: "error",
        title: "The payment method could not be created.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch {
      toast.add({
        type: "error",
        title: "The payment method could not be deleted.",
      });
    }
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
