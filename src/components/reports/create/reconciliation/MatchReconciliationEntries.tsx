import classNames from "classnames";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import { TransactionProps } from "@/services/transactions";
import { calculateTransactionAmount, sumEntryAmounts } from "@/lib/helpers";
import { ReconciliationEntry } from "@/components/reports/reconciliation/ReconciliationEntry";

interface Props {
  matchingEntries: IntegrationTransactionEntry[];
  transaction: TransactionProps;
}

export const MatchReconciliationEntries = ({
  matchingEntries,
  transaction
}: Props): React.JSX.Element => {
  if (matchingEntries.length === 0) {
    return <div className="mt-6">
      <p>No entries were found matching this transaction. Please pick existing entries or create new ones.</p>
    </div>;
  }

  const matchingEntriesAmount = sumEntryAmounts(matchingEntries);
  const transactionAmount = calculateTransactionAmount(transaction);
  const discrepancy = transactionAmount - matchingEntriesAmount;
  const margin = Math.abs(100 * discrepancy / transactionAmount);

  return <div className={classNames("w-full mt-6 p-3", margin < 5 && "bg-[#4ADDB6]")}>
    <p>Amount left to reconcile: {discrepancy.toFixed(6)} ({margin.toFixed(1)}%)</p>
    <div className="flex-1 border border-gray-500 px-4 py-2">
      <h5 className="pb-4">
        The {
          matchingEntries.length === 1
            ? 'entry below matches'
            : matchingEntries.length + ' entries below match'
        } this transaction&apos;s ID
      </h5>
      <ul className="mt-2 w-full divide-y-4">
        {matchingEntries.map(entry =>
          <ReconciliationEntry key={entry.entryId} entry={entry} />
        )}
      </ul>
    </div>
  </div>;
};
