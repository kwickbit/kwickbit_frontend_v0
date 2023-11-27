export interface TransUser {
  address: string;
  type: "wallet" | "smart contract";
  detail: null | {
    type: "currency" | "token";
    symbol: string;
    amount: number;
    price: number;
    metadata?: {
      [key: string]: string;
    };
  };
}

export interface TransactionProps {
  id?: number | string;
  createdAt: string;
  from: TransUser;
  to: TransUser;
  type: "out" | "swap";
  chain: string;
  published: boolean;
  publishedAt: string | null;
  labels: string[];
  fee: {
    amount: number;
    price: number;
  };
  currencyMapping?: {
    currency: string | null;
    token: string | null;
    nonSetMapping: boolean;
  };
}

export interface NonSetCurrencyProps {
  currency: string;
  token: string;
}

export interface TransactionAPIResult {
  transactions: TransactionProps[];
  non_set_currencies?: NonSetCurrencyProps[];
}

export const fetchTransactions = async (): Promise<TransactionAPIResult> => {
  const ret = await fetch("/data/transactions-empty.json");
  if (!ret.ok) {
    throw new Error(ret.statusText);
  }
  const data: TransactionAPIResult = await ret.json();
  if (data.transactions) {
    const transactions = data.transactions.map((transaction) => {
      const fromDetail = transaction.from.detail;
      const toDetail = transaction.to.detail;

      let currency: string | null = null;
      let token: string | null = null;

      if (fromDetail?.type === "currency") {
        currency = fromDetail.symbol;
      } else if (toDetail?.type === "currency") {
        currency = toDetail.symbol;
      }

      if (toDetail?.type === "token") {
        token = toDetail.symbol;
      } else if (fromDetail?.type === "token") {
        token = fromDetail.symbol;
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
      transactions,
    };
  }
  return data;
};
