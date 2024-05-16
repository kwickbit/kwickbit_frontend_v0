import { Dispatch, SetStateAction, useEffect } from "react";
import { usePickEntries } from "@/hooks/reports/usePickEntries";
import { calculateTransactionAmount, sumEntryAmounts } from "@/lib/helpers";
import { TransactionProps } from "@/services/transactions";
import { IntegrationTransactionEntry, ReconciliationEntrySources } from "@/services/reports/reconciliation";
import { MatchReconciliationEntries } from "./MatchReconciliationEntries";
import { PickReconciliationEntries } from "./PickReconciliationEntries";

interface Props {
  entriesSource: ReconciliationEntrySources;
  isReconcilable: boolean;
  matchingEntries: IntegrationTransactionEntry[];
  setEntriesToReconcile: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  setIsReconcilable: Dispatch<SetStateAction<boolean>>;
  setUnreconciledEntries: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  transaction: TransactionProps;
  unreconciledEntries: IntegrationTransactionEntry[];
}

export const EntriesSelector = ({
  entriesSource,
  isReconcilable,
  matchingEntries,
  setEntriesToReconcile,
  setIsReconcilable,
  setUnreconciledEntries,
  transaction,
  unreconciledEntries,
}: Props): React.JSX.Element => {
  const {
    checkIfReconcilable,
    pickedEntries,
    pickedEntriesAmount,
    pickEntry,
    setPickedEntriesAmount,
    unpickEntry,
  } = usePickEntries(
    { setIsReconcilable, setUnreconciledEntries, transaction, unreconciledEntries }
  );

  useEffect(
    () => {
      if (entriesSource === ReconciliationEntrySources.Match) {
        setEntriesToReconcile(matchingEntries);
        const matchingTotalAmount = sumEntryAmounts(matchingEntries);
        const transactionAmount = calculateTransactionAmount(transaction);
        setIsReconcilable(matchingTotalAmount === transactionAmount);
      } else if (entriesSource === ReconciliationEntrySources.Pick) {
        setEntriesToReconcile(pickedEntries);
        setPickedEntriesAmount(sumEntryAmounts(pickedEntries));
        checkIfReconcilable();
      }
    }, [
      checkIfReconcilable,
      entriesSource,
      matchingEntries,
      pickedEntries,
      setEntriesToReconcile,
      setIsReconcilable,
      setPickedEntriesAmount,
      transaction,
    ]
  );

  switch (entriesSource) {
    case ReconciliationEntrySources.Match:
      return <MatchReconciliationEntries
        matchingEntries={matchingEntries}
        transaction={transaction}
      />;
    case ReconciliationEntrySources.Pick:
      return <PickReconciliationEntries
        isReconcilable={isReconcilable}
        pickEntry={pickEntry}
        pickedEntries={pickedEntries}
        pickedEntriesAmount={pickedEntriesAmount}
        transaction={transaction}
        unpickEntry={unpickEntry}
        unreconciledEntries={unreconciledEntries}
      />;
    case ReconciliationEntrySources.Create:
      return <div className="mt-6">
        Placeholder for a component to create an Entry (pending the backend)
      </div>;
  }
};
