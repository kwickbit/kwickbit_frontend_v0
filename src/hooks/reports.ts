import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetReportsAPIResponse } from "@/services/reports";
import { TransactionAPIResult, TransactionProps, getTransactions } from "@/services/transactions";

export const useQueryReports = (): Partial<UseQueryResult<
  GetReportsAPIResponse,
  Error
>> => {
  const sourceTransactions: Partial<TransactionProps>[] = [{ from: "me", to: "you" }];
  const localTransactions: Partial<TransactionProps>[] = [{ from: "someone", to: "Iunno dude" }];
  const report1 = { reportType: "Reconciliation", sourceTransactions, localTransactions };
  const report2 = { reportType: "Reconciliation", sourceTransactions, localTransactions };
  const data = [report1, report2];
  return ({ isLoading: false, isError: false, data: { data, message: "LOL wut", nextCursor: {} } });
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
