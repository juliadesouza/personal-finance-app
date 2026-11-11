export type SavingData = { goalId: number; amount: number; date: string };
export type GoalData = {
  title: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string;
};
export type FilterGoal = { status?: string };
export type UpdateGoal = { id: number; goal: GoalData };
export type Goal = {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string;
  left: number;
  progress: number;
  saving: number;
};
export type Saving = {
  id: string;
  goal: string;
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
