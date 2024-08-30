import { Dispatch, SetStateAction, useState } from "react";
import { type IntegrationTransactionEntry, ReconciliationEntrySources } from "@/services/reports/reconciliation";
import { TransactionProps } from "@/services/transactions";
import { EntriesSelector } from "@/components/reports/create/reconciliation/EntriesSelector";
import { EntrySourceButtons } from "@/components/reports/create/reconciliation/EntrySourceButtons";

interface Props {
  isReconcilable: boolean;
  setEntriesToReconcile: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  setIsReconcilable: Dispatch<SetStateAction<boolean>>;
  setUnreconciledEntries: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  transaction: TransactionProps;
  unreconciledEntries: IntegrationTransactionEntry[];
}

export const ReconciliationTransactionEntries = (props: Props): React.JSX.Element => {
  const { transaction, unreconciledEntries } = props;

  const matchingEntries = unreconciledEntries.filter(
    entry => entry.integrationTransactionLabel === transaction.atomicTransactionId
  );

  const defaultEntriesSource = matchingEntries.length > 0
    ? ReconciliationEntrySources.Match
    : ReconciliationEntrySources.Pick;

  const [entriesSource, setEntriesSource] = useState(defaultEntriesSource);
  const selectorProps = { ...props, entriesSource, matchingEntries };

  return (
    <div className="mx-2 p-4">
      <EntrySourceButtons
        entriesSource={entriesSource}
        setEntriesSource={setEntriesSource}
      />
      <EntriesSelector {...selectorProps} />
    </div>
  );
};
