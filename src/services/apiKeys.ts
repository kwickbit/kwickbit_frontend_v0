import { apiClient } from "@/lib/api-client";

export interface GetAPIKeysAPIResponse {
  message: string;
  data: APIKey[];
  nextCursor: object;
}

export interface CreateAPIKeyAPIProps {
  expiresInWeeks: number;
}

export interface APIKey {
  apiKey: string;
  expiresIn?: string | number;
  idWithinDatabase: string,
}

export const getAPIKeys = async (): Promise<GetAPIKeysAPIResponse> => {
  const { data } = await apiClient.get("/api-management/list");
  return data;
};

export const postCreateAPIKey = async (
  props: CreateAPIKeyAPIProps
): Promise<any> => {
  const { data } = await apiClient.post("/api-management/add", props);
  return data;
};
