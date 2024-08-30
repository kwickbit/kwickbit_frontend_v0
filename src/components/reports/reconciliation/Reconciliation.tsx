import { ReconciledTransaction } from "@/services/reports/reconciliation"
import { ChainTransactionForReconciliation } from "./ChainTransactionForReconciliation";
import { ReconciliationEntry } from "./ReconciliationEntry";
import { calculateTransactionAmount, sumEntryAmounts } from "@/lib/helpers";

interface Props {
  reconciliation: ReconciledTransaction;
}

export const Reconciliation = ({ reconciliation }: Props): React.JSX.Element => {
  const transactionAmount = calculateTransactionAmount(reconciliation.transaction);
  const entriesAmount = sumEntryAmounts(reconciliation.matchingEntries)
  const excessAmountInTransaction = transactionAmount - entriesAmount;
  const excessPercentage = Math.abs(100 * excessAmountInTransaction / transactionAmount)

  return (
    <div className="flex outline-none pt-2 pb-6 w-full rounded-md col-span-12">
      <ChainTransactionForReconciliation transaction={reconciliation.transaction}/>
      <div className="flex flex-0 flex-col self-center px-2">
        <p>Excess amount in transaction:</p>
        <p>{excessAmountInTransaction.toFixed(6)} ({excessPercentage.toFixed(1)}%)</p>
      </div>
      <div className="flex-1">
        {reconciliation.matchingEntries.map(entry =>
          <div key={entry.entryId} className="border border-gray-500 p-2">
            <ReconciliationEntry entry={entry}/>
          </div>
        )}
      </div>
    </div>
  );
};
