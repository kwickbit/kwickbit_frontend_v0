/**
 * The hook for managing the collection of a selected transaction for editing
 */
import { useMemo, Dispatch, SetStateAction } from "react";
import {
  TransactionProps,
  AccountingTransactionAPIResult,
  outgoingTypeOptions,
  incomingTypeOptions,
  TypeOption,
  AccountTransaction,
} from "@/services/transactions";
import useCurrencyConversion from "@/hooks/useCurrencyConversion";
import * as _ from "lodash";

/**
 * Input props
*/
interface Props {
  /**
   * The selected transaction for editing
   */
  transaction: TransactionProps;
  setTransaction: Dispatch<SetStateAction<TransactionProps | undefined>>;
  /**
   * All the accounting transactions
   */
  accountingTransactions: AccountingTransactionAPIResult;
  setAccountingTransactions: Dispatch<
    SetStateAction<AccountingTransactionAPIResult | undefined>
  >;
}

/**
 * Return props
*/
export interface UseTransactionLinesReturnProps {
  /**
   * Options for the type select component
   */
  typeOptions: TypeOption[];

  /**
   * Add a new line into the transaction collection
   */
  addNewLine: () => void;

  /**
   * Change the type of a line in the transaction collection, Type column
   */
  changeAccTransactionType: (
    colIdx: number,
    prevType: TypeOption,
    type: TypeOption
  ) => void;

  /**
   * Change the accounting transaction of the Choose expense column
   */
  changeAccTransaction: (
    colIdx: number,
    type: TypeOption,
    accTrans: AccountTransaction
  ) => void;

  /**
   * Change the value of a line in the traction collection, Amount column
   */
  changeAccTransactionValue: (
    colIdx: number,
    type: TypeOption,
    value: number
  ) => void;

  /**
   * Delete a line in the transaction collection
   */
  deleteAccTransaction: (colIdx: number, type: TypeOption) => void;
}

