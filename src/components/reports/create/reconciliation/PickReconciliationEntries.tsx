import classNames from "classnames";
import { calculateTransactionAmount } from "@/lib/helpers";
import { TransactionProps } from "@/services/transactions";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { UnreconciledEntries } from "./UnreconciledEntries";
import { ReconciliationEntry } from "@/components/reports/reconciliation/ReconciliationEntry";

interface Props {
  isReconcilable: boolean;
  pickedEntries: IntegrationTransactionEntry[];
  pickedEntriesAmount: number;
  pickEntry: (entry: string) => void;
  unpickEntry: (entry: string) => void;
  unreconciledEntries: IntegrationTransactionEntry[];
  transaction: TransactionProps;
}

export const PickReconciliationEntries = ({
  isReconcilable,
  pickedEntries,
  pickedEntriesAmount,
  pickEntry,
  unpickEntry,
  unreconciledEntries,
  transaction,
}: Props): React.JSX.Element => {
  const transactionAmount = calculateTransactionAmount(transaction);
  const discrepancy = transactionAmount - pickedEntriesAmount;
  const margin = Math.abs(100 * discrepancy / transactionAmount);

  return (
    <>
      <ul className={classNames("w-full divide-y-4 mt-6 p-3", isReconcilable && "bg-[#4ADDB6]")}>
        <p>Amount left to reconcile: {discrepancy.toFixed(6)} ({margin.toFixed(1)}%)</p>
        {pickedEntries.length ?
          pickedEntries.map((entry) =>
            <ReconciliationEntry
              key={entry.entryId}
              entry={entry}
              moveEntry={unpickEntry}
              buttonText={"Remove"}
            />) :
          "Please select some entries below."
        }
      </ul>
      <UnreconciledEntries
        entries={unreconciledEntries.filter((entry) => !pickedEntries.includes(entry))}
        moveEntry={pickEntry}
      />
    </>
  );
};
