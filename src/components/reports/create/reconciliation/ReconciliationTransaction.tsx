import { TransactionProps } from "@/services/transactions";

interface Props {
  transaction: TransactionProps;
}

export const ReconciliationTransaction = ({ transaction }: Props): React.JSX.Element => {
  return (
    <div className="flex-1 border border-gray-500 mx-2 px-2">
      <p>Network: {transaction.chain} - ID: {transaction.atomicTransactionId}</p>
      {transaction.amountIncoming ? <span>In: {transaction.amountIncoming} {transaction?.tokenIncoming?.assetMetadata?.code ?? "(token goes here)"}</span> : ""}
      {transaction.amountOutgoing ? <p>Out: {transaction.amountOutgoing} {transaction?.tokenOutgoing?.assetMetadata?.code ?? "(token goes here)"}</p> : ""}
    </div>
  );
};
