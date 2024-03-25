import classNames from "classnames";
import { AccountingLine, Direction, TransactionProps } from "@/services/transactions";
import { AccountingLines } from "./AccountingLines";
import { ReconciliationTransaction } from "./ReconciliationTransaction";

interface Props {
  transaction: TransactionProps;
}

export const ReconciliationEntry = ({ transaction }: Props): React.JSX.Element => {
  const parseAmount = (amount: string): number => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? 0.0 : parsed;
  };

  const doFloatsMatch = (float1: number, float2: number): boolean => {
    const epsilon = 0.00001;
    return Math.abs(float1 - float2) < epsilon;
  };

  const calculateAmount = (lines: AccountingLine[]): number => {
    return lines.reduce(
      (total, line) => {
        return total + (line?.amountIncoming ?? 0.0) - (line?.amountOutgoing ?? 0.0)
      },
      0.0
    );
  };

  const checkIfReconcilable = (txn: TransactionProps): boolean => {
    const amountIncoming = parseAmount(txn.amountIncoming);
    const amountOutgoing = parseAmount(txn.amountOutgoing);
    const hasIncoming = !doFloatsMatch(amountIncoming, 0.0);
    const hasOutgoing = !doFloatsMatch(amountOutgoing, 0.0);
    const netAccountingAmount = calculateAmount(txn.accountingLines);
    const amountsMatch = doFloatsMatch(netAccountingAmount, amountIncoming - amountOutgoing);

    switch (txn.direction) {
      case Direction.Incoming:
        return amountsMatch && hasIncoming && !hasOutgoing;
      case Direction.Outgoing:
        return amountsMatch && !hasIncoming && hasOutgoing;
      case Direction.Swap:
        return amountsMatch && hasIncoming && hasOutgoing;
      default:
        return false;
    }
  };

  const hasAccountingLines = Boolean(transaction?.accountingLines?.length);
  const canBeReconciled = checkIfReconcilable(transaction);

  return (
    <li key={transaction.atomicTransactionId} className="block mb-2">
      <div className="flex outline-none py-1 px-3 w-full rounded-md col-span-12">
        <ReconciliationTransaction transaction={transaction} />
        <button
          className={classNames(
            "rounded-md font-bold text-lg px-6 py-2",
            canBeReconciled ? "bg-sky-400 text-white" : "invisible"
          )
        }>
          Ok
        </button>
        <AccountingLines
          canBeReconciled={canBeReconciled}
          hasAccountingLines={hasAccountingLines}
          lines={transaction.accountingLines}
        />
      </div>
    </li>
  );
};
