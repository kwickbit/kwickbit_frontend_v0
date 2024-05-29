import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { doFloatsMatch, parseAmount } from "@/lib/helpers";
import { Direction, TransactionProps } from "@/services/transactions";
import { ChainTransactionForReconciliation } from "@/components/reports/reconciliation/ChainTransactionForReconciliation";
import { ReconciliationReportItem, IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { ReconciliationTransactionEntries } from "./ReconciliationTransactionEntries";

interface Props {
  transaction: TransactionProps;
  addReconciliationToReport: (newReconciliation: ReconciliationReportItem) => void;
  unreconciledEntries: IntegrationTransactionEntry[];
  setUnreconciledEntries: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
}

export const ReconciliationTransaction = (
  {
    transaction,
    addReconciliationToReport,
    unreconciledEntries,
    setUnreconciledEntries
  }: Props): React.JSX.Element => {

  const [entriesToReconcile, setEntriesToReconcile] = useState([] as IntegrationTransactionEntry[]);
  const [isReconcilable, setIsReconcilable] = useState(false);
  const [entriesAmount, setEntriesAmount] = useState(0.0);

  const amountIncoming = parseAmount(transaction.amountIncoming);
  const amountOutgoing = parseAmount(transaction.amountOutgoing);
  const transactionAmount = Math.abs(amountIncoming - amountOutgoing);

  const checkIfReconcilableCallback = (): void => {
    const hasIncoming = !doFloatsMatch(amountIncoming, 0.0);
    const hasOutgoing = !doFloatsMatch(amountOutgoing, 0.0);
    const tolerance = 0.05;
    const isDiscrepancyTolerable = Math.abs(
      (transactionAmount - entriesAmount) / transactionAmount
    ) <= tolerance;

    switch (transaction.direction) {
      case Direction.Incoming:
        setIsReconcilable(isDiscrepancyTolerable);
        break;
      case Direction.Outgoing:
        setIsReconcilable(isDiscrepancyTolerable);
        break;
      case Direction.Swap:
        setIsReconcilable(isDiscrepancyTolerable && hasIncoming && hasOutgoing);
        break;
      default:
        setIsReconcilable(false);
        break;
    }
  };

  const checkIfReconcilable = useCallback(
    checkIfReconcilableCallback,
    [amountIncoming, amountOutgoing, entriesAmount, transaction.direction, transactionAmount]
  );

  const recalculateEntriesAmount = (): void => {
    const sumAmounts = (
      total: number,
      entry: IntegrationTransactionEntry
    ): number => total + parseAmount(entry.reconvertedAmount);

    setEntriesAmount(entriesToReconcile.reduce(sumAmounts, 0));
    checkIfReconcilable();
  };

  useEffect(recalculateEntriesAmount, [entriesToReconcile, checkIfReconcilable]);

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

  const addEntry = (clickedEntryId: string): void => {
    const clickedEntry = unreconciledEntries.find(
      entry => entry.entryId === clickedEntryId
    ) as IntegrationTransactionEntry;
    setUnreconciledEntries(unreconciledEntries.filter(entry => entry !== clickedEntry));
    setEntriesToReconcile(entriesToReconcile.concat(clickedEntry));
  };

  const removeEntry = (clickedEntryId: string): void => {
    const clickedEntry = entriesToReconcile.find(
      entry => entry.entryId === clickedEntryId
    ) as IntegrationTransactionEntry;

    setUnreconciledEntries(unreconciledEntries.concat(clickedEntry));
    setEntriesToReconcile(entriesToReconcile.filter(entry => entry !== clickedEntry));
  }

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
            transactionAmount={transactionAmount}
            entriesAmount={entriesAmount}
            isReconcilable={isReconcilable}
            entriesToReconcile={entriesToReconcile}
            unreconciledEntries={unreconciledEntries}
            removeEntry={removeEntry}
            addEntry={addEntry}
          />
        </div>
      </div>
    </li>
  );
};
