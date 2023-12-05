import {
  fetchQuickbookCurrencies,
  QuickbookCurrenciesAPIResult,
  CreateCurrencyMappingAPIProps,
  fetchCreateCurrencyMapping,
  BlockchainCurrencyMapsAPIResult,
  fetchBlockchainCurrencyMaps,
} from "@/services/integrations";

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const key = "integrations";
export const useQueryBlockchainCurrencyMaps = (): UseQueryResult<
  BlockchainCurrencyMapsAPIResult,
  Error
> => {
  return useQuery({
    queryKey: ["integrations-blockchain-cur"],
    queryFn: fetchBlockchainCurrencyMaps,
  });
};

export const useQueryQuickbookCurrencies = (): UseQueryResult<
  QuickbookCurrenciesAPIResult,
  Error
> => {
  return useQuery({ queryKey: [key], queryFn: fetchQuickbookCurrencies });
};

export const useMutationCreateCurrencyMapping = (): UseMutationResult<
  any,
  Error,
  CreateCurrencyMappingAPIProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateCurrencyMapping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};
