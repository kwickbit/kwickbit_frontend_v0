import { apiClient } from "@/lib/api-client";
import { v4 as uuidv4 } from "uuid";
import { Bill, Currencies, Invoice, Item } from "@/components/integrations";
import {Chain} from "@/services/transactions";


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
  token: {
    chain: Chain;
    assetType: string;
    isNative: boolean;
    assetMetadata?: {
      code: string;
      issuer: string;
    };
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
  token: {
    chain: Chain;
    isNative: boolean;
    assetMetadata?: {
      code: string;
      issuer: string;
    };
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

export interface CurrenciesAPIResult {
  data: Currencies;
}

export interface BillAPIResult {
  data: Bill[];
}

export interface ItemAPIResult {
  data: Item[];
}

export interface InvoiceAPIResult {
  data: Invoice[];
}

export interface FetchIntegrationAllAttributesArgs {
  batchId: string;
  totalJobsCount: number;
}

export interface OptionalFetchIntegrationAllAttributesArgs {
  batchId?: string;
}

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

export const fetchQuickbookAccounts = async (args: OptionalFetchIntegrationAllAttributesArgs): Promise<any> => {
  const { data } = await apiClient.post("/fetch-accounts", {
    deduplicationId: uuidv4(),
    integrationProvider: "QuickBooks",
    ...args,
  });
  return data;
};

export const getAvailableAccounts = async (): Promise<AvailableAccountsAPIResult> => {
  const { data } = await apiClient.get(
    "/get-available-integration-accounts/QuickBooks"
  );
  return data;
};

export const getCurrencies = async (): Promise<CurrenciesAPIResult> => {
  const { data } = await apiClient.get(
      "/get-available-currencies/QuickBooks"
  );
  return data;
};

export const addCurrencyMappings = async (mappings: CurrencyMappingForAdd[]): Promise<any> => {
  const { data } = await apiClient.post("/currency-mappings/add", {
    mappings,
  });
  return data;
};


export const fetchInvoices = async (args: FetchIntegrationAllAttributesArgs): Promise<boolean> => {
  try {
    const deduplicationId = uuidv4();
    await apiClient.post("/fetch-invoices", {
      integrationProvider: "QuickBooks",
      deduplicationId,
      ...args,
    });
  } catch (error) {
    console.log("fetchInvoices error =>", error);
    return false;
  }
  return true;
};

export const getInvoices = async (): Promise<InvoiceAPIResult> => {
  const { data } = await apiClient.post("/integrations/intuit/get-invoices", {
    integrationProvider: "QuickBooks",
  });
  return data;
};

export const fetchBills = async (args: FetchIntegrationAllAttributesArgs): Promise<boolean> => {
  try {
    const deduplicationId = uuidv4();
    await apiClient.post("/fetch-bills", {
      integrationProvider: "QuickBooks",
      deduplicationId,
      ...args,
    });
  } catch (error) {
    console.error("fetchBills error =>", error);
    return false;
  }
  return true;
};

export const getBills = async (): Promise<BillAPIResult> => {
  const {data} = await apiClient.post("/integrations/intuit/get-bills", {
    integrationProvider: "QuickBooks",
  });
  return data;
};

export const getItems = async (): Promise<ItemAPIResult> => {
  const {data} = await apiClient.post("/integrations/intuit/get-items", {
    integrationProvider: "QuickBooks",
  });
  return data;
};

export const fetchItems = async (args: FetchIntegrationAllAttributesArgs): Promise<boolean> => {
  try {
    const deduplicationId = uuidv4();
    await apiClient.post("/fetch-items", {
      integrationProvider: "QuickBooks",
      deduplicationId,
      ...args,
    });
  } catch (error) {
    console.error("fetchItems error =>", error);
    return false;
  }
  return true;
};

export const fetchCurrencies = async (args: FetchIntegrationAllAttributesArgs): Promise<boolean> => {
  try {
    const deduplicationId = uuidv4();
    await apiClient.post("/fetch-currencies", {
      integrationProvider: "QuickBooks",
      deduplicationId,
      ...args,
    });
  } catch (error) {
    console.error("fetchCurrencies error =>", error);
    return false;
  }
  return true;
};