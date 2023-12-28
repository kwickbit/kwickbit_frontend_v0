import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  fetchAccountingTransactions,
  AccountingTransactionAPIResult,
} from "@/services/transactions";

export const useQueryAccountingTransactions = (): UseQueryResult<
  AccountingTransactionAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["accounting-transactions"],
    queryFn: fetchAccountingTransactions,
  });
};
