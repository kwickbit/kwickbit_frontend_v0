/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  Status,
  TransactionAPIResult,
  TransactionProps,
} from "@/services/transactions";
import { fetchAllTransactions, fetchWalletTransactions, getTransactions } from "@/services/transactions";
import useUserWebSocket from "../useWebSocket";
import { useStorage } from "../useStorage";
import { computeDeduplicationId } from "@/utils/utils";
import { useTokenMappingContext } from "@/hooks/useTokenMappingsDataProvider";
import { CurrencyMapping } from "@/services/integrations/quickbooks";

interface TransactionAPIResultMeta {
  /**
   * Start position of this result meta
   */
  tStartId: number;
  nextCursor: any;
  totalTransactions: number;
}

interface TransactionResultGroup {
  /**
   * The absolute start position
   */
  offset: number;
  /**
   * position inside a group
   */
  totalTransactions: number;
  results: TransactionAPIResultMeta[];
}

export interface Page {
  startTransactionId: number;
  size: number;
  pageId: number;
}

export interface ChainAddress {
  chain: string;
  address: string;
  walletId: string;
}

export interface UserTransactionsViewReturnProps {
  isLoading: boolean;
  isError: boolean;
  transactionsData: TransactionProps[];
  refreshTransactions: () => Promise<void>;
  nonSetMappings: CurrencyMapping[];
  moveNext: () => Promise<void>;
  movePrev: () => Promise<void>;
  pageId: number;
  totalTransactions: number;
  fromCount: number;
  toCount: number;
  haveNext: boolean;
  havePrev: boolean;
  changeChainAddress: (chain?: string, address?: string, walletId?: string) => void;
}

const pageSize = 10;
const chainAddressKey = "chainAddress";
const allGroupsKey = "transactionsResultGroups";
const allPageKey = "transactionsPage";
const allTransactionsKey = "Transactions";

