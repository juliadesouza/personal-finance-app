import { api } from "./api";
import type { SavingData, FilterSaving, UpdateSaving } from "@/types/saving";

export async function getSavings(filters: FilterSaving) {
  const { data } = await api.get("/savings", { params: filters });
  return data;
}

export async function createSaving(saving: SavingData) {
  const { data } = await api.post(`/savings`, { ...saving });
  return data;
}

export async function deleteSaving(id: number) {
  const { data } = await api.delete(`/savings/${id}`);
  return data;
}

export async function updateSaving({ id, saving }: UpdateSaving) {
  const { data } = await api.patch(`/savings/${id}`, { ...saving });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/savings/dates");
  return data;
}
