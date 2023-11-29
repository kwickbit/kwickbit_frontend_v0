import { apiClient } from "@/lib/api-client";

export interface GetOAuth2CallbackResponse {
  message: string;
  event: any;
}

export interface RequestBodyCallBackIntuit {
  code: string,
  state: string,
}

export const oauth2CallbackIntuit = async (requestBodyCallBackIntuit: RequestBodyCallBackIntuit): Promise<GetOAuth2CallbackResponse> => {
  const { data } = await apiClient.post(`/integrations/intuit/callback`, requestBodyCallBackIntuit);
  return data;
};
