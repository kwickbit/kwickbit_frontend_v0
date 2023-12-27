import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  fetchTransactions,
  fetchAccountingTransactions,
  TransactionAPIResult,
  AccountingTransactionAPIResult,
} from "@/services/transactions";

export const useQueryTransactions = (): UseQueryResult<
  TransactionAPIResult,
  Error
> => {
  return useQuery({ queryKey: ["transactions"], queryFn: fetchTransactions });
};

export const useQueryAccountingTransactions = (): UseQueryResult<AccountingTransactionAPIResult, Error> => {
  return useQuery({ queryKey: ["accounting-transactions"], queryFn: fetchAccountingTransactions });
}