/**
 * The hook for managing a line in the collection of a selected transaction for editing
 */
import { useEffect, useState } from "react";
import { SelectOption } from "@/components/common/Select";
import {
  AccountingTransactionAPIResult,
  TypeOption,
  AccountTransaction,
} from "@/services/transactions";

interface Props {
  /**
   * The line number of the line
   */
  colIdx: number;

  /**
   * The line in the collection
   */
  item: AccountTransaction;

  /**
   * All the accounting transactions
   */
  accountingTransactions: AccountingTransactionAPIResult;

  /**
   * Options for the type select component
   */
  typeOptions: TypeOption[];

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

export interface UseCollectionLineReturnProps {

    /**
     * The current type of the Type column
    */
  selectedType: TypeOption | null;

  /**
   * The select options for choose expense column
  */
  accTransOptions: SelectOption[];

  /**
   * The seletec option of choose expense column
  */
  selectedAccTransOption: SelectOption | null;

  /**
   * The function for selecting a type of the Type column
  */
  selectType: (type: SelectOption) => void;

  /**
   * The function for selecting a type of the Choose expense column
  */
  selectTranOption: (option: SelectOption) => void;

    /**
   * The function for selecting a type of the amount column
  */
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The function for deleting this line.
  */
  deleteLine: () => void;
}

const useCollectionLine = ({
  colIdx,
  item,
  accountingTransactions,
  typeOptions,
  changeAccTransactionType,
  changeAccTransaction,
  changeAccTransactionValue,
  deleteAccTransaction,
}: Props): UseCollectionLineReturnProps => {
  const [selectedType, setSelectedType] = useState<TypeOption | null>(null);
  const [accTransOptions, setAccTransOptions] = useState<SelectOption[]>([]);
  const [selectedAccTransOption, setSelectedAccTranOption] =
    useState<SelectOption | null>(null);

  useEffect(() => {
    if (item && accountingTransactions) {
      const type = typeOptions.find((t) => t.title === item.symbol) || null;
      setSelectedType(type);

      if (type) {
        if (accountingTransactions[type.value]) {
          const atArr =
            accountingTransactions[type.value]?.filter((tr) => !tr.included) ||
            [];
          if (!atArr.find((it) => it.id === item.id)) {
            atArr.unshift(item);
          }
          const arr: SelectOption[] = atArr.map((at) => {
            let title = "";
            switch (at.symbol) {
              case "BILL":
                title = at.description;
                break;
              case "EXP":
                title = at.from_account ?? at.id;
                break;
              case "SW_OUT":
                title = at.from_account ?? at.id;
                break;
              case "INV":
                title = at.description;
                break;
              case "INC":
                title = at.description;
                break;
              case "SW_IN":
                title = at.to_account ?? at.id;
                break;
            }

            return {
              title,
              value: at.id,
            };
          }) as SelectOption[];
          setAccTransOptions(arr);

          const tran = arr.find((option) => option.value === item.id) || null;
          setSelectedAccTranOption(tran);
        }
      }
    }
  }, [item, accountingTransactions]);

  const selectType = (type: SelectOption): void => {
    changeAccTransactionType(
      colIdx,
      selectedType as TypeOption,
      type as TypeOption
    );
  };

  const selectTranOption = (option: SelectOption): void => {
    if (selectedType) {
      if (accountingTransactions[selectedType.value]) {
        const tran = accountingTransactions[selectedType.value]?.find(
          (it) => it.id === option.value
        );
        if (tran) {
          changeAccTransaction(colIdx, selectedType, tran);
        }
      }
    }
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = e.target.valueAsNumber;
    if (selectedType) {
      changeAccTransactionValue(colIdx, selectedType, value);
    }
  };

  const deleteLine = (): void => {
    if (selectedType) {
      deleteAccTransaction(colIdx, selectedType);
    }
  };

  return {
    selectedType,
    accTransOptions,
    selectedAccTransOption,
    selectType,
    selectTranOption,
    changeValue,
    deleteLine,
  };
};

export default useCollectionLine;
