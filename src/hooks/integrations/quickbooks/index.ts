import {
  addCurrencyMappings,
  AvailableAccountsAPIResult,
  CurrencyMappingAPIResult,
  CurrencyMappingForAdd,
  fetchIntegrationInformation,
  fetchQuickbookAccounts,
  fetchRequestState,
  getAvailableAccounts,
  getCurrencyMappings,
  GetInfoIntegration,
  OptionalFetchIntegrationAllAttributesArgs,
  QuickBooksIntegrationFetchStateAPIResult
} from "@/services/integrations/quickbooks";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery, useQueryClient
} from "@tanstack/react-query";
import {toast} from "react-toastify";


export const useQueryIntegrationInformation = (): UseQueryResult<
  GetInfoIntegration,
  Error
> => {
  return useQuery({
    queryKey: ["integration-info"],
    queryFn: fetchIntegrationInformation,
  });
};

export const useMutationRequestState = (): UseMutationResult<
  QuickBooksIntegrationFetchStateAPIResult,
  Error,
  void,
  unknown
> => {
  return useMutation({ mutationFn: fetchRequestState });
};

export const useQueryCurrencyMappings = (makeQuery: boolean): UseQueryResult<
    CurrencyMappingAPIResult,
    Error
> => {
  return useQuery({
    queryKey: ["integrations-currency-mappings"],
    queryFn: getCurrencyMappings,
    enabled: makeQuery,
  });
};

export const useQueryQuickbookAccounts = (makeQuery: boolean): UseQueryResult<
    AvailableAccountsAPIResult,
    Error
> => {
  return useQuery({ queryKey: ["integrations"], queryFn: getAvailableAccounts, enabled: makeQuery });
};

export const useMutationFetchQuickbookAccounts = (): UseMutationResult<
  any,
  Error,
  OptionalFetchIntegrationAllAttributesArgs,
  unknown
> => {
  const queryClient = useQueryClient();
  const key = 'quickbookAccounts';

  return useMutation({
    mutationKey: [key],
    mutationFn: fetchQuickbookAccounts,
    onSuccess: () => {
      // Invalidate and refetch QuickBooks accounts data
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

export const useMutationAddCurrencyMappings = (): UseMutationResult<
  any,
  Error,
  CurrencyMappingForAdd[],
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-currency-mappings'],
    mutationFn: addCurrencyMappings,
    onSuccess: (data) => {
      toast.success(data?.message ?? "Source created successfully");
      queryClient.invalidateQueries({ queryKey: ['quickbookAccounts'] });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error while creating source");
    },
  });
};
