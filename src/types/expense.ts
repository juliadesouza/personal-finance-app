export type ExpenseData = {
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  purposeId: number;
  paymentMethodId: number;
  installments: number;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: { title: string; color: string };
  payment: { title: string; color: string };
  purpose: { title: string; color: string };
  installmentsTotal: number;
  installmentNumber: number;
};

export type ExpenseFilters = {
  month?: number;
  year?: number;
  search?: string;
};

export type ExpenseDate = {
  year: string;
  months: string[];
};
