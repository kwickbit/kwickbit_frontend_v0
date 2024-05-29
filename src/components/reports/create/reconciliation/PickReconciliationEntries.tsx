import classNames from "classnames";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { UnreconciledEntries } from "./UnreconciledEntries";
import { ReconciliationEntry } from "@/components/reports/reconciliation/ReconciliationEntry";

interface Props {
  transactionAmount: number;
  entriesAmount: number;
  isReconcilable: boolean;
  entriesToReconcile: IntegrationTransactionEntry[];
  unreconciledEntries: IntegrationTransactionEntry[];
  removeEntry: (entry: string) => void;
  addEntry: (entry: string) => void;
}

export const PickReconciliationEntries = ({
  transactionAmount,
  entriesAmount,
  isReconcilable,
  entriesToReconcile,
  unreconciledEntries,
  removeEntry,
  addEntry,
}: Props): React.JSX.Element => {
  const discrepancy = transactionAmount - entriesAmount;
  const margin = Math.abs(100 * discrepancy / transactionAmount);

  return (
    <>
      <ul className={classNames("w-full divide-y-4 mt-6 p-3", isReconcilable && "bg-[#4ADDB6]")}>
        <p>Amount left to reconcile: {discrepancy.toFixed(6)} ({margin.toFixed(1)}%)</p>
        {entriesToReconcile.length ?
          entriesToReconcile.map((entry) =>
            <ReconciliationEntry
              key={entry.entryId}
              entry={entry}
              moveEntry={removeEntry}
              buttonText={"Remove"}
            />) :
          "Please select some entries below."
        }
      </ul>
      <UnreconciledEntries
        entries={unreconciledEntries.filter((entry) => !entriesToReconcile.includes(entry))}
        moveEntry={addEntry}
      />
    </>
  );
}
