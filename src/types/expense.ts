export interface ExpenseData {
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  purposeId: number;
  paymentMethodId: number;
  installments: number;
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  payment: string;
  purpose: string;
  installmentsTotal: number;
  installmentNumber: number;
}
