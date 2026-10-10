import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory } from "@/services/settings-service";
import { type CategoryData } from "@/types/category";

export function useCategories() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const mutation = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: CategoryData) => createCategory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { query, mutation };
}
