import { TransactionProps } from "@/services/transactions";
import React from "react";

interface Props {
  transaction: TransactionProps;
}

const BlockchainFee = ({ transaction }: Props): React.JSX.Element => {
  return (
    <div className="mb-5">
      <div className="grid grid-cols-[2fr,4.1fr] mb-2 gap-1">
        <div className="flex items-center text-sm text-[#171A1F] font-bold pr-1 py-4">
          Blokchain Fee
        </div>
        <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
          <div className="flex justify-center items-center text-sm text-[#171A1F] font-bold py-4" />
          <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
            Choose expense
          </div>
          <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
            Amount
          </div>
          <div />
        </div>
      </div>
      <div className="grid grid-cols-[2fr,4.1fr] mt-3 gap-1">
        {transaction.fee ? (
          <>
            <div>
              <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-7">
                {`${transaction.fee?.amount.toFixed(5)} ${
                  transaction.detail?.symbol
                }`}
              </span>
            </div>
            <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
              <div className="flex justify-center items-center">
                <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-2 w-full text-center">
                  Fee
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-1 w-full text-center">
                  Blockchain fees
                </span>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative rounded-xl bg-[#F3F4F6] text-[#565D6D] text-xs py-2 grid grid-cols-[1fr,37px] w-full px-2">
                  <span className="">{transaction.fee.amount}</span>
                  <p className="pl-1">XLM</p>
                </div>
              </div>
              <div />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BlockchainFee;
