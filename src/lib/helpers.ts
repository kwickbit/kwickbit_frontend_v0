import { Token } from "@/services/token_currencies_conversions";


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