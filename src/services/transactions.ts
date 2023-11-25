export interface TransUser {
  address: string;
  type: "wallet" | "smart contract";
  detail: null | {
    type: "currency" | "token";
    symbol: string;
    amount: number;
    price: number;
    metadata?: {
      [key:string]: string
    }
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
    currency: string | null,
    token: string | null,
    nonSetMapping: boolean    
  }
}

export interface NonSetCurrencyProps {
  currency: string,
  token: string
}

export interface TransactionAPIResult {
  transactions: TransactionProps[];
  non_set_currencies?: NonSetCurrencyProps[];
}

export const fetchTransactions = async (): Promise<TransactionAPIResult> => {
  const ret = await fetch("/data/transactions.json");
  if( !ret.ok ) {
    throw new Error(ret.statusText);
  }
  const data:TransactionAPIResult = await ret.json();
  if( data.transactions ) {
    for(const transaction of data.transactions) {
      const currency = transaction.from.detail?.type === 'currency'? transaction.from.detail.symbol: (transaction.to.detail?.type === 'currency'? transaction.to.detail.symbol: null );
      const token = transaction.to.detail?.type === 'token'? transaction.to.detail.symbol: (transaction.from.detail?.type === 'token'? transaction.from.detail.symbol: null );
      let nonSetMapping = false;
      if( data.non_set_currencies ) {
        nonSetMapping = !!data.non_set_currencies.find(item => item.currency === currency && item.token === token );
      }
      transaction.currencyMapping = {
        currency, 
        token,
        nonSetMapping
      }
    }
  }
  return data;
};
