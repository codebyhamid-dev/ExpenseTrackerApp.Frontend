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
