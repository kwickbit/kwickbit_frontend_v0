import { useEffect } from "react";
import { UseBooleanReturnProps } from "../useBoolean";
import { CurrencyMapping, AvailableAccount } from "@/services/integrations/quickbooks";
import useUserWebSocket from "../useWebSocket";
import {
  useMutationFetchQuickbookAccounts,
  useQueryCurrencyMappings,
  useQueryQuickbookAccounts
} from "@/hooks/integrations/quickbooks";


interface Props {
  shouldOpenModal: UseBooleanReturnProps;
}

export interface UseIntegrationSettingsModalReturnProps {
  currencyMappings: CurrencyMapping[] | undefined;
  isLoading: boolean;
  isError: boolean;
  accountsPayables: AvailableAccount[] | undefined;
  accountsReceivables: AvailableAccount[] | undefined;
  accountBanks: AvailableAccount[] | undefined;
}

const useQuickbookIntegrationModal = ({ shouldOpenModal }: Props): UseIntegrationSettingsModalReturnProps => {

  const { data: currencyMappingApiRes, isLoading: isLoadingCurrMap, isError: isErrorCurrMap } = useQueryCurrencyMappings(shouldOpenModal.value);
  const { data: accountsApiRes, status: statusAcc, isLoading: isLoadingAcc, isError: isErrorAcc, refetch: refetchAccounts } = useQueryQuickbookAccounts(shouldOpenModal.value);
  const fetchAccountsMutation = useMutationFetchQuickbookAccounts();
  const { fetchedAvailableIntegrationAccounts } = useUserWebSocket();

  // Re-fetch accounts when the WebSocket notifies about the fetched accounts
  useEffect(() => {
    if (fetchedAvailableIntegrationAccounts && shouldOpenModal.value) {
      // Optionally, you could check for a specific condition within fetchedAvailableIntegrationAccounts before refetching
      refetchAccounts();
    }
  }, [fetchedAvailableIntegrationAccounts, shouldOpenModal.value, refetchAccounts]);

  // Automatically trigger account fetching if initial data is empty and modal is opened
  useEffect(() => {
    if (shouldOpenModal.value && statusAcc === 'success' && (!accountsApiRes?.data || accountsApiRes.data.length === 0)) {
      // Ensure the mutation is not already in progress
      if (fetchAccountsMutation.isIdle) {
        fetchAccountsMutation.mutate();
      }
    }
  }, [shouldOpenModal.value, accountsApiRes, fetchAccountsMutation, statusAcc]);

  const currencyMappings = currencyMappingApiRes?.data;
  const accounts = accountsApiRes?.data;

  const isLoading = isLoadingCurrMap || isLoadingAcc;
  const isError = isErrorCurrMap || isErrorAcc;

  const accountsPayables = accounts?.filter(account => account.accountType === 'AccountsPayable');
  const accountsReceivables = accounts?.filter(account => account.accountType === 'AccountsReceivable');
  const accountBanks = accounts?.filter(account => account.accountType === 'Bank');

  return {
    currencyMappings,
    accountsPayables,
    accountsReceivables,
    accountBanks,
    isLoading,
    isError,
  };
};

export default useQuickbookIntegrationModal;
