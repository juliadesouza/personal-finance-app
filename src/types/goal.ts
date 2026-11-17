export const GOAL_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export const GOAL_STATUS_VALUE_TO_TEXT = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In Progress",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
} as const;

export type GoalStatus = (typeof GOAL_STATUS)[keyof typeof GOAL_STATUS];

export type GoalData = {
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  dueDate: string;
  status: GoalStatus;
};

export type FilterGoal = {
  year?: number;
  month?: number;
  status?: GoalStatus;
};

export type UpdateGoal = {
  id: number;
  goal: GoalData;
};

export type Goal = {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  dueDate: string;
  status: GoalStatus;
  left: number;
  progress: number;
  saving: number;
};
