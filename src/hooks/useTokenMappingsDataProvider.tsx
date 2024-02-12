import React, { createContext, useContext } from 'react';
import {QueryObserverResult, RefetchOptions, useQuery, UseQueryResult} from "@tanstack/react-query";
import { CurrencyMapping, CurrencyMappingAPIResult, getCurrencyMappings } from "@/services/integrations/quickbooks";

interface Props {
    children: React.ReactNode | React.JSX.Element[];
}

interface TokenMappingData {
    currencyMappings: {
        data: CurrencyMapping[];
        isLoading: boolean;
        isError: boolean;
        refetch: UseQueryResult<CurrencyMappingAPIResult>['refetch'];
    };
}

const noOpAsync = (): Promise<void> => new Promise<void>((resolve) => resolve());
const defaultContextValue = {
    currencyMappings: {
        data: [],
        isLoading: false,
        isError: false,
        refetch: noOpAsync as unknown as ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CurrencyMappingAPIResult>>),
    },
};

const TokenMappingContext = createContext<TokenMappingData>(defaultContextValue);

export const useTokenMappingContext = (): TokenMappingData => useContext(TokenMappingContext);

export const TokenMappingDataProvider = ({ children }: Props): React.JSX.Element => {
    const { data: currencyMappingsAPIResult, isLoading: isLoadingCurrencyMappings, isError: isErrorCurrencyMappings, refetch: refetchCurrencyMappings } = useQuery({queryKey: ['getCurrencyMappings'], queryFn: getCurrencyMappings});

    const value = {
        currencyMappings: { data: currencyMappingsAPIResult?.data || [], isLoading: isLoadingCurrencyMappings, isError: isErrorCurrencyMappings, refetch: refetchCurrencyMappings },
    };

    return (
        <TokenMappingContext.Provider value={value}>
            {children}
        </TokenMappingContext.Provider>
    );
};