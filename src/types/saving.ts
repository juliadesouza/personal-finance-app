import type { Goal } from "./goal";

export type SavingData = { goalId: number; amount: number; date: string };

export type UpdateSaving = { id: number; saving: SavingData };

export type Saving = {
  id: number;
  goal: Goal;
  amount: number;
  date: string;
};

export type FilterSaving = {
  month?: number;
  year?: number;
  search?: string;
  sortBy?: "goal" | "date";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export type SavingSortField = "date" | "goal";
