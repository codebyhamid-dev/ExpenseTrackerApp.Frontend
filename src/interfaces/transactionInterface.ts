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
export interface TransactionReadDto {
  userId?: string; // Guid? → string (optional)
  transactionType: TransactionType; // enum
  paymentMode: PaymentMode; // enum
  category?: string;
  amount: number; // decimal → number
  description?: string;
  createdAt: string; // DateTimeOffset → ISO string
}
export interface TransactionInputDto {
  search?: string; // simple text search (category / description)
  category?: string;
  minAmount?: number; // decimal? → number?
  maxAmount?: number;
  transactionType?: TransactionType; // enum?
  paymentMode?: PaymentMode; // enum?
  sortDescending?: boolean; // default true (handled in backend)
  skipCount?: number; // default 0
  maxResultCount?: number; // default 10
}
export interface PagedResultDto<T> {
  items: T[]; // List<T>
  totalCount: number;
}
