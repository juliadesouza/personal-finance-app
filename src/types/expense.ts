export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: { id: number; title: string; color: string };
  payment: { id: number; title: string; color: string };
  purpose: { id: number; title: string; color: string };
  installmentsTotal: number;
  installmentNumber: number;
  isSimulation: boolean;
};

export type ExpenseData = {
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  purposeId: number;
  paymentMethodId: number;
  installments: number;
  isSimulation: boolean;
};

export type ExpenseSortField =
  | "date"
  | "title"
  | "category"
  | "purpose"
  | "payment";

export type SortOrder = "asc" | "desc";

export type FilterExpense = {
  month?: number;
  year?: number;
  search?: string;
  sortBy?: "title" | "date" | "category" | "payment" | "purpose";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export type PaginatedExpenses = {
  items: Expense[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type UpdateExpense = {
  id: number;
  expense: ExpenseData;
};
