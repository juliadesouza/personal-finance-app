import { useCategories } from "@/hooks/use-categories";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import SettingsCard from "./SettingsCard";
import { TagIcon } from "lucide-react";
import type { CategoryData } from "@/types/category";

export default function CategoriesCard() {
  const { query, mutation } = useCategories();
  const { data, isPending } = query;

  useEffect(() => {
    toast.add({
      type: "error",
      title: "The categories could not be loaded.",
    });
  }, [query.isError]);

  useEffect(() => {
    toast.add({ type: "success", title: "The category was created." });
  }, [mutation.isSuccess]);

  const handleAdd = async (category: CategoryData) => {
    try {
      await mutation.mutateAsync(category);
    } catch {
      toast.add({
        type: "error",
        title: "The category could not be created.",
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
      />
    </>
  );
}
