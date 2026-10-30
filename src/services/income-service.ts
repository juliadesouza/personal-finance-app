import type { FilterIncome, UpdateIncome, IncomeData } from "@/types/income";
import { api } from "./api";

export async function getIncome(filters: FilterIncome) {
  const { data } = await api.get("/income", { params: filters });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/income/dates");
  return data;
}

export async function createIncome(income: IncomeData) {
  const { data } = await api.post("/income", { ...income });
  return data;
}

export async function deleteIncome(id: number) {
  const { data } = await api.delete(`/income/${id}`);
  return data;
}

export async function updateIncome({ id, income }: UpdateIncome) {
  const { data } = await api.patch(`/income/${id}`, { ...income });
  return data;
}
