import { useState, useEffect } from "react";
import {
  useQueryAccountingTransactions,
} from "../transactions";
import {
  AccountingTransactionAPIResult,
  TransactionAPIResult,
} from "@/services/transactions";
import { NonSetCurrencyProps } from "@/services/transactions";
import * as _ from "lodash";
import { QueryObserverResult } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/transactions";
import { useUserWebSocket } from "../useWebSocket";
import useTransactionsData from "./useTransactionsData";

export interface UserTransactionsViewReturnProps {
  isLoading: boolean;
  isError: boolean;
  transactionsData: TransactionAPIResult | undefined | null;
  refreshTransactions: () => Promise<void>;
  accountingTrasactionsData: AccountingTransactionAPIResult | undefined;
  refreshAccountingTractions: () => Promise<
    QueryObserverResult<AccountingTransactionAPIResult, Error>
  >;
  onCloseWarningAlert: () => void;
  nonSetMappings: NonSetCurrencyProps[];

  moveNext: () => Promise<void>;
  movePrev: () => Promise<void>;
  page: number;
  totalTransactions: number;
  fromCount: number;
  toCount: number;
  haveNext: boolean;
  havePrev: boolean;
}

const useTransactionsView = (): UserTransactionsViewReturnProps => {
  const [nonSetMappings, setNonSetMappings] = useState<NonSetCurrencyProps[]>(
    []
  );
  const [isLoadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const {
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    data: transactionsData,
    reload,
    moveNext,
    movePrev,
    page,
    totalTransactions,
    fromCount,
    toCount,
    haveNext,
    havePrev,
  } = useTransactionsData();

  const {
    data: accountingTrasactionsData,
    isLoading: isLoadingAccountingTransactions,
    isError: isErrorAccountingTransactions,
    refetch: refreshAccountingTractions,
  } = useQueryAccountingTransactions();

  const { fetchedNewTransactionsData, readyState } =
    useUserWebSocket();

  useEffect(() => {
    console.log("websocket readystate =>", readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      transactionsData &&
      transactionsData.data &&
      transactionsData.non_set_currencies
    ) {
      const arr: NonSetCurrencyProps[] = [];
      for (const transaction of transactionsData.data) {
        if (transaction.currencyMapping?.nonSetMapping) {
          arr.push(transaction.currencyMapping as NonSetCurrencyProps);
        }
      }
      setNonSetMappings(arr);
    }
  }, [transactionsData]);

  useEffect(() => {
    console.log("fetchedNewTransactionsData =>", fetchedNewTransactionsData);
    if (fetchedNewTransactionsData) {
      reload();
      setLoadingRefresh(false);
    }
  }, [fetchedNewTransactionsData]);

  const onCloseWarningAlert = (): void => {
    if (nonSetMappings.length > 0) {
      const arr: NonSetCurrencyProps[] = _.cloneDeep(nonSetMappings);
      arr.shift();
      setNonSetMappings(arr);
    }
  };

  const refreshTransactions = async (): Promise<void> => {
    setLoadingRefresh(true);
    await fetchTransactions();
  };

  return {
    isLoading:
      isLoadingTransactions ||
      isLoadingAccountingTransactions ||
      isLoadingRefresh,
    isError: isErrorTransactions || isErrorAccountingTransactions,
    transactionsData,
    refreshTransactions,
    accountingTrasactionsData,
    refreshAccountingTractions,
    onCloseWarningAlert,
    nonSetMappings,
    // page props
    moveNext,
    movePrev,
    page,
    totalTransactions,
    fromCount,
    toCount,
    haveNext,
    havePrev,
  };
};

export default useTransactionsView;
