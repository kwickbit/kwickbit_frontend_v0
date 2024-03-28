import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetReportsAPIResponse, getAccountingReports } from "@/services/reports";
import { TransactionAPIResult, getTransactions } from "@/services/transactions";

export const useQueryReports = (): UseQueryResult<
  GetReportsAPIResponse,
  Error
> => {
  return useQuery({
    queryKey: ["accounting-reports"],
    queryFn: getAccountingReports,
  });
};

export const useQueryTransactions = (): UseQueryResult<
  TransactionAPIResult,
  Error
> => {
  const args = {};
  return useQuery({
    queryKey: ["reconciliationTransactions", args],
    queryFn: () => getTransactions(args),
  });
};
