/**
 * EditTransactionModal Component
*/

import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import {
  AccountingTransactionAPIResult,
  TransactionProps,
} from "@/services/transactions";
import RightModal from "../../RightModal";
import { YellowWarning } from "../../common/AppIcon";
import TransactionLines from "./TransactionLines";
import cn from "classnames";
import CommonWarningAlert from "../../common/WarningAlert";
import BlockchainFee from "./BlockchainFee";
import BlockchainTransDescription from "./BlockchainTransDescription";
import EditTransactionModalHeader from "./header";
import EditTransactionModalFooter from "./footer";

import useEditTransactionModal from "@/hooks/transactions/EditTransactionModal/useEditTransactionModal";

interface Props {
  editTransaction: UseBooleanReturnProps;
  transaction: TransactionProps | undefined;
  accountingTransactions: AccountingTransactionAPIResult | undefined;
}

const EditTransactionModal = ({
  editTransaction,
  transaction,
  accountingTransactions,
}: Props): JSX.Element => {
  const {
    tempTransaction,
    setTempTransaction,
    tempAccountingTransactions,
    setTempAccountingTransactions,
    sumAcc,
    publishTransaction,
  } = useEditTransactionModal({ transaction, accountingTransactions });

  return (
    <RightModal
      modalClassNames="max-w-2xl max-h-[calc(100%-54px)]"
      show={editTransaction.value}
      closeModal={editTransaction.onFalse}
    >
      {tempTransaction &&
        tempTransaction.fee.mainCurrency &&
        tempAccountingTransactions && (
          <div className="rounded pt-8 pb-11 px-7 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full overflow-y-auto">
            <EditTransactionModalHeader
              transaction={tempTransaction}
              editTransaction={editTransaction}
            />
            <CommonWarningAlert
              shouldShow={sumAcc > tempTransaction.detail.amount}
              message="The Total amount value exceeds the transaction amount. Please regulate the transaction values"
            />

            <div className="mb-4">
              <h2
                className={cn(
                  "text-lg font-bold  font-manrope",
                  { "text-[#171A1F]": sumAcc < tempTransaction.detail.amount },
                  { "text-[#4ADDB6]": sumAcc == tempTransaction.detail.amount },
                  { "text-[#ef5666]": sumAcc > tempTransaction.detail.amount }
                )}
              >
                {`${
                  tempTransaction.detail.amount +
                  tempTransaction.fee.mainCurrency?.amount
                } ${tempTransaction.detail.symbol} `}
                <span className="capitalize">({tempTransaction.chain})</span>
              </h2>
              <p className="text-[#39BFF0] text-xs font-bold px-0.5">{`$${tempTransaction.detail.price}`}</p>
            </div>

            <BlockchainTransDescription transaction={tempTransaction} />

            <div className="pb-3">
              <div className="grid grid-cols-[2fr,4.1fr] mb-2 gap-1">
                <div className="flex items-center text-sm text-[#171A1F] font-bold py-4">
                  Transaction Value
                </div>
                <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
                  <div className="flex justify-center items-center text-sm text-[#171A1F] font-bold py-4">
                    Type
                  </div>
                  <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
                    Choose expense
                  </div>
                  <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
                    Amount
                  </div>
                  <div />
                </div>
              </div>
              <div className="grid grid-cols-[2fr,4.1fr] mt-3 gap-1 relative">
                <div>
                  <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-7">
                    {`${tempTransaction.detail.amount} ${tempTransaction.detail.symbol}`}
                  </span>
                </div>
                {accountingTransactions && (
                  <TransactionLines
                    transaction={tempTransaction}
                    setTransaction={setTempTransaction}
                    accountingTransactions={tempAccountingTransactions}
                    setAccountingTransactions={setTempAccountingTransactions}
                  />
                )}
              </div>
            </div>
            <BlockchainFee transaction={tempTransaction} />
            <EditTransactionModalFooter
              transaction={tempTransaction}
              publishTransaction={publishTransaction}
              disabledPublish={
                tempTransaction.currencyMapping?.nonSetMapping ||
                sumAcc !== tempTransaction.detail.amount
              }
            />
            {tempTransaction.currencyMapping?.nonSetMapping && (
              <div className="absolute bottom-3 left-7 text-[#ECB90D] text-sm font-bold flex items-center gap-2">
                <YellowWarning />
                {`Configure Mapping for token ${tempTransaction.currencyMapping.token} to integrate this transaction`}
              </div>
            )}
          </div>
        )}
    </RightModal>
  );
};

export default EditTransactionModal;
