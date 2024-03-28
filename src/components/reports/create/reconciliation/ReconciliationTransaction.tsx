import classNames from "classnames";
import { AccountingLine, TransactionProps } from "@/services/transactions";

interface Props {
  transaction: TransactionProps;
}

export const ReconciliationTransaction = ({ transaction }: Props): React.JSX.Element => {
  const displayAccountingLine = (line: AccountingLine): React.JSX.Element => {
    let element;
    if (line.accountingType && line.amount) {
      element = (
        <>
          <p>{line.accountingType}: {line.amount}</p>
          {
            line?.resource ?
              <p>{line.resource.name} (Ref: {line.resource.reference})</p> :
            <></>
          }
        </>
      );
    } else {
      element = <p>Transaction has insufficient data to display</p>;
    }
    return element;
  }

  return (
    <>
      <div key={transaction.atomicTransactionId} className="mb-2">
        <li>
          <div className="flex outline-none py-1 px-3 w-full rounded-md col-span-12">
            <div className="flex-1 border border-gray-500 mx-2 px-2">
              <p>Network: {transaction.chain} - ID: {transaction.atomicTransactionId}</p>
              {transaction.amountIncoming ? <span>In: {transaction.amountIncoming} {transaction?.tokenIncoming?.assetMetadata?.code ?? "(token goes here)"}</span> : ""}
              {transaction.amountOutgoing ? <p>Out: {transaction.amountOutgoing} {transaction?.tokenOutgoing?.assetMetadata?.code ?? "(token goes here)"}</p> : ""}
            </div>
            <button className={classNames("rounded-md font-bold text-lg px-6 py-2", transaction?.accountingLines?.length ? "bg-sky-400 text-white" : "invisible")}>
              Ok
            </button>
            <div className="flex-1 border border-gray-500 mx-2 px-2">
              {transaction.accountingLines?.length ? transaction.accountingLines.map(displayAccountingLine): "No accounting lines"}
            </div>
          </div>
        </li>
      </div>
    </>
  );
};
