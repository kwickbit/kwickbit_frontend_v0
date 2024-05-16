import { type Dispatch, type SetStateAction, useState } from "react";
import classNames from "classnames";
import { type TransactionProps } from "@/services/transactions";
import { type ReconciliationReportItem, type IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { ChainTransactionForReconciliation } from "@/components/reports/reconciliation/ChainTransactionForReconciliation";
import { ReconciliationTransactionEntries } from "@/components/reports/create/reconciliation/ReconciliationTransactionEntries";

interface Props {
  addReconciliationToReport: (newReconciliation: ReconciliationReportItem) => void;
  setUnreconciledEntries: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  transaction: TransactionProps;
  unreconciledEntries: IntegrationTransactionEntry[];
}

export const ReconciliationTransaction = (
  {
    addReconciliationToReport,
    setUnreconciledEntries,
    transaction,
    unreconciledEntries,
  }: Props): React.JSX.Element => {
  const [isReconcilable, setIsReconcilable] = useState(false);
  const [entriesToReconcile, setEntriesToReconcile] = useState([] as IntegrationTransactionEntry[]);

  const reconcileTransaction = (): void => {
    const { atomicTransactionId, workspaceIdChainAddress } = transaction;

    const newReconciliation: ReconciliationReportItem = {
      transactionData: { atomicTransactionId, workspaceIdChainAddress },
      reconciledEntriesIds: entriesToReconcile.map(entry => entry.entryId),
    };

    setUnreconciledEntries(
      unreconciledEntries.filter(
        entry => !entriesToReconcile.includes(entry)
      )
    );

    addReconciliationToReport(newReconciliation);
  };

  return (
    <li className="block mb-2">
      <div className="flex outline-none py-1 px-3 w-full rounded-md col-span-12">
        <ChainTransactionForReconciliation transaction={transaction} />
        <button
          className={classNames(
            "self-center h-16 rounded-md font-bold text-lg px-6 py-2 mx-2",
            isReconcilable ? "bg-sky-400 text-white" : "invisible"
          )}
          onClick={reconcileTransaction}
        >
          Reconcile
        </button>
        <div className="flex-1 border border-gray-500">
          <ReconciliationTransactionEntries
            isReconcilable={isReconcilable}
            setEntriesToReconcile={setEntriesToReconcile}
            setIsReconcilable={setIsReconcilable}
            setUnreconciledEntries={setUnreconciledEntries}
            transaction={transaction}
            unreconciledEntries={unreconciledEntries}
          />
        </div>
      </div>
    </li>
  );
};
