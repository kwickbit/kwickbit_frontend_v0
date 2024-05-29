import { symbolFormatTransaction } from "@/lib/helpers";
import { IntegrationTransactionEntry } from "@/services/reports/reconciliation";
import classNames from "classnames";

interface Props {
  entry: IntegrationTransactionEntry;
  moveEntry?: (entry: string) => void;
  buttonText?: string;
}

export const ReconciliationEntry = ({ entry, moveEntry, buttonText }: Props): React.JSX.Element => {
  const placeholderAmount = `${entry.amountFromIntegration} ${entry.currency}`;

  return (
    <li className="block mb-2">
      <div className="flex justify-between">
        <div>
          <p>On {entry.accountingDate} to account: {entry.integrationAccountName} (#{entry.integrationAccountId})</p>
          <p>{entry.direction} amount: {entry.reconvertedAmount} {symbolFormatTransaction(entry.cryptoToken)} ({placeholderAmount})</p>
          <p>Ref: {entry.integrationTransactionLabel || '(none)'}</p>
          <p className="text-sm">Entered into integration at {entry.createdAt}</p>
        </div>
        <button
          className={classNames(
            buttonText ?
            "bg-sky-400 text-white rounded-md font-bold text-sm mt-2 px-2 h-6" :
            "invisible"
          )}
          value={entry.entryId}
          onClick={
            buttonText ?
            (event): void => (moveEntry as (value: string) => void)(event.currentTarget.value) :
            (): void => {}
          }
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
};
