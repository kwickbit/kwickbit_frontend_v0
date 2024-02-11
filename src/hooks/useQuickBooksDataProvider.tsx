import React, { createContext, useContext } from 'react';
import {
    UseMutationResult,
    useMutation,
    useQueryClient,
    useQuery,
    MutationFunction,
    UseQueryResult,
    RefetchOptions,
    QueryObserverResult
} from "@tanstack/react-query";
import {
    AvailableAccount,
    AvailableAccountsAPIResult,
    BillAPIResult,
    CurrenciesAPIResult,
    fetchBills,
    fetchCurrencies,
    FetchIntegrationAllAttributesArgs,
    fetchInvoices,
    fetchQuickbookAccounts,
    getAvailableAccounts,
    getBills,
    getCurrencies,
    getInvoices,
    InvoiceAPIResult
} from "@/services/integrations/quickbooks";
import {Bill, Invoice} from "@/components/integrations";

interface Props {
    children: React.ReactNode | React.JSX.Element[];
}

interface QuickBooksData {
    accounts: {
        data: AvailableAccount[];
        isLoading: boolean;
        isError: boolean;
        refetch: UseQueryResult<AvailableAccountsAPIResult>['refetch'];
    };

    currencies: {
        data: {currencies: {reference: string; name: string;}[]};
        isLoading: boolean;
        isError: boolean;
        refetch: UseQueryResult<CurrenciesAPIResult>['refetch'];
    };

    invoices: {
        data: Invoice[];
        isLoading: boolean;
        isError: boolean;
        refetch: UseQueryResult<InvoiceAPIResult>['refetch'];
    };

    bills: {
        data: Bill[];
        isLoading: boolean;
        isError: boolean;
        refetch: UseQueryResult<BillAPIResult>['refetch'];
    };

    fetchUpdateAllAttributes: UseMutationResult<any, Error, FetchIntegrationAllAttributesArgs, unknown>;
}

// Providing no-op defaults
const noOp = (): void => {};
const noOpAsync = (): Promise<void> => new Promise<void>((resolve) => resolve());
const defaultMutationResult: UseMutationResult<any, Error, FetchIntegrationAllAttributesArgs, unknown> = {
    mutate: noOp as unknown as MutationFunction<any, FetchIntegrationAllAttributesArgs>,
    mutateAsync: noOpAsync as unknown as MutationFunction<Promise<any>, FetchIntegrationAllAttributesArgs>,
    reset: noOp,
    isPending: false,
    isError: false,
    isSuccess: false,
    data: undefined,
    failureCount: 0,
    error: null,
    status: 'idle',
    variables: undefined,
    context: undefined,
    isIdle: true,
    isPaused: false,
    failureReason: null,
    submittedAt: 0,
};

const defaultContextValue: QuickBooksData = {
    accounts: {
        data: [],
        isLoading: false,
        isError: false,
        refetch: noOpAsync as unknown as ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<AvailableAccountsAPIResult>>),
    },

    currencies: {
        data: {currencies: []},
        isLoading: false,
        isError: false,
        refetch: noOpAsync as unknown as ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CurrenciesAPIResult>>),
    },

    invoices: {
        data: [],
        isLoading: false,
        isError: false,
        refetch: noOpAsync as unknown as ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InvoiceAPIResult>>),
    },

    bills: {
        data: [],
        isLoading: false,
        isError: false,
        refetch: noOpAsync as unknown as ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<BillAPIResult>>),
    },

    fetchUpdateAllAttributes: defaultMutationResult,
}


const QuickBooksDataContext = createContext<QuickBooksData>(defaultContextValue);

export const useQuickBooksData = (): QuickBooksData => useContext(QuickBooksDataContext);

export const QuickBooksDataProvider = ({ children }: Props): React.JSX.Element => {
    const queryClient = useQueryClient();

    const { data: accountsAPIResult, isLoading: isLoadingAccounts, isError: isErrorAccounts, refetch: refetchAccounts } = useQuery({queryKey: ['getAccounts'], queryFn: getAvailableAccounts});
    const { data: currenciesAPIResult, isLoading: isLoadingCurrencies, isError: isErrorCurrencies, refetch: refetchCurrencies } = useQuery({queryKey: ['getCurrencies'], queryFn: getCurrencies});
    const { data: invoicesAPIResult, isLoading: isLoadingInvoices, isError: isErrorInvoices, refetch: refetchInvoices } = useQuery({queryKey: ['getInvoices'], queryFn: getInvoices});
    const { data: billsAPIResult, isLoading: isLoadingBills, isError: isErrorBills, refetch: refetchBills } = useQuery({queryKey: ['getBills'], queryFn: getBills});

    const key = 'fetch-integration-all-attributes';
    const fetchUpdateAllAttributes = useMutation({
        mutationKey: [key],
        onSuccess: (): void => {
            queryClient.invalidateQueries({queryKey: [key]});
        },
        mutationFn: async (args: FetchIntegrationAllAttributesArgs): Promise<void> => {
            await fetchCurrencies(args);
            await fetchQuickbookAccounts(args);
            await fetchBills(args);
            await fetchInvoices(args);
        },
    });

    const value = {
        accounts: { data: accountsAPIResult?.data || [], isLoading: isLoadingAccounts, isError: isErrorAccounts, refetch: refetchAccounts },
        currencies: { data: currenciesAPIResult?.data || {currencies: []}, isLoading: isLoadingCurrencies, isError: isErrorCurrencies, refetch: refetchCurrencies },
        invoices: { data: invoicesAPIResult?.data || [], isLoading: isLoadingInvoices, isError: isErrorInvoices, refetch: refetchInvoices },
        bills: { data: billsAPIResult?.data || [], isLoading: isLoadingBills, isError: isErrorBills, refetch: refetchBills },
        fetchUpdateAllAttributes,
    };

    return (
        <QuickBooksDataContext.Provider value={value}>
            {children}
        </QuickBooksDataContext.Provider>
    );
};