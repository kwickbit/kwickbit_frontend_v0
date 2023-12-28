import { TransactionProps } from "@/services/transactions";
import Image from "next/image";
import cn from "classnames";
import { ArrowUpLine } from "@/components/common/AppIcon";

interface Props {
  transaction: TransactionProps;
  publishTransaction: () => void;
  disabledPublish?: boolean;
}

const EditTransactionModalFooter = ({
  transaction,
  publishTransaction,
  disabledPublish = false
}: Props): JSX.Element => {
  return (
    <div className="bg-[#F1F1F1] border shadow px-3 py-4 flex gap-10">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#171A1F] font-manrope">
          Integration:
        </span>
        <Image
          src="/assets/img/quickbooks.png"
          width={116}
          height={22}
          alt="quickbooks"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#171A1F] font-bold font-manrope">
          Current status:
        </span>
        <div
          className={cn(
            "w-4 h-4 rounded-full",
            { "bg-[#4ADDB6]": transaction.status === 'Published' },
            { "bg-[#BABABA]": transaction.status === 'NonPublished'}
          )}
        />
        <span
          className={cn(
            "text-sm font-bold",
            { "bg-[#4ADDB6]": transaction.status === 'Published' },
            { "bg-[#BABABA]": transaction.status === 'NonPublished'}
          )}
        >
          {transaction.status === 'Published' ? "Published" : "Yet to Publish"}
        </span>
        {transaction.status === 'NonPublished' && (
          <button
            className={cn("bg-[#4ADDB6] rounded-md text-[#082C22] text-sm px-3 py-2 flex items-center gap-2",
            {"hover:scale-95": !disabledPublish })}
            disabled={disabledPublish}
            onClick={():void => publishTransaction()}
          >
            <ArrowUpLine />
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default EditTransactionModalFooter;
