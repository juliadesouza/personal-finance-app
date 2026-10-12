import type { ExpenseData } from "@/types/expense";
import { api } from "./api";

export async function createExpense(expense: ExpenseData) {
  const { data } = await api.put("/expenses", { ...expense });
  return data;
}

export async function getExpenses() {
  const { data } = await api.get("/expenses");
  return data;
}

export async function getDates() {
  const { data } = await api.get("/expenses/dates");
  return data;
}
