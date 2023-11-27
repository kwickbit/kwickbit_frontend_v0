import { useState, useEffect } from "react";
import Loader from "../Loader";
import ServerError from "../ServerError";
import TransactionSelectSection from "./SelectSection";
import TransactionListSection from "./TransactionListSection";
import { NonSetCurrencyProps } from "@/services/transactions";
import WarningAlert from "./WarningAlert";
import { useQueryTransactions } from "@/hooks/transactions";
import * as _ from "lodash";

const TransactionsView = (): JSX.Element => {
  const [nonSetMappings, setNonSetMappings] = useState<NonSetCurrencyProps[]>(
    []
  );
  const { data, isLoading, isError, refetch } = useQueryTransactions();

  useEffect(() => {
    if (data && data.transactions && data.non_set_currencies) {
      const arr: NonSetCurrencyProps[] = [];
      for (const transaction of data.transactions) {
        if (transaction.currencyMapping?.nonSetMapping) {
          arr.push(transaction.currencyMapping as NonSetCurrencyProps);
        }
      }
      setNonSetMappings(arr);
    }
  }, [data]);

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

  const onCloseWarningAlert = (): void => {
    if (nonSetMappings.length > 0) {
      const arr: NonSetCurrencyProps[] = _.cloneDeep(nonSetMappings);
      arr.shift();
      setNonSetMappings(arr);
    }
  };

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
          <TransactionSelectSection />
          <TransactionListSection
            transactions={data?.transactions}
            onRefresh={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
