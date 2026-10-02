export interface Expense {
  id: string;
  amount: number;
  date: Date;
  category: string;
  purpose: string;
  paymentMethod: string;
}