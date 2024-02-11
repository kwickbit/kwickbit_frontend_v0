import { apiClient } from "@/lib/api-client";

export interface Currency {
  fiat?: boolean;
  name: string;
  symbol: string;
  onchain?: {
    chain: string;
    token?: string;
    tokenContractAddress: string;
  };
}

export interface AccountTransactionBase {
  id: string;
  description: string;
  amount: number;
  currency: Currency;
  included?: boolean;
}

export type OutgoingTransactionTypes = "BILL" | "EXP" | "SW_OUT";
export type IncomingTransactionTypes = "INV" | "INC" | "SW_IN";

export interface AccountTransaction {
  id: string;
  symbol: OutgoingTransactionTypes | IncomingTransactionTypes;
  description: string;
  amount: number;
  currency: Currency;
  included?: boolean;
  from_account?: string; // Only for outgoing
  to_account?: string; // Only for incoming,
  mainCurrency?: {
    name: string;
    amount: number;
  };
}

export interface TypeOption {
  title: OutgoingTransactionTypes | IncomingTransactionTypes;
  value: "bills" | "expenses" | "swapouts" | "invoices" | "incomes" | "swapins";
}

export const outgoingTypeOptions: TypeOption[] = [
  {
    title: "BILL", // Same as symbole
    value: "bills", // Same as a key of accounting-transactions
  },
  {
    title: "EXP",
    value: "expenses",
  },
  {
    title: "SW_OUT",
    value: "swapouts",
  },
];

export const incomingTypeOptions: TypeOption[] = [
  {
    title: "INV",
    value: "invoices",
  },
  {
    title: "INC",
    value: "incomes",
  },
  {
    title: "SW_IN",
    value: "swapins",
  },
];

export interface TransUser {
  address: string;
  type: "wallet" | "smart contract";
}

export interface TransactionProps {
  chain: string;
  hash?: string;
  atomicTransactionId: string;
  workspaceIdChainAddress: string;
  type: "OnChain" | "OffChain";
  assetMetadata?: {
    code: string;
    issuer: string;
  };
  labels: string[];
  createdAt: string;
  from: string;
  to: string;
  asset: string;
  status: "NonPublished" | "Published";
  direction: "Incoming" | "Outgoing";
  workspaceId: string;
  detail?: {
    type: "currency" | "token";
    symbol: string;
    amount: number;
    price: number;
    metadata?: {
      [key: string]: string;
    };
  };
  fee?: {
    amount: number;
    price: number;
    mainCurrency?: {
      name: string;
      amount: number;
    };
  };
  collection?: AccountTransaction[];
  currencyMapping?: {
    currency: string | null;
    token: string | null;
    nonSetMapping: boolean;
  };
  groupId?: number;
  resultId?: number;
  id?: number;
}

export interface NonSetCurrencyProps {
  currency: string;
  token: string;
}

export interface TransactionAPIResult {
  data: TransactionProps[];
  message: string;
  nextCursors?: any;
  nextCursor?: any;
  non_set_currencies?: NonSetCurrencyProps[];
}

interface GetTrasactionsSetting {
  cursors?: any;
  dateTimeMin?: any;
  dateTimeMax?: any;
}

/**
 * Trigger an action for fetching transactions from blockchain and then save them onto the database
 */
export const fetchAllTransactions = async (
  deduplicationId: string
): Promise<boolean> => {
  const payload = {
    deduplicationId,
  };

  try {
    await apiClient.post("/fetch-transactions", payload);
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Trigger an action for fetching transactions from blockchain and then save them onto the database
 */
export const fetchWalletTransactions = async (
  chain: string,
  address: string,
  walletId: string,
  deduplicationId: string
): Promise<boolean> => {
  const payload = {
    address,
    chain,
    walletId,
    deduplicationId
  };

  try {
    await apiClient.post(`/fetch-transactions/${walletId}`, payload);
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Get transactions from the database
 */
export const getTransactions = async ({
  chain,
  address,
  nextCursor,
  dateTimeMin,
  dateTimeMax,
}: {
  chain?: string;
  address?: string;
  nextCursor?: any;
  dateTimeMin?: any;
  dateTimeMax?: any;
}): Promise<TransactionAPIResult> => {
  const setting: GetTrasactionsSetting = {};
  if (nextCursor) {
    setting.cursors = nextCursor;
  } else {
    if (dateTimeMin) {
      setting.dateTimeMin = dateTimeMin;
    }
    if (dateTimeMax) {
      setting.dateTimeMax = dateTimeMax;
    }
  }

  let url = "/transactions";
  if (chain && address) {
    url += `/${chain}/${address}`;
  }
  const { data } = await apiClient.post<TransactionAPIResult>(url, setting);

  if (data.nextCursor) {
    data.nextCursors = data.nextCursor;
    delete data.nextCursor;
  }

  if (data.nextCursors && Object.keys(data.nextCursors).length === 0) {
    data.nextCursors = null;
  }
  if (data.data) {
    const transactions = data.data.map((transaction) => {
      const currency: string | null = "XLM";
      let token: string | null = null;

      if (transaction.asset === "native") {
        transaction.detail = {
          type: "currency",
          symbol: "XLM",
          amount: 1000, // fake data
          price: 110, // fake data
        };
      } else {
        transaction.detail = {
          type: "token",
          symbol: transaction.asset,
          amount: 1000, // fake
          price: 1000, // fake
        };

        token = transaction.asset;
      }

      if (!transaction.fee) {
        transaction.fee = {
          amount: 0.012,
          price: 15.5,
        };
      }

      if (!transaction.collection) {
        if (transaction.direction === "Outgoing") {
          transaction.collection = [
            {
              id: "bill-1",
              symbol: "BILL",
              from_account: "account1",
              description: "Bill 1",
              amount: 2500,
              currency: {
                fiat: true,
                name: "dollar",
                symbol: "$",
              },
            },
            {
              id: "expense-1",
              symbol: "EXP",
              from_account: "ledger1",
              description: "Expense 1",
              amount: 15,
              currency: {
                fiat: true,
                name: "dollar",
                symbol: "$",
              },
            },
          ];
        } else {
          transaction.collection = [
            {
              id: "inv-1",
              symbol: "INV",
              description: "invoice 1",
              amount: 2500,
              currency: {
                fiat: true,
                name: "dollar",
                symbol: "$",
              },
            },
            {
              id: "inc-1",
              symbol: "INC",
              to_account: "account5",
              description: "rent",
              amount: 100,
              currency: {
                fiat: true,
                name: "dollar",
                symbol: "$",
              },
            },
          ];
        }
      }

      let nonSetMapping = false;
      if (data.non_set_currencies) {
        nonSetMapping = !!data.non_set_currencies.find(
          (item) => item.currency === currency && item.token === token
        );
      }
      return {
        ...transaction,
        currencyMapping: {
          currency,
          token,
          nonSetMapping,
        },
      };
    });

    return {
      ...data,
      data: transactions,
    };
  }
  return data;
};

export interface AccountingTransactionAPIResult {
  bills?: AccountTransaction[];
  expenses?: AccountTransaction[];
  swapouts?: AccountTransaction[];
  invoices?: AccountTransaction[];
  incomes?: AccountTransaction[];
  swapins?: AccountTransaction[];
}

export const fetchAccountingTransactions =
  async (): Promise<AccountingTransactionAPIResult> => {
    const ret = await fetch("/data/accounting-transactions.json");
    if (!ret.ok) {
      throw new Error(ret.statusText);
    }

    const data: AccountingTransactionAPIResult = await ret.json();
    return data;
  };
