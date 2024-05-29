import { IntegrationTransactionEntry, ReconciliationEntrySources } from "@/services/reports/reconciliation";
import { PickReconciliationEntries } from "./PickReconciliationEntries";

interface Props {
  transactionAmount: number;
  entriesAmount: number;
  entriesSource: ReconciliationEntrySources;
  isReconcilable: boolean;
  entriesToReconcile: IntegrationTransactionEntry[];
  unreconciledEntries: IntegrationTransactionEntry[];
  removeEntry: (entry: string) => void;
  addEntry: (entry: string) => void;
}

export const EntriesSelector = (props: Props): React.JSX.Element => {
  const { entriesSource, ...drilledProps } = props;

  switch (entriesSource) {
    case ReconciliationEntrySources.Pick:
      return <PickReconciliationEntries {...drilledProps} />;
    case ReconciliationEntrySources.Create:
      return <div className="mt-6">
        Placeholder for a component to create an Entry (pending the backend)
      </div>;
    default:
      return <div className="mt-6">
        Placeholder for a component to suggest an Entry matching the transaction (pending the backend)
      </div>;
  }
};
