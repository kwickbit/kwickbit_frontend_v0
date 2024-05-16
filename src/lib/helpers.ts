import { Token } from "@/services/token_currencies_conversions";
import { TransactionProps } from "@/services/transactions";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";


const tooltipFormatterStellar = (token: Token): string => {
    return token.isNative ? `Chain: ${token.chain}` : `Chain: ${token.chain}, Issuer: ${token.assetMetadata?.issuer}`;
};

const tooltipFormatters: Record<string, (token: Token) => string> = {
    stellar: tooltipFormatterStellar,
};

export const tooltipFormatterTransaction = (token: Token): string => {
    return tooltipFormatters[token.chain](token);
};

const symbolFormatterStellar = (token: Token): string => {
    return token.isNative ? 'XLM' : token.assetMetadata?.code as string;
};

const symbolFormatters: Record<string, (token: Token) => string> = {
    stellar: symbolFormatterStellar,
};

export const symbolFormatTransaction = (token: Token): string => {
    return symbolFormatters[token.chain](token);
};

export const formatNumberDigits = (value: string, numDigits: number): string => {
    return `${parseFloat(value).toFixed(numDigits)}`;
};

const keyFormatterStellar = (token: Token): string => {
    return token.isNative ? `${token.chain}-native` : `${token.chain}-${token.assetMetadata?.code}-${token.assetMetadata?.issuer}`
};

const keyFormatters: Record<string, (token: Token) => string> = {
    stellar: keyFormatterStellar,
};

export const keyFormatTransaction = (token: Token): string => {
    return keyFormatters[token.chain](token);
};

export const calculateTransactionAmount = (transaction: TransactionProps): number => {
  const amountIncoming = parseAmount(transaction.amountIncoming);
  const amountOutgoing = parseAmount(transaction.amountOutgoing);
  return Math.abs(amountIncoming - amountOutgoing);
}

export const sumEntryAmounts = (entries: IntegrationTransactionEntry[]): number =>
  entries.reduce(
    (total: number, entry: IntegrationTransactionEntry): number =>
      total + parseAmount(entry.reconvertedAmount),
    0.0
  );

export const parseAmount = (amount: string): number => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? 0.0 : parsed;
};

export const doFloatsMatch = (float1: number, float2: number, epsilon = 0.00001): boolean => {
    return Math.abs(float1 - float2) < epsilon;
};

export const toLocaleDate = (dateString: string): string => new Date(dateString).toLocaleDateString();
