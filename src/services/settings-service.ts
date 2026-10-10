import type { CategoryData, PaymentMethodData } from "@/types/category";
import { api } from "./api";

export async function getCategories() {
  const { data } = await api.get("/settings/categories");
  return data;
}

export async function createCategory({ title, color }: CategoryData) {
  const { data } = await api.put("/settings/categories", { title, color });
  return data;
}

export async function deleteCategory(id: number) {
  const { data } = await api.delete(`/settings/categories/${id}`);
  return data;
}

export async function getPayments() {
  const { data } = await api.get("/settings/payment-methods");
  return data;
}

export async function createPayment({ title, color }: PaymentMethodData) {
  const { data } = await api.put("/settings/payment-methods", { title, color });
  return data;
}

export async function deletePayment(id: number) {
  const { data } = await api.delete(`/settings/payment-methods/${id}`);
  return data;
}
