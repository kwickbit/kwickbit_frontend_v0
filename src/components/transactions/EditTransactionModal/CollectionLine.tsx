import Select from "@/components/common/Select";
import {
  TransactionProps,
  AccountingTransactionAPIResult,
  TypeOption,
  AccountTransaction,
} from "@/services/transactions";
import { CircleMinus } from "../../common/AppIcon";
import useCollectionLine from "@/hooks/transactions/EditTransactionModal/useCollectionLine";

interface Props {
  colIdx: number;
  transaction: TransactionProps;
  item: AccountTransaction;
  accountingTransactions: AccountingTransactionAPIResult;
  typeOptions: TypeOption[];
  changeAccTransactionType: (colIdx: number, prevType: TypeOption, type: TypeOption) => void;
  changeAccTransaction: (
    colIdx: number,
    type: TypeOption,
    accTrans: AccountTransaction
  ) => void;
  changeAccTransactionValue: (
    colIdx: number,
    type: TypeOption,
    value: number
  ) => void;
  deleteAccTransaction: (colIdx: number, type: TypeOption) => void;
}

const EditOneLine = ({
  colIdx,
  transaction,
  item,
  accountingTransactions,
  typeOptions,
  changeAccTransactionType,
  changeAccTransaction,
  changeAccTransactionValue,
  deleteAccTransaction,
}: Props): JSX.Element => {
  const {
    selectedType,
    accTransOptions,
    selectedAccTransOption,
    selectType,
    selectTranOption,
    changeValue,
    deleteLine,
  } = useCollectionLine({
    colIdx,
    item,
    accountingTransactions,
    typeOptions,
    changeAccTransactionType,
    changeAccTransaction,
    changeAccTransactionValue,
    deleteAccTransaction,
  });

  return (
    <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
      <div className="flex items-center">
        {transaction.published ? (
          <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-3 w-full">
            {selectedType?.title}
          </span>
        ) : (
          <Select
            selected={selectedType}
            setSelected={selectType}
            options={typeOptions}
            disabled={transaction.published}
          />
        )}
      </div>
      <div className="flex items-center">
        {transaction.published ? (
          <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-3 w-full">
            {selectedAccTransOption?.title}
          </span>
        ) : (
          <Select
            selected={selectedAccTransOption}
            setSelected={selectTranOption}
            options={accTransOptions}
            disabled={transaction.published}
          />
        )}
      </div>
      <div className="flex items-center">
        <div className="relative rounded-xl bg-[#F3F4F6] text-[#565D6D] text-xs py-2 grid grid-cols-[1fr,37px] px-2">
          <input
            className="appearance-none w-full h-full bg-[#F3F4F6] focus-visible:outline-none"
            type="number"
            min={0}
            value={item.mainCurrency?.amount}
            onChange={changeValue}
            disabled={transaction.published}
          />
          <p className="pl-1">{transaction.detail.symbol}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {!transaction.published && (
          <button
            className="flex items-center justify-center"
            onClick={(): void => deleteLine()}
          >
            <CircleMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditOneLine;
