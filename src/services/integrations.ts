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

export interface QuickbookCurrenciesAPIResult {
  currencies: string[];
}

export interface CreateCurrencyMappingAPIProps {
  currency: {
    name: string;
    quickCurrency: string;
  };
  token: {
    name: string;
    quickCurrency: string;
  };
}

export interface BlockchainCurrencyMapsAPIResult {
  maps: {
    currency1: string;
    currency2: string;
  }[];
}

export const fetchBlockchainCurrencyMaps =
  async (): Promise<BlockchainCurrencyMapsAPIResult> => {
    return {
      maps: [{ currency1: "stellar", currency2: "TRT" }],
    };
  };

export const fetchQuickbookCurrencies =
  async (): Promise<QuickbookCurrenciesAPIResult> => {
    return {
      currencies: ["Currency1", "Currency2", "Currency3"],
    };
  };

export const fetchCreateCurrencyMapping =
  async (): // props: CreateCurrencyMappingAPIProps
  Promise<any> => {
    return { message: "Succeeded to create a currency mapping" };
  };
