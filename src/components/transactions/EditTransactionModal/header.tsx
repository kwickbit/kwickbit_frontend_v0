import {Direction, TransactionProps} from "@/services/transactions";
import {UseBooleanReturnProps} from "@/hooks/useBoolean";
import {
  CircleLeftAndRightArrow,
  CircleLeftArrow,
  CircleRightArrow,
  TransactionModalCloseIcon,
} from "@/components/common/AppIcon";
import {getLocaleDateString} from "@/utils/time-utils";
import React from "react";

interface Props {
  transaction: TransactionProps;
  editTransaction: UseBooleanReturnProps;
}

const EditTransactionModalHeader = ({
  transaction,
  editTransaction,
}: Props): React.JSX.Element => {

  const arrowHeader = (direction: Direction): React.JSX.Element => {
    if (direction === Direction.Incoming) return <CircleRightArrow className="w-8 h-8" />;
    else if (direction === Direction.Outgoing) return <CircleLeftArrow className="w-8 h-8" />;
    else if (direction === Direction.Swap) return <CircleLeftAndRightArrow className="w-8 h-8" />;
    else return <></>;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {arrowHeader(transaction.direction)}
          <h2 className="text-lg text-[#171A1F]">
            {transaction.direction}
          </h2>
        </div>
        <button
          className="w-8 h-8 appearance-none hover:scale-95"
          onClick={(): void => editTransaction.onFalse()}
        >
          <TransactionModalCloseIcon className="w-8 h-8" />
        </button>
      </div>
      <p className="text-xs text-[#9095A1] font-bold mb-3">
        {getLocaleDateString(new Date(transaction.createdAt))}
      </p>
    </>
  );
};

export default EditTransactionModalHeader;
