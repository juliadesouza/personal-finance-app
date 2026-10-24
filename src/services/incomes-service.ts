import type { FilterIncome, UpdateIncome, IncomeData } from "@/types/income";
import { api } from "./api";

export async function getIncomes(filters: FilterIncome) {
  const { data } = await api.get("/incomes", { params: filters });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/incomes/dates");
  return data;
}

export async function createIncome(income: IncomeData) {
  const { data } = await api.post("/incomes", { ...income });
  return data;
}

export async function deleteIncome(id: number) {
  const { data } = await api.delete(`/incomes/${id}`);
  return data;
}

export async function updateIncome({ id, income }: UpdateIncome) {
  const { data } = await api.patch(`/incomes/${id}`, { ...income });
  return data;
}
