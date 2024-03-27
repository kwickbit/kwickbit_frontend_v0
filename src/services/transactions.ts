import { apiClient } from "@/lib/api-client";
import { symbolFormatTransaction } from "@/lib/helpers";
import {convertCurrency, Token} from "@/services/token_currencies_conversions";

export enum Chain {
  Stellar = 'stellar',
}
export enum Type {
  OnChain = 'OnChain',
  OffChain = 'OffChain',
}

export enum Status {
  Published = 'Published',
  NonPublished = 'NonPublished',
}



export enum Direction {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
  Swap = 'Swap',
}

export interface TransactionProps {
  chain: string;
  hash?: string;
  atomicTransactionId: string;
  workspaceIdChainAddress: string;
  type: Type;
  tokenIncoming?: Token;
  tokenOutgoing?: Token;
  labels: string[];
  createdAt: string;
  from: string;
  to: string;
  status: Status;
  direction: Direction;
  workspaceId: string;
  amountIncoming: string;
  amountOutgoing: string;
  detail?: {
    symbolIncoming?: string;
    priceInFiatIncoming?: {
      amount: string;
      reference: string;
      symbol: string;
    };
    symbolOutgoing?: string;
    priceInFiatOutgoing?: {
      amount: string;
      reference: string;
      symbol: string;
    };
    metadata?: {
      [key: string]: string;
    };
  };
  fee?: {
    amount: number;
    priceInFiat: {
      amount: string;
      reference: string;
      symbol: string;
    };
  };
  groupId?: number;
  resultId?: number;
  id?: number;
  accountingLines: AccountingLine[];
}

export enum AccountingTransactionType {
  Bill = 'Bill',
  Invoice = 'Invoice',
  Expense = 'Expense',
  Income = 'Income',
  Swap = 'Swap',
}

export interface AccountingLine {
  accountingType?: AccountingTransactionType;
  resource?: {
    name: string;
    reference: string;
  };
  resourceIncoming?: {
    name: string;
    reference: string;
  };
  resourceOutgoing?: {
    name: string;
    reference: string;
  };
  amount?: number;
  priceInFiat?: {
    amount: string;
    reference: string;
  };
  amountIncoming?: number;
  priceInFiatIncoming?: {
    amount: string;
    reference: string;
  };
  amountOutgoing?: number;
  priceInFiatOutgoing?: {
    amount: string;
    reference: string;
  };
}

export interface PublishTransactionsToIntegrationArgs {
  integrationProvider: string;
  deduplicationId: string;
  batchId: string;
  atomicTransactionId: string;
  workspaceIdChainAddress: string;
  accountingLines: AccountingLine[];
}

export interface TransactionAPIResult {
  data: TransactionProps[];
  message: string;
  nextCursors?: any;
  nextCursor?: any;
}

interface GetTransactionsSetting {
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

const CONVERSION_RATE_XLM_USD: number = 0.11;

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
  const setting: GetTransactionsSetting = {};
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
      const tokenIncoming = transaction.tokenIncoming;
      const tokenOutgoing = transaction.tokenOutgoing;

      if (tokenIncoming) {
        const symbolIncoming = symbolFormatTransaction(tokenIncoming);

        transaction.detail = {
          symbolIncoming,
          priceInFiatIncoming: {
            amount: String(convertCurrency({from: tokenIncoming, to: {reference: 'USD'}, fromAmount: parseFloat(transaction.amountIncoming)})),
            reference: 'USD',
            symbol: '$',
          }
        };
      }

      if (tokenOutgoing) {
        const symbolOutgoing = symbolFormatTransaction(tokenOutgoing);

        transaction.detail = {
          ...transaction.detail,
          symbolOutgoing,
          priceInFiatOutgoing: {
            amount: String(convertCurrency({from: tokenOutgoing, to: {reference: 'USD'}, fromAmount: parseFloat(transaction.amountOutgoing)})),
            reference: 'USD',
            symbol: '$',
          }
        };
      }

      if (!transaction.fee) {
        transaction.fee = {
          amount: 0.012,
          priceInFiat: {
            amount: String(0.012 * CONVERSION_RATE_XLM_USD),
            reference: 'USD',
            symbol: '$',
          },
        };
      }

      return transaction;
    });

    return {
      ...data,
      data: transactions,
    };
  }
  return data;
};

export const publishTransactionToIntegration = async (data: PublishTransactionsToIntegrationArgs): Promise<boolean> => {
  try {
    await apiClient.post("/publish-transactions-to-integration", data);
  } catch (err) {
    return false;
  }
  return true;
};