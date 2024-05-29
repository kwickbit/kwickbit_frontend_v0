import { useState } from "react";
import { IntegrationTransactionEntry, ReconciliationEntrySources } from "@/services/reports/reconciliation";
import { EntriesSelector } from "./EntriesSelector";
import { EntrySourceButtons } from "./EntrySourceButtons";

interface Props {
  transactionAmount: number;
  entriesAmount: number;
  isReconcilable: boolean;
  entriesToReconcile: IntegrationTransactionEntry[];
  unreconciledEntries: IntegrationTransactionEntry[];
  removeEntry: (entry: string) => void;
  addEntry: (entry: string) => void;
}

export const ReconciliationTransactionEntries = (props: Props): React.JSX.Element => {
  const [entriesSource, setEntriesSource] = useState(ReconciliationEntrySources.Match);
  const propsWithSource = { ...props, entriesSource }

  return (
    <div className="mx-2 p-4">
      <EntrySourceButtons
        entriesSource={entriesSource}
        setEntriesSource={setEntriesSource}
      />
      <EntriesSelector { ...propsWithSource } />
    </div>
  );
};
