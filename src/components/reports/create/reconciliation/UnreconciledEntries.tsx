import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { ReconciliationEntry } from "@/components/reports/reconciliation/ReconciliationEntry";

interface Props {
  entries: IntegrationTransactionEntry[];
  moveEntry: (entry: string) => void;
}

export const UnreconciledEntries = ({ entries, moveEntry }: Props): React.JSX.Element => {
  return (
    <div className="flex-1 border border-gray-500 p-4">
      <h5 className="pb-4">Entries from integration not yet reconciled</h5>
      <ul className="w-full divide-y-4">
        {entries.length ?
          entries.map((entry) =>
            <ReconciliationEntry
              key={entry.entryId}
              entry={entry}
              moveEntry={moveEntry}
              buttonText={"Add"}
            />) :
          "No entries were found. Create new ones to reconcile."
        }
      </ul>
    </div>
  );
};
