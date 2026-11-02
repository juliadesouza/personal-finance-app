import { api } from "./api";
import type { FilterWallet } from "@/types/wallet";

export async function getWallet(filters: FilterWallet) {
  const { data } = await api.get("/wallet", { params: filters });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/wallet/dates");
  return data;
}
