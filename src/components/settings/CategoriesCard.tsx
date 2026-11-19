import { useCategories } from "@/hooks/use-categories";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { CategoryData } from "@/types/setting";

export default function CategoriesCard() {
  const { getCategories, createCategory, deleteCategory } = useCategories();

  const { isPending = false, isError = false } = getCategories;
  const categories = getCategories?.data || [];

  useEffect(() => {
    if (isError) {
      toast.add({
        type: "error",
        title: "The categories could not be loaded.",
      });
    }
  }, [isError]);

  const handleAdd = async (category: CategoryData) => {
    createCategory.mutate(category, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "The income was created.",
        });
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "The income could not be created.",
        });
      },
    });
  };

  const handleDelete = async (id: number) => {
    deleteCategory.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The category was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The category could not be deleted.",
        }),
    });
  };

  return (
    <>
      <SettingsCard
        title="Categories"
        items={categories}
        isPending={isPending}
        icon={<TagIcon />}
        type="category"
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </>
  );
}
