import type { ExpenseData, ExpenseFilters } from "@/types/expense";
import { api } from "./api";

export async function createExpense(expense: ExpenseData) {
  const { data } = await api.put("/expenses", { ...expense });
  return data;
}

export async function getExpenses(filters: ExpenseFilters) {
  const { data } = await api.get("/expenses", { params: filters });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/expenses/dates");
  return data;
}
