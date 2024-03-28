import { TransactionProps } from "@/services/transactions";

export interface GetReportsAPIResponse {
  message: string;
  data: AccountingReport[];
  nextCursor: object;
}

export interface AccountingReport {
  reportType: string;
  sourceTransactions: Partial<TransactionProps>[];
  localTransactions: Partial<TransactionProps>[];
}
