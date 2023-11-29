import { apiClient } from "@/lib/api-client";

export interface GetIntegrationsAPIResponse {
  message: string;
  event: any;
}

export const fetchIntegration = async (
  code: string
): Promise<GetIntegrationsAPIResponse> => {
  const requestBody = { code };
  const { data } = await apiClient.post(`/integration`, requestBody);
  return data;
};
