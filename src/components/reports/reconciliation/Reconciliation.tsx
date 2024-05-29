import { IntegrationTransactionEntry, ReconciledTransaction } from "@/services/reports/reconciliation"
import { ChainTransactionForReconciliation } from "./ChainTransactionForReconciliation";
import { ReconciliationEntry } from "./ReconciliationEntry";
import { parseAmount } from "@/lib/helpers";

interface Props {
  reconciliation: ReconciledTransaction;
}

export const Reconciliation = ({ reconciliation }: Props): React.JSX.Element => {
  // This is repeated from the ReconciliationTransaction component
  // TODO: make it not be repeated
  const amountIncoming = parseAmount(reconciliation.transaction.amountIncoming);
  const amountOutgoing = parseAmount(reconciliation.transaction.amountOutgoing);
  const transactionAmount = Math.abs(amountIncoming - amountOutgoing);

  const sumAmounts = (total: number, entry: IntegrationTransactionEntry): number =>
    total + parseAmount(entry.reconvertedAmount);

  const entriesAmount = reconciliation.matchingEntries.reduce(sumAmounts, 0);
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
