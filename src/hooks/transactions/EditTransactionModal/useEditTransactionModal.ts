/**
 * The hook for EditTrasactionModal, for a selected transaction for editing
 */

import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import {
  AccountingTransactionAPIResult,
  TransactionProps,
} from "@/services/transactions";
import { getLocaleDateString } from "@/utils/time-utils";
import useCurrencyConversion from "@/hooks/useCurrencyConversion";
import * as _ from "lodash";

interface Props {
  /**
   * The selected transaction for editing
   */
  transaction: TransactionProps | undefined;

  /**
   * All the accounting transactions
   */
  accountingTransactions: AccountingTransactionAPIResult | undefined;
}

export interface UseEditTransactionModalReturnProps {
  /**
   * Deep Copy of transaction of the input props
   */
  tempTransaction: TransactionProps | undefined;
  setTempTransaction: Dispatch<SetStateAction<TransactionProps | undefined>>;

  /**
   * Deep copy of accountingProps of the input props
   */
  tempAccountingTransactions: AccountingTransactionAPIResult | undefined;
  setTempAccountingTransactions: Dispatch<
    SetStateAction<AccountingTransactionAPIResult | undefined>
  >;
  /**
   * In a collection item of the editing transaction , sum of the amount values that are converted from the currency of the accounting transaction to the main transaction's currency
   * It excludes blockchain fee.
   */
  sumAcc: number;

  /**
   * Publish Transaction
   */
  publishTransaction: () => void;
}

const useEditTransactionModal = ({
  transaction,
  accountingTransactions,
}: Props): UseEditTransactionModalReturnProps => {
  const { convert } = useCurrencyConversion();
  const [tempTransaction, setTempTransaction] = useState<TransactionProps>();
  const [tempAccountingTransactions, setTempAccountingTransactions] =
    useState<AccountingTransactionAPIResult>();
  const [sumAcc, setSumAcc] = useState<number>(0);

  useEffect(() => {
    let sum = 0;
    if (tempTransaction?.collection) {
      for (const col of tempTransaction.collection) {
        sum += col.mainCurrency?.amount || 0;
      }
      setSumAcc(sum);
    }
  }, [tempTransaction]);

  useEffect(() => {
    setTempAccountingTransactions(accountingTransactions);
  }, [accountingTransactions]);

  useEffect(() => {
    if (transaction) {
      const collection = transaction.collection.map((item) => {
        const mainCurrency = {
          name: transaction.detail.symbol,
          amount: convert(
            item.currency.name,
            transaction.detail.symbol,
            item.amount
          ),
        };
        return {
          ...item,
          mainCurrency,
        };
      });

      const fee = _.cloneDeep(transaction.fee);
      fee.mainCurrency = {
        name: transaction.detail.symbol,
        amount: convert("lumens", transaction.detail.symbol, fee.amount),
      };

      setTempTransaction({
        ...transaction,
        fee,
        collection,
      });
    }
  }, [transaction]);

  const publishTransaction = useCallback((): void => {
    setTempTransaction((prev) => {
      if (prev) {
        return {
          ...prev,
          published: true,
          publishedAt: getLocaleDateString(new Date()),
        };
      }
    });
  }, []);

  return {
    tempTransaction,
    setTempTransaction,
    tempAccountingTransactions,
    setTempAccountingTransactions,
    sumAcc,
    publishTransaction,
  };
};

export default useEditTransactionModal;
