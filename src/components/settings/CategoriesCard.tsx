import { useCategories } from "@/hooks/use-categories";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { CategoryData } from "@/types/setting";

export default function CategoriesCard() {
  const { data, isPending, isError, createMutation, deleteMutation } =
    useCategories();

  useEffect(() => {
    if (isError) {
      toast.add({
        type: "error",
        title: "The categories could not be loaded.",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.add({ type: "success", title: "The category was created." });
    }
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.add({ type: "success", title: "The category was deleted." });
    }
  }, [deleteMutation.isSuccess]);

  const handleAdd = async (category: CategoryData) => {
    try {
      await createMutation.mutateAsync(category);
    } catch {
      toast.add({
        type: "error",
        title: "The category could not be created.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch {
      toast.add({
        type: "error",
        title: "The category could not be deleted.",
      });
    }
  };

  return (
    <>
      <SettingsCard
        title="Categories"
        items={data}
        isPending={isPending}
        icon={<TagIcon />}
        type="category"
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </>
  );
}
