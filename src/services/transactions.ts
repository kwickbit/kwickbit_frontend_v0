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
}

export interface TransactionAPIResult {
  transactions: TransactionProps[];
}

export const fetchTransactions = async (): Promise<TransactionAPIResult> => {
  const ret = await fetch("/data/transactions.json");
  const data = await ret.json();
  return data;
};
