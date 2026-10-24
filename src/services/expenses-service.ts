import type {
  ExpenseData,
  FilterExpense,
  UpdateExpense,
} from "@/types/expense";
import { api } from "./api";

export async function getExpenses(filters: FilterExpense) {
  const { data } = await api.get("/expenses", { params: filters });
  return data;
}

export async function getDates() {
  const { data } = await api.get("/expenses/dates");
  return data;
}

export async function createExpense(expense: ExpenseData) {
  const { data } = await api.put("/expenses", { ...expense });
  return data;
}

export async function deleteExpense(id: number) {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
}

export async function updateExpense({ id, expense }: UpdateExpense) {
  const { data } = await api.patch(`/expenses/${id}`, { ...expense });
  return data;
}
