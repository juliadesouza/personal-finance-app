import type { QueryClient } from "@tanstack/react-query";
import { walletKeys } from "@/hooks/use-wallet";

export function invalidateWallet(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: walletKeys.all });
}
