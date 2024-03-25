// import { apiClient } from "@/lib/api-client";
import { TransactionProps } from "@/services/transactions";

export interface GetReportsAPIResponse {
  message: string;
  data: AccountingReport[];
  nextCursor: object;
}

export interface AccountingReport {
  reportType: string,
  sourceTransactions: Partial<TransactionProps>[],
  localTransactions: Partial<TransactionProps>[],
}

// export interface CreateSourceAPIProps {
//   name: string;
//   address: string;
//   workspaceId: string;
//   chain: string;
// }

// export const fetchSources = async (): Promise<GetReportsAPIResponse> => {
//   const { data } = await apiClient.get("/wallets/list");
//   return data;
// };

// export const fetchCreateSource = async (
//   props: CreateSourceAPIProps
// ): Promise<any> => {
//   const { data } = await apiClient.post("/wallets/add", props);
//   return data;
// };
