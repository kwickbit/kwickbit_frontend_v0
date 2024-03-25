import { AccountingLine } from "@/services/transactions";
import classNames from "classnames";
import { AccountingLineData } from "./AccountingLineData";
import { AddAccountingLines } from "./AddAccountingLines";

interface Props {
  canBeReconciled: boolean,
  hasAccountingLines: boolean,
  lines: AccountingLine[],
}

export const AccountingLines = ({ canBeReconciled, hasAccountingLines, lines }: Props): React.JSX.Element => {
  return (
    <div className={classNames("flex-1 border border-gray-500 mx-2 p-4", canBeReconciled && "bg-[#4ADDB6]")}>
      {
        hasAccountingLines ?
          lines.map(
            (line, index) =>
              <AccountingLineData
                key={line?.accountingType ?? "Unknown" + index}
                line={line}
              />
          ) :
          <AddAccountingLines
            transaction={transaction}
            accountingLines={accountingLinesIncoming}
            amount={transaction.amountIncoming}
            symbolAmount={transaction?.detail?.symbolIncoming as string}
            updateLine={updateLineIncoming}
            token={transaction.tokenIncoming as Token}
            tokenSymbol={transaction.detail?.symbolIncoming as string}
            handleDeleteLine={handleDeleteLineIncoming}
            handleAddNewLine={handleAddNewLineIncoming}
            accountingTypeOptions={[AccountingTransactionType.Income, AccountingTransactionType.Invoice, AccountingTransactionType.Swap]}
          />
      }
    </div>
  );
};
