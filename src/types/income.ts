export type IncomeData = { title: string; amount: number; date: string };
export type FilterIncome = { month?: number; year?: number; search?: string };
export type UpdateIncome = { id: number; income: IncomeData };
export type Income = {
  id: number;
  title: string;
  amount: number;
  date: string;
};
