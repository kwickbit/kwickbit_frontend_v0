import React from "react";
import cn from "classnames";
import { ChevronLeft, ChevronRight } from "./AppIcon";

interface PaginationProps {
  moveNext: () => Promise<void>;
  movePrev: () => Promise<void>;
  page: number;
  totalTransactions: number;
  fromCount: number;
  toCount: number;
  haveNext: boolean;
  havePrev: boolean;
}

const Pagination = ({
  moveNext,
  movePrev,
  totalTransactions,
  fromCount,
  toCount,
  haveNext,
  havePrev,
}: PaginationProps): JSX.Element => {
  return (
    <div className="pb-4 flex justify-end items-center gap-4">
      <p className="text-[#686583]">{`${fromCount.toLocaleString(
        "en-US"
      )}-${toCount.toLocaleString(
        "en-US"
      )} of ${totalTransactions.toLocaleString("en-US")}`}</p>
      <div className="flex">
        <button
          className={cn(
            "apearance-none rounded-full w-8 h-8 flex justify-center items-center",
            { "hover:bg-transparent": !havePrev },
            { "hover:bg-[#f1f1ef]": havePrev }
          )}
          disabled={!havePrev}
          onClick={():void => {movePrev()}}
        >
          <ChevronLeft className="" disabled={!havePrev} />
        </button>
        <button
          className={cn(
            "apearance-none rounded-full w-8 h-8 flex justify-center items-center",
            { "hover:bg-[#f1f1ef]": haveNext },
            { "hover:bg-transparent": !haveNext }
          )}
          disabled={!haveNext}
          onClick={():void => {moveNext()}}
        >
          <ChevronRight className="" disabled={!haveNext} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
