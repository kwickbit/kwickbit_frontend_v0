import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useMutationCreateReport,
  useQueryIntegrationEntries,
  useQueryTransactions
} from "@/hooks/reports/reconciliation";
import { parseAmount } from "@/lib/helpers";
import {
  CreateReportAPIProps,
  IntegrationTransactionEntry,
  ReconciliationReportItem
} from "@/services/reports/reconciliation";
import { Direction, TransactionProps } from "@/services/transactions";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import { ReconciliationTransaction } from "./ReconciliationTransaction";


export const CreateReconciliationReport = (): React.JSX.Element => {
  const router = useRouter();
  const { reportStartDate, reportEndDate } = router.query;
  const {
    data: transactionsData,
    isLoading: transactionsAreLoading,
    isError: transactionsAreError
  } = useQueryTransactions({
    dateTimeMin: reportStartDate,
    dateTimeMax: reportEndDate,
  });

  const {
    data: entriesData,
    isLoading: entriesAreLoading,
    isError: entriesAreError
  } = useQueryIntegrationEntries();

  const createReportMutation = useMutationCreateReport();

  const [transactionsToReconcile, setTransactionsToReconcile] = useState([] as TransactionProps[]);
  const [unreconciledEntries, setUnreconciledEntries] = useState([] as IntegrationTransactionEntry[]);
  const [transactionAmount, setTransactionAmount] = useState(0.0);
  const [reconciliations, setReconciliations] = useState([] as ReconciliationReportItem[]);

  const updateState = (): void => {
    if (transactionsData?.data && !transactionsAreLoading && !transactionsAreError) {
      setTransactionsToReconcile(transactionsData.data);
    }

    if (entriesData?.data && !entriesAreLoading && !entriesAreError) {
      setUnreconciledEntries(entriesData.data);
    }

    const sumAmounts = (
      total: number,
      transaction: TransactionProps
    ): number =>
      total + parseAmount(transaction.amountIncoming) - parseAmount(transaction.amountOutgoing);

    const newTransactionAmount = transactionsData?.data.reduce(sumAmounts, 0.0) ?? 0.0;
    setTransactionAmount(newTransactionAmount);
  };

  useEffect(
    updateState,
    [
      transactionsData,
      transactionsAreLoading,
      transactionsAreError,
      entriesData,
      entriesAreLoading,
      entriesAreError,
    ]
  );

  const addReconciliationToReport = (newReconciliation: ReconciliationReportItem): void => {
    setTransactionsToReconcile(
      transactionsToReconcile.filter(
        transaction =>
          transaction.atomicTransactionId !== newReconciliation.transactionData.atomicTransactionId
      )
    )

    setReconciliations(reconciliations.concat(newReconciliation))
  };

  // These are precomputed rather than executing N times the same filtering
  const incomingEntries = useMemo(() => unreconciledEntries.filter(
    entry => entry.direction === Direction.Incoming
  ), [unreconciledEntries]);

  const outgoingEntries = useMemo(() => unreconciledEntries.filter(
    entry => entry.direction === Direction.Outgoing
  ), [unreconciledEntries]);

  if (transactionsAreLoading || entriesAreLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (transactionsAreError || entriesAreError) {
    return <ServerError />;
  }

  const filterEntriesByDirection = (
    transaction: TransactionProps
  ): IntegrationTransactionEntry[] => {
    switch (transaction.direction) {
      case Direction.Incoming:
        return incomingEntries;
      case Direction.Outgoing:
        return outgoingEntries;
      default:
        return unreconciledEntries;
    }
  };

  const createReport = (): void => {
    const report: CreateReportAPIProps = {
      reportDate: new Date().toISOString(),
      transactionsStartDate: reportStartDate as string,
      transactionsEndDate: reportEndDate as string,
      reconciliations
    };

    createReportMutation.mutate(
      report,
      {
        onSuccess: (data: any) => {
          toast.success(data?.message ?? "Reconciliation report created successfully.");
        },
        onError: (error: any) => {
          toast.error(error?.message ?? "Error while creating reconciliation report.");
        },
      }
    )
  }

  return (
    <>
      <h5 className="mx-16">Creating reconciliation report between {reportStartDate} and {reportEndDate}</h5>
      <div className="flex justify-between my-6 mx-12">
        <span className="text-base text-[#21254E]">There are {transactionsToReconcile.length ?? "no"} unreconciled transactions, for a total of {transactionAmount} XLM.
        </span>
        <button className={
          classNames(
            "self-center h-16 rounded-md font-bold text-lg px-6 py-2 mx-2 text-white",
            transactionsToReconcile.length ? "bg-gray-400" : "bg-sky-400")
          }
          disabled={transactionsToReconcile.length > 0}
          onClick={createReport}
        >
          Create report
        </button>
      </div>
      {transactionsToReconcile.length &&
        <div className="col-span-1 flex items-center mx-12 my-6">
          <ul className="w-full">
            {transactionsToReconcile.map(transaction => (
              <ReconciliationTransaction
                key={transaction.atomicTransactionId}
                transaction={transaction}
                addReconciliationToReport={addReconciliationToReport}
                unreconciledEntries={filterEntriesByDirection(transaction)}
                setUnreconciledEntries={setUnreconciledEntries}
              />)
            )}
          </ul>
        </div>
      }
    </>
  );
};
