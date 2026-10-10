import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { PaymentMethodData } from "@/types/category";
import { usePayments } from "@/hooks/use-payments";

export default function PaymentMethodsCard() {
  const { query, createMutation, deleteMutation } = usePayments();
  const { data, isPending } = query;

  useEffect(() => {
    query.isError &&
      toast.add({
        type: "error",
        title: "The payment methods could not be loaded.",
      });
  }, [query.isError]);

  useEffect(() => {
    createMutation.isSuccess &&
      toast.add({ type: "success", title: "The payment method was created." });
  }, [createMutation.isSuccess]);

  useEffect(() => {
    deleteMutation.isSuccess &&
      toast.add({ type: "success", title: "The payment method was deleted." });
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
