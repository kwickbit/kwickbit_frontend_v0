import { TransactionProps } from "@/services/transactions";
import { ReconciliationEntry } from "./ReconciliationEntry";

interface Props {
  transactions: TransactionProps[];
}

export const ReconciliationEntries = ({ transactions }: Props): React.JSX.Element => {
  return (
    <div className="col-span-1 flex items-center mx-12 my-6">
      <ul className="w-full">
        {transactions.map(transaction => (
          <ReconciliationEntry
            key={transaction.atomicTransactionId}
            transaction={transaction}
          />)
        )}
      </ul>
    </div>
  );
};