const useTransactionLines = ({
  transaction,
  setTransaction,
  accountingTransactions,
  setAccountingTransactions,
}: Props): UseTransactionLinesReturnProps => {
  const { convert } = useCurrencyConversion();

  const typeOptions = useMemo(
    () =>
      transaction.direction === "Outgoing" ? outgoingTypeOptions : incomingTypeOptions,
    [transaction]
  );

  const addNewLine = (): void => {
    if (transaction && accountingTransactions) {
      let accTrans: AccountTransaction | undefined;
      const _accountingTransactions = _.cloneDeep(accountingTransactions);
      if (transaction.direction === "Outgoing") {
        if (_accountingTransactions.bills) {
          accTrans = _accountingTransactions.bills.find(
            (item) => !item.included
          );
        }

        if (!accTrans && _accountingTransactions.expenses) {
          accTrans = _accountingTransactions.expenses.find(
            (item) => !item.included
          );
        }

        if (!accTrans && _accountingTransactions.swapouts) {
          accTrans = _accountingTransactions.swapouts.find(
            (item) => !item.included
          );
        }
      } else {
        if (_accountingTransactions.invoices) {
          accTrans = _accountingTransactions.invoices.find(
            (item) => !item.included
          );
        }

        if (!accTrans && _accountingTransactions.incomes) {
          accTrans = _accountingTransactions.incomes.find(
            (item) => !item.included
          );
        }

        if (!accTrans && _accountingTransactions.swapins) {
          accTrans = _accountingTransactions.swapins.find(
            (item) => !item.included
          );
        }
      }

      if (accTrans) {
        const newAccTrans = _.cloneDeep(accTrans);
        accTrans.included = true;
        setAccountingTransactions(_accountingTransactions);
        setTransaction((prev) => {
          if (prev && transaction.detail && prev.collection) {
            newAccTrans.mainCurrency = {
              name: transaction.detail.symbol,
              amount: convert(
                newAccTrans.currency.name,
                transaction.detail.symbol,
                newAccTrans.amount
              ),
            };
            const collection = prev.collection.concat([
              newAccTrans as AccountTransaction,
            ]);
            return {
              ...prev,
              collection,
            };
          }
        });
      }
    }
  };

  const changeAccTransactionType = (
    colIdx: number,
    prevType: TypeOption,
    type: TypeOption
  ): void => {
    if (transaction && accountingTransactions && transaction.collection ) {
      const _accountingTransactions = _.cloneDeep(accountingTransactions);
      const arrOneTypeTransaction = _accountingTransactions[type.value]?.filter(
        (item) => !item.included
      );
      if (arrOneTypeTransaction && arrOneTypeTransaction.length > 0) {
        if (_accountingTransactions[type.value]  && transaction.collection ) {
          const col = transaction.collection[colIdx];
          const origLine = _accountingTransactions[prevType.value]?.find(
            (item) => item.id === col.id
          );
          if (origLine) {
            origLine.included = false;
            setAccountingTransactions(_accountingTransactions);
          }
        }

        setTransaction((prev) => {
          if (prev ) {
            if (prev.collection) {
              const collection = prev.collection.map((col, idx) => {
                if (idx === colIdx && transaction.detail) {
                  arrOneTypeTransaction[0].included = true;
                  const detail = transaction.detail;
                  const mainCurrency = {
                    name: detail.symbol,
                    amount: convert(
                      arrOneTypeTransaction[0].currency.name,
                      detail.symbol,
                      arrOneTypeTransaction[0].amount
                    ),
                  };

                  return { ...arrOneTypeTransaction[0], mainCurrency };
                }
                return col;
              });

              return {
                ...prev,
                collection,
              };
            }
          }
        });
      }
    }
  };

  const changeAccTransaction = (
    colIdx: number,
    type: TypeOption,
    accTrans: AccountTransaction
  ): void => {
    if (transaction && accountingTransactions) {
      const _accountingTransactions = _.cloneDeep(accountingTransactions);
      if (_accountingTransactions[type.value] && transaction.collection) {
        const col = transaction.collection[colIdx];
        const origLine = _accountingTransactions[type.value]?.find(
          (item) => item.id === col.id
        );
        if (origLine) {
          origLine.included = false;
          setAccountingTransactions(_accountingTransactions);
        }
      }

      setTransaction((prev) => {
        if (prev && prev.collection) {
          const collection = prev.collection.map((col, idx) => {
            if (idx === colIdx && transaction.detail) {
              const mainCurrency = {
                name: transaction.detail.symbol,
                amount: convert(
                  accTrans.currency.name,
                  transaction.detail.symbol,
                  accTrans.amount
                ),
              };
              return { ...accTrans, mainCurrency };
            }
            return col;
          });

          accTrans.included = true;

          return {
            ...prev,
            collection,
          };
        }
      });
    }
  };

  const changeAccTransactionValue = (
    colIdx: number,
    type: TypeOption,
    value: number
  ): void => {
    if( transaction.detail && transaction.collection) {
      const convertedValue = convert(
        transaction.detail.symbol,
        transaction.collection[colIdx].currency.name,
        value
      );

      const detail = transaction.detail;
      setTransaction((prev) => {
        if (prev && prev.collection) {
          const collection = _.cloneDeep(prev.collection);
          if (collection[colIdx].mainCurrency) {
            collection[colIdx].mainCurrency = {
              name: detail.symbol,
              amount: value,
            };
          }
          collection[colIdx].amount = convertedValue;
          return { ...prev, collection };
        }
      });
    }

  };

  const deleteAccTransaction = (colIdx: number, type: TypeOption): void => {
    if (accountingTransactions && transaction.collection) {
      const col = transaction.collection[colIdx];
      const _accountingTransactions = _.cloneDeep(accountingTransactions);
      if (_accountingTransactions[type.value]) {
        const origLine = _accountingTransactions[type.value]?.find(
          (item) => item.id === col.id
        );
        if (origLine) {
          origLine.included = false;
          setAccountingTransactions(_accountingTransactions);
        }
      }
      const collection = transaction.collection.filter(
        (it) => it.id !== col.id
      );
      setTransaction((prev) => {
        if (prev) {
          return {
            ...prev,
            collection,
          };
        }
      });
    }
  };

  return {
    typeOptions,
    addNewLine,
    changeAccTransactionType,
    changeAccTransaction,
    changeAccTransactionValue,
    deleteAccTransaction,
  };
};

export default useTransactionLines;
