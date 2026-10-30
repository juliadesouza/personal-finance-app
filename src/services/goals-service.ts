import { api } from "./api";
import type {
  UpdateSaving,
  FilterGoal,
  GoalData,
  UpdateGoal,
} from "@/types/goal";

export async function getGoals(filters: FilterGoal) {
  const { data } = await api.get("/goals", { params: filters });
  return data;
}

export async function createGoal(goal: GoalData) {
  const { data } = await api.post("/goals", { ...goal });
  return data;
}

export async function deleteGoal(id: number) {
  const { data } = await api.delete(`/goals/${id}`);
  return data;
}

export async function updateGoal({ id, goal }: UpdateGoal) {
  const { data } = await api.patch(`/goals/${id}`, { ...goal });
  return data;
}

export async function addSaving({ id, saving }: UpdateSaving) {
  const { data } = await api.patch(`/goals/savings/${id}`, { ...saving });
  return data;
}
