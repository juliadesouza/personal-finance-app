import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/services/settings-service";
import { type CategoryData } from "@/types/category";

export function useCategories() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const createMutation = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: CategoryData) => createCategory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { query, createMutation, deleteMutation };
}
