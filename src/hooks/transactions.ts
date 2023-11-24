import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/transactions";
import { TransactionAPIResult } from "@/services/transactions";

export const useQueryTransactions = (): UseQueryResult<TransactionAPIResult, Error> => {
  return useQuery({ queryKey: ["transactions"], queryFn: fetchTransactions });
};
