export type SavingData = { amount: number; date: string };
export type GoalData = {
  title: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string;
};
export type FilterGoal = { status?: string };
export type UpdateGoal = { id: number; goal: GoalData };
export type UpdateSaving = { id: number; saving: SavingData };
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
