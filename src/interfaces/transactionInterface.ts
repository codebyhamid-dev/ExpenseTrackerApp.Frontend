export interface TransactionDashboardCardsDto {
  totalIncome?: number;
  totalExpense?: number;
  balance?: number;
  totalTransactions?: number;
}
export interface DashboardChartDto {
  category: string;
  amount: number;
  percentage: number;
}
// transaction-type.enum.ts
export enum TransactionType {
  Credit = 0,
  Debit = 1,
}
// payment-mode.enum.ts
export enum PaymentMode {
  Cash = 0,
  Bank = 1,
  Card = 2,
}
export interface TransactionCreateDto {
  userId: string; // Guid → string in Angular
  transactionType: TransactionType; // Credit | Debit
  paymentMode: PaymentMode; // Cash | Bank | Card
  amount: number;
  category?: string;
  description?: string;
}
