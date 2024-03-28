import { TransactionProps } from "@/services/transactions";

export interface GetReportsAPIResponse {
  message: string;
  reports: AccountingReport[];
  nextCursor: object;
}

export interface AccountingReport {
  reportType: string;
  sourceTransactions: Partial<TransactionProps>[];
  localTransactions: Partial<TransactionProps>[];
}

export const getAccountingReports = async (): Promise<GetReportsAPIResponse> => {
  const sourceTransactions: Partial<TransactionProps>[] = [{ from: "me", to: "you" }];
  const localTransactions: Partial<TransactionProps>[] = [{ from: "someone", to: "Iunno dude" }];
  const report1 = { reportType: "Reconciliation", sourceTransactions, localTransactions };
  const report2 = { reportType: "Reconciliation", sourceTransactions, localTransactions };
  const reports = [report1, report2];
  return { reports, message: "LOL wut", nextCursor: {} };
};
