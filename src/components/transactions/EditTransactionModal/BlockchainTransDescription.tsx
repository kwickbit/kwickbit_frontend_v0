import Link from "next/link";
import { TransactionProps } from "@/services/transactions";
import { abbreviateAddr } from "@/utils/utils";
import { LinkIcon } from "@/components/common/AppIcon";

interface Props {
  transaction: TransactionProps;
}

const BlockchainTransDescription = ({ transaction }: Props): JSX.Element => {
  return (
    <div className="space-y-4 mb-6">
      {transaction.hash ? (
        <div className="flex justify-between items-center">
          <p className="text-black text-sm font-bold">Transaction hash</p>
          <div className="flex justify-end items-center gap-3">
            <p className="text-xs text-[#9095A1]">
              {abbreviateAddr(transaction.hash, 4, 4)}
            </p>
            <Link className="w-4 h-4 flex justify-center items-center" href="#">
              <LinkIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ) : null}
      <div className="flex justify-between items-center">
        <p className="text-[#21254E] text-sm font-bold">Wallet source</p>
        <div className="flex justify-end items-center gap-3">
          <p className="text-xs text-[#9095A1]">{`Wallet 1 (${abbreviateAddr(
            transaction.from,
            4,
            4
          )})`}</p>
          <div className="w-4 h-4 flex justify-center items-center" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-black text-sm font-bold">Recipient</p>
        <div className="flex justify-end items-center gap-3">
          <p className="text-xs text-[#9095A1]">
            {abbreviateAddr(transaction.to, 4, 4)}
          </p>
          <Link className="w-4 h-4 flex justify-center items-center" href="#">
            <LinkIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTransDescription;
