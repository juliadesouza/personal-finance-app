import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories as getCategoriesService,
  createCategory as createCategoryService,
  deleteCategory as deleteCategoryService,
} from "@/services/settings-service";
import { type CategoryData } from "@/types/setting";

export function useCategories() {
  const queryClient = useQueryClient();

  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });

  const createCategory = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: CategoryData) => createCategoryService(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const deleteCategory = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: number) => deleteCategoryService(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { getCategories, createCategory, deleteCategory };
}
