import {
  //   CreateReportAPIProps,
  GetReportsAPIResponse,
  //   fetchCreateReport,
  //   fetchReports,
} from "@/services/reports";
import {
  // UseMutationResult,
  UseQueryResult,
  // useMutation,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";

import { TransactionProps } from "@/services/transactions";

// const key = "reports";

export const useQueryReports = (): Partial<UseQueryResult<
  GetReportsAPIResponse,
  Error
>> => {
  const sourceTransactions: Partial<TransactionProps>[] = [{ from: "me", to: "you" }]
  const localTransactions: Partial<TransactionProps>[] = [{ from: "someone", to: "Iunno dude" }]
  const report1 = { reportType: "Reconciliation", sourceTransactions, localTransactions }
  const report2 = { reportType: "Reconciliation", sourceTransactions, localTransactions }
  const data = [report1, report2]
  return ({ isLoading: false, isError: false, data: { data, message: "LOL wut", nextCursor: {} } });
};

// export const useMutationCreateReport = (): UseMutationResult<
//   any,
//   Error,
//   CreateReportAPIProps,
//   unknown
// > => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: fetchCreateReport,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [key] });
//     },
//   });
// };