const useTransactionsView = (): UserTransactionsViewReturnProps => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<TransactionProps[]>([]);
  const { currencyMappings: { data: tokenMappings, refetch: refetchTokenMappings } } = useTokenMappingContext();
  const [isLoadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const [shouldFirstPull, setShouldFirstPull] = useState<boolean>(true);
  const { isThereNewUpdateMappedCurrencies, setIsThereNewUpdateMappedCurrenciesToFalse } = useUserWebSocket();

  const { data: chainAddress, setData: setChainAddress } =
    useStorage<ChainAddress | null>(chainAddressKey, null);

  const {
    data: transactionResultGroups,
    setData: setTransactionResultGroups,
    changeStorageKey: changeStorageKeyGroup,
  } = useStorage<TransactionResultGroup[]>(allGroupsKey, []);

  const {
    data: transactions,
    setData: setTransactions,
    changeStorageKey: changeStorageKeyTransactions,
  } = useStorage<TransactionProps[]>(allTransactionsKey, []);

  const {
    data: page,
    setData: setPage,
    changeStorageKey: changeStorageKeyPage,
    initialized: initializedPage,
  } = useStorage<Page>(allPageKey, {
    startTransactionId: 0,
    pageId: 0,
    size: 0,
  });

  const { fetchedNewTransactionsData, clearFetchedTransactionsData, publishedTransactionToIntegration, clearPublishedTransactionToIntegration } = useUserWebSocket();

  useEffect(() => {
    if (fetchedNewTransactionsData) {
      if (fetchedNewTransactionsData.nbNewTransactions > 0) {
        refresh(
          fetchedNewTransactionsData.minDateTime,
          fetchedNewTransactionsData.maxDateTime
        );
      }
      clearFetchedTransactionsData();
    }
  }, [fetchedNewTransactionsData]);

  useEffect(() => {
    if (publishedTransactionToIntegration) {
      const updatedTransactions = [...transactions];
      const idxTransaction = updatedTransactions.findIndex(item => item.atomicTransactionId === publishedTransactionToIntegration.atomicTransactionId);
      updatedTransactions[idxTransaction] = { ...updatedTransactions[idxTransaction], status: Status.Published };
      setTransactions(updatedTransactions);
      clearPublishedTransactionToIntegration();
    }
  }, [publishedTransactionToIntegration, transactions]);

  useEffect(() => {
    let _pageSize = page.size;
    if (initializedPage && page.size === 0) {
      _pageSize =
        pageSize > transactions.length ? transactions.length : pageSize;
      setPage((prev) => ({
        ...prev,
        size: _pageSize,
      }));
    }
  }, [transactions, initializedPage]);

  useEffect(() => {
    const _pageSize = page.size;

    const arrData =
      _pageSize > 0
        ? transactions.slice(
          page.startTransactionId,
          page.startTransactionId + _pageSize
        )
        : [];
    setData(arrData);

  }, [page, transactions, initializedPage]);

  useEffect(() => {
    let resultGroupsKey;
    let transactionsKey;
    let pageKey;

    if (chainAddress) {
      const { chain, address } = chainAddress;
      const addKey = `${chain}_${address}`;
      resultGroupsKey = `${allGroupsKey}_${addKey}`;
      transactionsKey = `${allTransactionsKey}_${addKey}`;
      pageKey = `${allPageKey}_${addKey}`;
    } else {
      resultGroupsKey = allGroupsKey;
      transactionsKey = allTransactionsKey;
      pageKey = allPageKey;
    }

    changeStorageKeyGroup(resultGroupsKey);
    changeStorageKeyTransactions(transactionsKey, (): void => {
      setShouldFirstPull(true);
    });
    changeStorageKeyPage(pageKey);
  }, [chainAddress]);

  useEffect(() => {
    if (shouldFirstPull && transactions.length === 0) {
      refresh();
      setShouldFirstPull(false);
    }
  }, [shouldFirstPull, transactions]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (isThereNewUpdateMappedCurrencies) {
        await refetchTokenMappings();
        setIsThereNewUpdateMappedCurrenciesToFalse();
      }
    };

    fetchData();
  }, [isThereNewUpdateMappedCurrencies, refetchTokenMappings, setIsThereNewUpdateMappedCurrenciesToFalse]);

  const nonSetMappings = tokenMappings.filter(currencyMapping => !currencyMapping.isIntegrationRefDefined);

  const getTransactionResult = async (
    nextCursor?: any,
    dateTimeMin?: any,
    dateTimeMax?: any
  ): Promise<TransactionAPIResult | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions({
        chain: chainAddress ? chainAddress.chain : undefined,
        address: chainAddress ? chainAddress.address : undefined,
        nextCursor,
        dateTimeMin,
        dateTimeMax,
      });
      if (!data.data) {
        data.data = [];
      } else {
        data.data.reverse();
      }

      return data;
    } catch (error: any) {
      setError(error.message || error.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const putIndexesToTransactions = (
    arr: TransactionProps[],
    groupdId: number,
    resultId: number
  ): void => {
    for (const transaction of arr) {
      transaction.groupId = groupdId;
      transaction.resultId = resultId;
    }
  };

  const loadSubsequentTransAPIResults = async (
    firstNextCursor: any,
    limit: number
  ): Promise<TransactionAPIResult[]> => {
    const results: TransactionAPIResult[] = [];
    let nextCursor = firstNextCursor;
    let cnt = 0;
    do {
      const transResult = await getTransactionResult(nextCursor);
      if (!transResult) {
        break;
      }

      cnt += transResult.data.length;
      nextCursor = transResult.nextCursors;
      results.push(transResult);
    } while (cnt < limit && nextCursor);

    return results;
  };

  const refresh = async (
    dateTimeMin?: any,
    dateTimeMax?: any
  ): Promise<void> => {
    const transResult = await getTransactionResult(
      null,
      dateTimeMin,
      dateTimeMax
    );
    if (transResult) {
      let apiResults = [transResult];
      const limit = pageSize - transResult.data.length;
      if (limit > 0 && transResult.nextCursors) {
        const arr = await loadSubsequentTransAPIResults(
          transResult.nextCursors,
          limit
        );
        apiResults = apiResults.concat(arr);
      }

      let total = 0;
      const results = apiResults.map((res) => {
        const resultMeta: TransactionAPIResultMeta = {
          tStartId: total,
          nextCursor: res.nextCursors,
          totalTransactions: res.data.length,
        };

        total += res.data.length;
        return resultMeta;
      });

      const transactionResultGroup: TransactionResultGroup = {
        offset: 0,
        totalTransactions: total,
        results,
      };

      setTransactionResultGroups((prev) => {
        const arr = [transactionResultGroup].concat(prev);
        for (let i = 1; i < arr.length; i++) {
          arr[i].offset += arr[0].totalTransactions;
        }
        return arr;
      });

      let transArr: TransactionProps[] = [];
      for (let i = 0; i < apiResults.length; i++) {
        const result = apiResults[i];
        putIndexesToTransactions(result.data, 0, i);
        transArr = transArr.concat(result.data);
      }

      const totalTrans = transactions.length + transArr.length;
      setTransactions((prev) => {
        const prevArr = prev.map((item) => {
          const newItem = {
            ...item,
            groupId: item.groupId !== undefined ? item.groupId + 1 : 0,
          };
          return newItem;
        });
        return transArr.concat(prevArr);
      });

      setPage({
        startTransactionId: 0,
        size: totalTrans > pageSize ? pageSize : totalTrans,
        pageId: 0,
      });
    }
  };

  const loadNextResult = async (
    groupId: number,
    firstNextCursor: any,
    limit: number
  ): Promise<void> => {
    if (firstNextCursor && limit > 0) {
      const apiResults = await loadSubsequentTransAPIResults(
        firstNextCursor,
        limit
      );
      if (apiResults.length > 0) {
        const startResultId = transactionResultGroups[groupId].results.length;
        const lastResult =
          transactionResultGroups[groupId].results[
          transactionResultGroups[groupId].results.length - 1
          ];

        let tStartId = lastResult.tStartId + lastResult.totalTransactions;
        let total = 0;
        const startId = transactionResultGroups[groupId].offset + tStartId;

        const results = apiResults.map((res) => {
          const resultMeta: TransactionAPIResultMeta = {
            tStartId,
            nextCursor: res.nextCursors,
            totalTransactions: res.data.length,
          };

          tStartId += res.data.length;
          total += res.data.length;
          return resultMeta;
        });

        setTransactionResultGroups((prev) => {
          const arr = prev.map((group, idx) => {
            if (idx === groupId) {
              for (const result of results) {
                group.results.push(result);
              }
              group.totalTransactions += total;
            } else if (idx > groupId) {
              group.offset += total;
            }

            return group;
          });
          return arr;
        });

        let transArr: TransactionProps[] = [];
        for (let i = 0; i < apiResults.length; i++) {
          const result = apiResults[i];
          putIndexesToTransactions(result.data, groupId, startResultId + i);
          transArr = transArr.concat(result.data);
        }

        const totalTrans = transactions.length + transArr.length;
        setTransactions((prev) => {
          return prev
            .slice(0, startId)
            .concat(transArr)
            .concat(prev.slice(startId));
        });

        const restSize = totalTrans - startId;
        setPage((prev) => {
          return {
            startTransactionId: prev.startTransactionId + prev.size,
            size: restSize > pageSize ? pageSize : restSize,
            pageId: prev.pageId + 1,
          };
        });
      }
    }
  };

  const moveNext = async (): Promise<void> => {
    const nextStartTransId = page.startTransactionId + page.size;
    const currentGroupId = transactions[nextStartTransId - 1].groupId || 0;
    const currentResultId = transactions[nextStartTransId - 1].resultId || 0;
    const nextEndTransId = nextStartTransId + pageSize;
    let shouldPull: boolean = false;
    const nextCursor =
      transactionResultGroups[currentGroupId].results[currentResultId]
        .nextCursor;
    if (nextCursor) {
      if (!transactions[nextEndTransId]) {
        shouldPull = true;
      } else {
        if (transactions[nextEndTransId].groupId !== currentGroupId) {
          shouldPull = true;
        }
      }
    }
    const currentGroup = transactionResultGroups[currentGroupId];
    const currentResult = currentGroup.results[currentResultId];
    if (shouldPull) {
      const limit =
        nextEndTransId -
        currentGroup.offset -
        currentResult.tStartId -
        currentResult.totalTransactions +
        1;
      await loadNextResult(currentGroupId, nextCursor, limit);
    } else {
      const restSize = transactions.length - nextStartTransId;
      setPage((prev) => ({
        startTransactionId: nextStartTransId,
        size: restSize > pageSize ? pageSize : restSize,
        pageId: prev.pageId + 1,
      }));
    }
  };

  const movePrev = async (): Promise<void> => {
    if (page.pageId > 0) {
      const startTransactionId = page.startTransactionId - pageSize;
      let size = pageSize;
      if (startTransactionId < 0) {
        size += startTransactionId;
      }
      setPage((prev) => ({
        startTransactionId,
        size,
        pageId: prev.pageId - 1,
      }));
    }
  };

  const refreshTransactions = async (): Promise<void> => {
    setLoadingRefresh(true);
    if (chainAddress) {
      const deduplicationObj = {
        chainAddress,
        date: Date.now()
      };
      const deduplicationId = computeDeduplicationId(deduplicationObj);
      await fetchWalletTransactions(chainAddress.chain, chainAddress.address, chainAddress.walletId, deduplicationId);
    }
    else {
      const deduplicationObj = {
        chainAddress: null,
        date: Date.now()
      };
      const deduplicationId = computeDeduplicationId(deduplicationObj);
      await fetchAllTransactions(deduplicationId);
    }
    setLoadingRefresh(false);
  };

  /**
   * Change chain and address, if not defining chain and address, all data will be displayed.
   */
  const changeChainAddress = (
    chain?: string,
    address?: string,
    walletId?: string
  ): void => {
    if (chain && address && walletId) {
      setChainAddress({
        chain,
        address,
        walletId,
      });
    } else {
      setChainAddress(null);
    }
  };

  return {
    isLoading: isLoading || isLoadingRefresh,
    isError: !!error,
    transactionsData: data,
    moveNext,
    movePrev,
    pageId: page.pageId,
    fromCount: page.startTransactionId + 1,
    toCount: page.startTransactionId + page.size,
    totalTransactions: transactions.length,
    haveNext: page.startTransactionId + page.size < transactions.length,
    havePrev: page.pageId > 0,
    nonSetMappings,
    refreshTransactions,
    changeChainAddress,
  };
};

export default useTransactionsView;
