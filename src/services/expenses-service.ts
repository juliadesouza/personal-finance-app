import type { ExpenseData, ExpenseFilters } from "@/types/expense";
import { api } from "./api";

type UpdateExpenseType = {
  id: number;
  expense: ExpenseData;
};

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

export async function deleteExpense(id: number) {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
}

export async function updateExpense({ id, expense }: UpdateExpenseType) {
  const { data } = await api.patch(`/expenses/${id}`, { ...expense });
  return data;
}
