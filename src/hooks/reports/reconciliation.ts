import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  sendCreateReport,
  CreateReportAPIProps,
  getReconciliationReportSummaries,
  getIntegrationEntries,
  GetIntegrationEntriesAPIResult,
  GetSummaryReportsAPIResult,
  GetReconciliationReportAPIResult,
  getReconciliationReport,
} from "@/services/reports/reconciliation";
import {
  GetTransactionsParams,
  TransactionAPIResult,
  getTransactions
} from "@/services/transactions";


export const useQueryReconciliationReportSummaries = (): UseQueryResult<
  GetSummaryReportsAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["accounting-reports"],
    queryFn: getReconciliationReportSummaries,
  });
};

export const useQueryReconciliationReport = (reportId: string): UseQueryResult<
  GetReconciliationReportAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["reconciliation-report", reportId],
    queryFn: () => getReconciliationReport(reportId),
  });
};

export const useQueryTransactions = (args: GetTransactionsParams): UseQueryResult<
  TransactionAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["reconciliationTransactions", args],
    queryFn: () => getTransactions(args),
  });
};

export const useQueryIntegrationEntries = (): UseQueryResult<
  GetIntegrationEntriesAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["integration-entries"],
    queryFn: getIntegrationEntries
  });
};

export const useMutationCreateReport = (): UseMutationResult<
  any,
  Error,
  CreateReportAPIProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendCreateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
