import { TransactionProps } from "@/services/transactions";
import { ReconciliationTransaction } from "./ReconciliationTransaction";

interface Props {
  transactions: TransactionProps[];
}

export const ReconciliationTransactionList = ({ transactions }: Props): React.JSX.Element => {
  return (
    <div className="col-span-1 flex items-center mx-12 my-6">
      <ul className="w-full">
        {transactions.map(transaction => (
          <ReconciliationTransaction
            key={transaction.atomicTransactionId}
            transaction={transaction}
          />)
        )}
      </ul>
    </div>
  );
};
