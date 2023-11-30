export interface Currency {
  fiat?: boolean;
  name: string;
  symbol: string;
  onchain?: {
    chain: string;
    token?: string;
    tokenContractAddress: string;
  }
}

export interface AccountTransactionBase {
  id: string;
  description: string,
  amount: number
  currency: Currency;
  included?: boolean;
}

export type OutgoingTransactionTypes = 'BILL' | 'EXP' | 'SW_OUT';
export type IncomingTransactionTypes = 'INV' | 'INC' | 'SW_IN';

export interface AccountTransaction {
  id: string;
  symbol: OutgoingTransactionTypes | IncomingTransactionTypes;
  description: string,
  amount: number
  currency: Currency;
  included?: boolean;
  from_account?: string; // Only for outgoing
  to_account?: string;   // Only for incoming,
  mainCurrency?: {
    name: string,
    amount: number;
  }
}

export interface TypeOption {
  title: OutgoingTransactionTypes | IncomingTransactionTypes;
  value: 'bills' | 'expenses' | 'swapouts' | 'invoices' | 'incomes' | 'swapins';  
}

export const outgoingTypeOptions: TypeOption[] = [
  {
      title: "BILL",  // Same as symbole
      value: "bills"  // Same as a key of accounting-transactions
  },
  {
    title: "EXP",
    value: "expenses"
  },
  {
    title: "SW_OUT",
    value: "swapouts"
  }
];

export const incomingTypeOptions: TypeOption[] = [
  {
      title: "INV",
      value: "invoices"
  },
  {
    title: "INC",
    value: "incomes"
  },
  {
    title: "SW_IN",
    value: "swapins"
  }
]

export interface TransUser {
  address: string;
  type: "wallet" | "smart contract";
}

export interface TransactionProps {
  id?: number | string;
  createdAt: string;
  hash: string;
  from: TransUser;
  to: TransUser;
  detail: {
    type: "currency" | "token";
    symbol: string;
    amount: number;
    price: number;
    metadata?: {
      [key: string]: string;
    };
  };
  type: "out" | "income";
  chain: string;
  published: boolean;
  publishedAt: string | null;
  labels: string[];
  fee: {
    amount: number;
    price: number;
    mainCurrency?: {
      name: string,
      amount: number;
    }
  };
  currencyMapping?: {
    currency: string | null;
    token: string | null;
    nonSetMapping: boolean;
  };
  collection: AccountTransaction[]
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
  const ret = await fetch("/data/transactions1.json");
  if (!ret.ok) {
    throw new Error(ret.statusText);
  }
  const data: TransactionAPIResult = await ret.json();
  if (data.transactions) {
    const transactions = data.transactions.map((transaction) => {
      const detail = transaction.detail;

      let currency: string | null = 'XLM';
      let token: string | null = null;

      if (detail.type === "currency") {
        currency = detail.symbol;
      }
      else if( detail.type === 'token' ) {
        token = detail.symbol;
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

export interface AccountingTransactionAPIResult {
  bills?:    AccountTransaction[];
  expenses?: AccountTransaction[];
  swapouts?: AccountTransaction[];
  invoices?: AccountTransaction[];
  incomes?:  AccountTransaction[];
  swapins?:  AccountTransaction[];  
}


export const fetchAccountingTransactions = async():Promise<AccountingTransactionAPIResult> => {
  const ret = await fetch("/data/accounting-transactions.json");
  if (!ret.ok) {
    throw new Error(ret.statusText);
  }

  const data:AccountingTransactionAPIResult = await ret.json();
  return data;
}