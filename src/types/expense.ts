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
};

export type ExpenseData = {
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  purposeId: number;
  paymentMethodId: number;
  installments: number;
};

export type FilterExpense = {
  month?: number;
  year?: number;
  search?: string;
};

export type UpdateExpense = {
  id: number;
  expense: ExpenseData;
};
