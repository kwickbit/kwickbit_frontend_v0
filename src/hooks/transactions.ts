import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  getTransactions,
  fetchAccountingTransactions,
  TransactionAPIResult,
  AccountingTransactionAPIResult,
} from "@/services/transactions";

export const useQueryTransactions = (): UseQueryResult<
  TransactionAPIResult,
  Error
> => {
  return useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
};

export const useQueryAccountingTransactions = (): UseQueryResult<
  AccountingTransactionAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["accounting-transactions"],
    queryFn: fetchAccountingTransactions,
  });
};
