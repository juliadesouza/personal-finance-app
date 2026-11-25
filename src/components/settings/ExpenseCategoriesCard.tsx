import { useCategories } from "@/hooks/use-categories";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { CategoryData } from "@/types/setting";

export function ExpenseCategoriesCard() {
  const { getCategories, createCategory, deleteCategory } = useCategories();

  const { isPending = false, isError = false } = getCategories;
  const categories = getCategories?.data || [];

  useEffect(() => {
    if (isError) {
      toast.add({
        type: "error",
        title: "Unable to load categories.",
      });
    }
  }, [isError]);

  const handleAdd = (category: CategoryData) => {
    createCategory.mutate(category, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Category created successfully.",
        });
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "Unable to create category.",
        });
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteCategory.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "Category deleted successfully.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "Unable to delete category.",
        }),
    });
  };

  return (
    <SettingsCard
      title="Expense Categories"
      items={categories}
      isPending={isPending}
      icon={<TagIcon />}
      type="expense-category"
      onAdd={handleAdd}
      onDelete={handleDelete}
    />
  );
}
