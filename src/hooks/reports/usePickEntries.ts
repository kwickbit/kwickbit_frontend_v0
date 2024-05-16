import { calculateTransactionAmount } from "@/lib/helpers";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { Direction, TransactionProps } from "@/services/transactions";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface Props {
  setIsReconcilable: Dispatch<SetStateAction<boolean>>;
  setUnreconciledEntries: Dispatch<SetStateAction<IntegrationTransactionEntry[]>>;
  transaction: TransactionProps;
  unreconciledEntries: IntegrationTransactionEntry[];
}

interface ReturnProps {
  checkIfReconcilable: () => void;
  pickedEntries: IntegrationTransactionEntry[];
  pickedEntriesAmount: number;
  pickEntry: (clickedEntryId: string) => void;
  setPickedEntriesAmount: Dispatch<SetStateAction<number>>;
  unpickEntry: (clickedEntryId: string) => void;
}

export const usePickEntries = ({
  setIsReconcilable,
  setUnreconciledEntries,
  transaction,
  unreconciledEntries,
}: Props): ReturnProps => {
  const [pickedEntries, setPickedEntries] = useState([] as IntegrationTransactionEntry[]);
  const [pickedEntriesAmount, setPickedEntriesAmount] = useState(0.0);

  const pickEntry = (clickedEntryId: string): void => {
    const clickedEntry = unreconciledEntries.find(
      entry => entry.entryId === clickedEntryId
    ) as IntegrationTransactionEntry;
    setUnreconciledEntries(unreconciledEntries.filter(entry => entry !== clickedEntry));
    setPickedEntries(pickedEntries.concat(clickedEntry));
  };

  const unpickEntry = (clickedEntryId: string): void => {
    const clickedEntry = pickedEntries.find(
      entry => entry.entryId === clickedEntryId
    ) as IntegrationTransactionEntry;

    setUnreconciledEntries(unreconciledEntries.concat(clickedEntry));
    setPickedEntries(pickedEntries.filter(entry => entry !== clickedEntry));
  }

  const checkIfReconcilableCallback = (): void => {
    const transactionAmount = calculateTransactionAmount(transaction);
    const tolerance = 0.05;
    const isDiscrepancyTolerable = Math.abs(
      (transactionAmount - pickedEntriesAmount) / transactionAmount
    ) <= tolerance;

    if ([Direction.Incoming, Direction.Outgoing].includes(transaction.direction)) {
      setIsReconcilable(isDiscrepancyTolerable);
    } else {
      const hasIncoming = pickedEntries.some(entry => entry.direction === Direction.Incoming);
      const hasOutgoing = pickedEntries.some(entry => entry.direction === Direction.Outgoing);
      setIsReconcilable(isDiscrepancyTolerable && hasIncoming && hasOutgoing);
    }
  };

  const checkIfReconcilable = useCallback(
    checkIfReconcilableCallback,
    [pickedEntries, pickedEntriesAmount, setIsReconcilable, transaction],
  );

  return {
    checkIfReconcilable,
    pickedEntries,
    pickedEntriesAmount,
    pickEntry,
    setPickedEntriesAmount,
    unpickEntry,
  };
};
