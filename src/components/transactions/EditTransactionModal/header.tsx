import { TransactionProps } from "@/services/transactions";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import {
  CircleLeftArrow,
  CircleRightArrow,
  TransactionModalCloseIcon,
} from "@/components/common/AppIcon";
import { getLocaleDateString } from "@/utils/time-utils";

interface Props {
  transaction: TransactionProps;
  editTransaction: UseBooleanReturnProps;
}

const EditTransactionModalHeader = ({
  transaction,
  editTransaction,
}: Props): JSX.Element => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {transaction.direction == "Outgoing" ? (
            <CircleRightArrow className="w-8 h-8" />
          ) : (
            <CircleLeftArrow className="w-8 h-8" />
          )}
          <h2 className="text-lg text-[#171A1F]">
            {transaction.direction === "Outgoing" ? "Outgoing" : "Incoming"}
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
