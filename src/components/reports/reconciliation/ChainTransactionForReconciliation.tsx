import { symbolFormatTransaction } from "@/lib/helpers";
import { Token } from "@/services/token_currencies_conversions";
import { TransactionProps } from "@/services/transactions";

interface Props {
  transaction: TransactionProps;
}

export const ChainTransactionForReconciliation = ({ transaction }: Props): React.JSX.Element => {
  return (
    <div className="flex-1 border border-gray-500 px-2">
      <p>Network: {transaction.chain} - ID: {transaction.atomicTransactionId}</p>
      {transaction.amountIncoming ? <span>In: {transaction.amountIncoming} {symbolFormatTransaction(transaction?.tokenIncoming as Token)}</span> : ""}
      {transaction.amountOutgoing ? <p>Out: {transaction.amountOutgoing} {symbolFormatTransaction(transaction?.tokenOutgoing as Token)}</p> : ""}
    </div>
  );
};
