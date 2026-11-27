import { useQuery } from "@tanstack/react-query";
import { getTypes as getTypesService } from "@/services/settings-service";

export function useExpenseTypes() {
  const getTypes = useQuery({
    queryKey: ["expense-types"],
    queryFn: getTypesService,
  });

  return { getTypes };
}
