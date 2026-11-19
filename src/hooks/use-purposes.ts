import { useQuery } from "@tanstack/react-query";
import { getPurposes as getPurposesService } from "@/services/settings-service";

export function usePurposes() {
  const getPurposes = useQuery({
    queryKey: ["purposes"],
    queryFn: getPurposesService,
  });

  return { getPurposes };
}
