import { Dispatch, SetStateAction } from "react";
import {
  TransactionProps,
  AccountingTransactionAPIResult,
} from "@/services/transactions";
import EditOneLine from "./CollectionLine";
import { CirclePlus } from "@/components/common/AppIcon";
import useTransactionLines from "@/hooks/transactions/EditTransactionModal/useTransactionLines";

interface Props {
  transaction: TransactionProps;
  setTransaction: Dispatch<SetStateAction<TransactionProps | undefined>>;
  accountingTransactions: AccountingTransactionAPIResult;
  setAccountingTransactions: Dispatch<
    SetStateAction<AccountingTransactionAPIResult | undefined>
  >;
}

const TransactionLines = ({
  transaction,
  setTransaction,
  accountingTransactions,
  setAccountingTransactions,
}: Props): JSX.Element => {
  const {
    typeOptions,
    addNewLine,
    changeAccTransactionType,
    changeAccTransaction,
    changeAccTransactionValue,
    deleteAccTransaction,
  } = useTransactionLines({
    transaction,
    setTransaction,
    accountingTransactions,
    setAccountingTransactions,
  });

  return (
    <div className="relative space-y-3">
      {transaction.collection && transaction.collection.map((item, idx) => (
        <EditOneLine
          key={idx}
          colIdx={idx}
          transaction={transaction}
          item={item}
          accountingTransactions={accountingTransactions}
          typeOptions={typeOptions}
          changeAccTransactionType={changeAccTransactionType}
          changeAccTransaction={changeAccTransaction}
          changeAccTransactionValue={changeAccTransactionValue}
          deleteAccTransaction={deleteAccTransaction}
        />
      ))}
      {transaction.status === 'NonPublished' && (
        <button
          className="absolute -bottom-12 right-0.5 w-7 h-8 flex items-center justify-center"
          onClick={(): void => addNewLine()}
        >
          <CirclePlus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default TransactionLines;
