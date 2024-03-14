import {Chain} from "@/services/transactions";

export interface Token {
    chain: Chain;
    isNative: boolean,
    assetType: string;
    assetMetadata?: {
        code: string;
        issuer: string;
    };
}

interface FiatCurrency {
    reference: string;
}

type Currency = Token | FiatCurrency;

interface ConvertCurrencyArgs {
    fromAmount: number;
    from: Currency;
    to: Currency;
    dateTime?: string;
}

export const convertCurrency = ({from, to, fromAmount }: ConvertCurrencyArgs): number | undefined => {
// Exchange rates with respect to EUR
    const rates: Record<string, number> = {
        'USD:EUR': 0.93,
        'EUR:USD': 1.075268817204301,
        'XLM:EUR': 0.1066,
        'XLM:USD': 0.1140,
        'USD:XLM': 1 / 0.1140,
        'EUR:XLM': 1 / 0.1066,
        'USD:USD': 1,
        'EUR:EUR': 1,
        'XLM:XLM': 1,
        'yXLM:XLM': 1,
        'yXLM:USD': 0.1140,
        'yXLM:EUR': 0.1066,
        'yXLM:yXLM': 1,
        'XLM:yXLM': 1,
        'USD:yXLM': 1/0.1140,
        'EUR:yXLM': 1/0.1066,
        'USDC:EUR': 0.93,
        'EUR:USDC': 1.075268817204301,
        'USDC:USD': 0.93,
        'USD:USDC': 1.075268817204301,
        'XLM:USDC': 0.1140,
        'USDC:XLM': 1 / 0.1140,
    };

    // Helper function to get the currency code
    const getCurrencyCode = (currency: Currency): string => {
        if ('assetType' in currency) {
            if (currency.assetMetadata === undefined) return 'XLM';
            else if (currency.assetMetadata) return currency.assetMetadata.code;
        } else if ('reference' in currency) return currency.reference;
        throw new Error("Unsupported currency type");
    };

    const fromCurrencyCode = getCurrencyCode(from);
    const toCurrencyCode = getCurrencyCode(to);

    const rateKey = `${fromCurrencyCode}:${toCurrencyCode}`;

    if (rates[rateKey] !== undefined) {
        return fromAmount * rates[rateKey];
    } else {
        return undefined;
    }
};