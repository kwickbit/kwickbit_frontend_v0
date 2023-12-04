import { apiClient } from "@/lib/api-client";

export interface GetOAuth2CallbackResponse {
  message: string;
  event: any;
}

export interface RequestBodyCallBackIntuit {
  code: string;
  state: string;
}

export const fetchRequestState = async (): Promise<any> => {
  const { data } = await apiClient.post("/integrations/intuit/request-state");
  return data;
};

export const fetchIntegrationInformation = async (): Promise<any> => {
  const { data } = await apiClient.get(
    "/integrations/intuit/get-info-integration"
  );
  return { data };
};
