export type GoalData = {
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  dueDate: string;
};
export type FilterGoal = { status?: string };
export type UpdateGoal = { id: number; goal: GoalData };
export type Goal = {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  dueDate: string;
  left: number;
  progress: number;
  saving: number;
};
