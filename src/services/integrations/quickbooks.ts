import { apiClient } from "@/lib/api-client";
import { v4 as uuidv4 } from "uuid";


export interface QuickBooksIntegrationFetchStateAPIResult {
  state: string;
}

export interface GetInfoIntegration {
  message: string
  data?: {
    companyName: string;
    legalName: string;
    email: string;
    primaryPhone?: string;
    country: string;
    address: {
      line1: string;
      city: string;
      country: string;
      postalCode: string;
    };
  }
}

export const fetchRequestState = async (): Promise<QuickBooksIntegrationFetchStateAPIResult> => {
  const { data } = await apiClient.post("/integrations/intuit/request-state");
  return data;
};

export const fetchIntegrationInformation = async (): Promise<GetInfoIntegration> => {
  const { data } = await apiClient.get(
      "/integrations/intuit/get-info-integration"
  );
  return data;
};

export interface CurrencyMapping {
  chain: string;
  tokenMetadata: {
    isNative: boolean;
    code?: string;
    issuer?: string;
  };
  isIntegrationRefDefined: boolean;
  integrationRef?: {
    accountsReceivable?: {
      id: string;
      name: string;
      currencyRef: {
        name: string;
        reference: string;
      },
    };
    accountsPayable?: {
      id: string;
      name: string;
      currencyRef: {
        name: string;
        reference: string;
      },
    };
    bank?: {
      id: string;
      name: string;
      currencyRef: {
        name: string;
        reference: string;
      },
    };
  };
}

export interface CurrencyMappingAPIResult {
  message: string;
  data: CurrencyMapping[];
}

export interface CurrencyMappingForAdd {
  chain: string;
  tokenMetadata: {
    isNative: boolean;
    code?: string;
    issuer?: string;
  };
  integrationRef?: {
    accountsReceivable?: {
      id: string;
    };
    accountsPayable?: {
      id: string;
    };
    bank?: {
      id: string;
    };
  };
  usePlaceholderCurrency?: boolean;
}

export interface AvailableAccount {
  integrationWorkspaceId: string;
  realmId: string;
  currencyRef: {
    name: string;
    reference: string;
  };
  accountType: string;
  name: string;
  integration: string;
  id: string;
  classification: string;
  workspaceId: string;
}

export type AvailableAccountMappedToCurrency = AvailableAccount & CurrencyMappingForAdd;


export interface AvailableAccountsAPIResult {
  data: AvailableAccount[];
  message: string;
}

export const getCurrencyMappings = async (): Promise<CurrencyMappingAPIResult> => {
  const { data } = await apiClient.get(
    "/currency-mappings/list",
    {}
  );
  return data;
};

export const fetchQuickbookAccounts = async (): Promise<any> => {
  const { data } = await apiClient.post("/fetch-accounts", {
    deduplicationId: uuidv4(),
    integrationProvider: "QuickBooks",
  });
  return data;
};

export const getAvailableAccounts = async (): Promise<AvailableAccountsAPIResult> => {
  const { data } = await apiClient.get(
    "/get-available-integration-accounts/QuickBooks"
  );
  return data;
};

export const addCurrencyMappings = async (mappings: CurrencyMappingForAdd[]): Promise<any> => {
  const { data } = await apiClient.post("/currency-mappings/add", {
    mappings,
  });
  return data;
};


