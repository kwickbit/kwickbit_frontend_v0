import Loader from "../Loader";
import ServerError from "../ServerError";
import TransactionSelectSection from "./SelectSection";
import TransactionListSection from "./TransactionListSection";
import WarningAlert from "./WarningAlert";
import useTransactionsView from "@/hooks/transactions/useTransactionsView";
import Pagination from "../common/pagination";

const TransactionsView = (): JSX.Element => {
  const {
    isLoading,
    isError,
    transactionsData,
    refreshTransactions,
    accountingTrasactionsData,
    refreshAccountingTractions,
    onCloseWarningAlert,
    nonSetMappings,
    moveNext,
    movePrev,
    page,
    totalTransactions,
    fromCount,
    toCount,
    haveNext,
    havePrev
  } = useTransactionsView();

  console.log('havePrev, haveNext =>', havePrev, haveNext);

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
          nonSetMapping={nonSetMappings[0]}
          onClose={onCloseWarningAlert}
        />
      )}
      <div className="overflow-x-auto ">
        <div className="w-fit">
          <Pagination 
            moveNext={moveNext}
            movePrev={movePrev}
            page={page}
            totalTransactions={totalTransactions}
            fromCount={fromCount}
            toCount={toCount}
            haveNext={haveNext}
            havePrev={havePrev}
          />
          <TransactionSelectSection />
          {transactionsData && (
            <TransactionListSection
              transactions={transactionsData.data}
              onRefreshTransactions={refreshTransactions}
              accountingTransactions={accountingTrasactionsData}
              onRefreshAccountingTrasactions={refreshAccountingTractions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
