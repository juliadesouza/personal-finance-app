import { useQuery } from "@tanstack/react-query";
import { getTypes as getTypesService } from "@/services/settings-service";

export function useTypes() {
  const getTypes = useQuery({
    queryKey: ["types"],
    queryFn: getTypesService,
  });

  return { getTypes };
}
