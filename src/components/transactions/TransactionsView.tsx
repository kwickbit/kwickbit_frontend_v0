import TransactionSelectSection from "./SelectSection";
import TransactionListSection from "./TransactionListSection";
import WarningAlert from "./WarningAlert";
import useTransactionsView from "@/hooks/transactions/useTransactionsView";
import Pagination from "../common/pagination";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import React from "react";

const TransactionsView = (): React.JSX.Element => {
  const {
    isLoading,
    isError,
    transactionsData,
    refreshTransactions,
    nonSetMappings,
    moveNext,
    movePrev,
    pageId,
    totalTransactions,
    fromCount,
    toCount,
    haveNext,
    havePrev
  } = useTransactionsView();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      {nonSetMappings.length > 0 && (
        <WarningAlert
          shouldShow={nonSetMappings.length > 0}
          nonSetMappings={nonSetMappings}
        />
      )}
      <div className="overflow-x-auto ">
        <div className="w-fit">
          <Pagination
            moveNext={moveNext}
            movePrev={movePrev}
            page={pageId}
            totalTransactions={totalTransactions}
            fromCount={fromCount}
            toCount={toCount}
            haveNext={haveNext}
            havePrev={havePrev}
          />
          <TransactionSelectSection />
          <TransactionListSection
            transactions={transactionsData}
            onRefreshTransactions={refreshTransactions}
            nonSetMappings={nonSetMappings}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
