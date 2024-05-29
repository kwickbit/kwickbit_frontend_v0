import { apiClient } from "@/lib/api-client";
import { Direction, TransactionProps } from "@/services/transactions";
import { Token } from "@/services/token_currencies_conversions";

export interface GetSummaryReportsAPIResult {
  message: string;
  data: ReconciliationReportSummary[];
  nextCursor: object;
}

export interface GetReconciliationReportAPIResult {
  message: string;
  data: ReconciliationReport;
  nextCursor: object;
}

export interface CreateReportAPIProps {
  reportDate: string,
  transactionsStartDate: string,
  transactionsEndDate: string,
  reconciliations: ReconciliationReportItem[]
}

interface BaseReconciliationReport {
  reportDate: string;
  reportId: string;
  transactionsStartDate: string;
  transactionsEndDate: string;
}

export interface ReconciliationReportSummary extends BaseReconciliationReport {
  reconciliationCount: number;
}

export interface ReconciledTransaction {
  transaction: TransactionProps;
  matchingEntries: IntegrationTransactionEntry[];
}

export interface ReconciliationReport extends BaseReconciliationReport {
  reportReconciliations: ReconciledTransaction[];
}

export interface GetIntegrationEntriesAPIResult {
  message: string;
  data: IntegrationTransactionEntry[];
  nextCursor: object;
}

export interface IntegrationTransactionEntry {
  accountingDate: string;
  amountFromIntegration: string;
  createdAt: string;
  cryptoToken: Token;
  currency: string;
  direction: Direction.Incoming | Direction.Outgoing;
  entryId: string;
  integrationAccountName: string;
  integrationAccountId: string;
  integrationTransactionLabel: string;
  reconvertedAmount: string;
}

export interface ReconciliationReportItem {
  transactionData: {
    atomicTransactionId: string;
    workspaceIdChainAddress: string;
  };
  reconciledEntriesIds: string[];
}

export enum ReconciliationEntrySources {
  Match = "match",
  Pick = "pick",
  Create = "create"
}

export const getReconciliationReportSummaries = async (): Promise<GetSummaryReportsAPIResult> => {
  const { data } = await apiClient.get("/reports/reconciliation/list");
  return data
};

export const getReconciliationReport = async (reportId: string): Promise<
  GetReconciliationReportAPIResult
> => {
  const { data } = await apiClient.get(`/reports/reconciliation/${reportId}`);
  return data
};

export const getIntegrationEntries = async (): Promise<GetIntegrationEntriesAPIResult> => {
  const { data } = await apiClient.post("/integration-entries/list", {
    integrationProvider: "QuickBooks",
  });
  return data;
};

export const sendCreateReport = async (
  props: CreateReportAPIProps
): Promise<any> => {
  const { data } = await apiClient.post("/reports/reconciliation/create", props);
  return data;
};
