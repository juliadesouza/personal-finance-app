import { useQuery } from "@tanstack/react-query";
import { getPurposes } from "@/services/settings-service";

export function usePurposes() {
  const { data, isPending } = useQuery({
    queryKey: ["purposes"],
    queryFn: getPurposes,
  });

  return { data, isPending };
}
