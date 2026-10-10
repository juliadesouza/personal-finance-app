import type { CategoryData } from "@/types/category";
import { api } from "./api";

export async function getCategories() {
  const { data } = await api.get("/settings/categories");
  return data;
}

export async function createCategory({ title, color }: CategoryData) {
  const { data } = await api.put("/settings/categories", { title, color });
  return data;
}
