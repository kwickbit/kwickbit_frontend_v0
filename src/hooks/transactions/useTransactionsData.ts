"use client";

import { useEffect, useState, useMemo } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TransactionAPIResult } from "@/services/transactions";
import { getTransactions } from "@/services/transactions";

export interface UseTransactionsDataReturnProps {
  isLoading: boolean;
  isError: boolean;
  data: TransactionAPIResult | null;
  reload: () => void;
  moveNext: () => Promise<void>;
  movePrev: () => Promise<void>;
  page: number;
  totalTransactions: number;
  fromCount: number;
  toCount: number;
  haveNext: boolean;
  havePrev: boolean;
}

interface ResultMetadataProps {
  page: number;
}
const resultsKey = "transactions_results";
const metaKey = "transactions_meta";

const useTransactionsData = (): UseTransactionsDataReturnProps => {
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [fromCount, setFromCount] = useState<number>(0);
  const [toCount, setToCount] = useState<number>(0);
  const [trasactionAPIResults, setTransactionAPIResults] = useLocalStorage<
    TransactionAPIResult[]
  >(resultsKey, []);
  const [resultMetadata, setResultMetadata] =
    useLocalStorage<ResultMetadataProps>(metaKey, {
      page: 0,
    });

  const getTransactionResult = async (
    nextCursor?: any
  ): Promise<TransactionAPIResult | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions(nextCursor);
      if (!data.data || data.data.length === 0) {
        throw new Error("empty trasactions");
      }

      return data;
    } catch (error: any) {
      setError(error.message || error.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const initData = async():Promise<void> => {
    setResultMetadata((prev) => ({
      ...prev,
      page: 0,
    }));
    const transResult = await getTransactionResult();
    if (transResult) {
      setTransactionAPIResults([transResult]);
    }
  };

  const calculateRange = ():void => {
    let total = 0;
    let fromCnt = 1;
    let toCnt = 1;
    for (let i = 0; i < trasactionAPIResults.length; i++) {
      const result = trasactionAPIResults[i];
      if (i === resultMetadata.page) {
        fromCnt = total + 1;
        toCnt = total + result.data.length;
      }
      total += result.data.length;
    }
    setTotalTransactions(total);
    setFromCount(fromCnt);
    setToCount(toCnt);
  };

  useEffect(() => {
    if (trasactionAPIResults.length === 0 && isInit) {
      initData();
      setIsInit(false);
    }

    calculateRange();
  }, [trasactionAPIResults, isInit]);

  useEffect(() => {
    if (resultMetadata.page >= trasactionAPIResults.length) {
      setResultMetadata((prev) => ({
        ...prev,
        page: 0,
      }));
    }

    calculateRange();
  }, [resultMetadata]);

  const reload = (): void => {
    setTransactionAPIResults([]);
    setResultMetadata((prev) => ({
      ...prev,
      page: 0,
    }));
    setIsInit(true);
  };

  const moveNext = async (): Promise<void> => {
    if (trasactionAPIResults[resultMetadata.page + 1]) {
      setResultMetadata((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    } else {
      const nextCursor = trasactionAPIResults[resultMetadata.page].nextCursors;
      if (nextCursor) {
        setIsLoading(true);
        const transResult = await getTransactionResult(nextCursor);
        setIsLoading(false);
        if (transResult) {
          if (
            transResult.nextCursors &&
            Object.keys(transResult.nextCursors).length === 0
          ) {
            transResult.nextCursors = null;
          }

          setTransactionAPIResults((prev) => {
            return prev.concat([transResult]);
          });
          setResultMetadata((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
        }
      }
    }
  };

  const movePrev = async (): Promise<void> => {
    let prevPage = resultMetadata.page - 1;
    if (prevPage < 0) {
      prevPage = 0;
    }

    setResultMetadata((prev) => ({
      ...prev,
      page: prevPage,
    }));
  };

  return useMemo(
    () => ({
      isLoading,
      isError: !!error,
      data:
        trasactionAPIResults.length > 0
          ? trasactionAPIResults[resultMetadata.page]
          : null,
      reload,
      moveNext,
      movePrev,
      page: resultMetadata.page,
      totalTransactions,
      fromCount,
      toCount,
      haveNext:
        trasactionAPIResults.length > 0
          ? !!trasactionAPIResults[resultMetadata.page].nextCursors
          : false,
      havePrev:
        trasactionAPIResults.length > 0 ? resultMetadata.page > 0 : false,
    }),
    [
      isLoading,
      trasactionAPIResults,
      resultMetadata,
      totalTransactions,
      fromCount,
      toCount,
    ]
  );
};

export default useTransactionsData;
