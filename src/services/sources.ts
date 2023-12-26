import { apiClient } from "@/lib/api-client";

export interface GetSourcesAPIResponse {
  message: string;
  data: SourceWallet[];
  nextCursor: object,
}

export interface SourceWallet {
  name: string;
  walletId: string;
  address: string;
  workspaceId: string;
}

export interface CreateSourceAPIProps {
  name: string;
  address: string;
  workspaceId: string;
  chain: string;
}

export const fetchSources = async (): Promise<GetSourcesAPIResponse> => {
  const { data } = await apiClient.get("/wallets/list");
  console.log(data);
  return data;
};

export const fetchCreateSource = async (
  props: CreateSourceAPIProps
): Promise<any> => {
  const { data } = await apiClient.post("/wallets/add", props);
  return data;
};
