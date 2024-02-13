import CollectionLine from "@/components/transactions/EditTransactionModal/CollectionLine";
import {AccountingLine, AccountingTransactionType, Direction, TransactionProps} from "@/services/transactions";
import { CirclePlus } from "@/components/common/AppIcon";
import React, {useMemo} from "react";
import {Token} from "@/services/token_currencies_conversions";


interface Props {
    transaction: TransactionProps;
    accountingLines: AccountingLine[];
    amount: string;
    symbolAmount: string;
    updateLine: (_: number, __: AccountingLine) => void;
    handleDeleteLine: (_: number) => void;
    handleAddNewLine: () => void;
    accountingTypeOptions: AccountingTransactionType[];
    token: Token;
    tokenSymbol: string;
}


export const AccountingLines = ({
                                    accountingLines,
                                    transaction,
                                    amount,
                                    symbolAmount,
                                    updateLine,
                                    handleDeleteLine,
                                    handleAddNewLine,
                                    accountingTypeOptions,
                                    token,
                                    tokenSymbol,
                                }: Props): React.JSX.Element => {
    const isSwap = useMemo<boolean>(() => transaction.direction === Direction.Swap, [transaction]);

    return (
        <div className="pb-3">
            <div className="grid grid-cols-[2fr,4.1fr] mb-2 gap-1">
                <div className="flex items-center text-sm text-[#171A1F] font-bold py-4">
                    Transaction Value
                </div>
                <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
                    <div className="flex justify-center items-center text-sm text-[#171A1F] font-bold py-4">
                        Type
                    </div>
                    <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
                        Choose expense
                    </div>
                    <div className="flex justify-center items-center text-sm text-[#565D6D] font-bold py-4">
                        Amount
                    </div>
                    <div/>
                </div>
            </div>
            <div className="grid grid-cols-[2fr,4.1fr] mt-3 gap-1 relative">
                <div>
                  <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-7">
                    {`${amount} ${symbolAmount}`}
                  </span>
                </div>
                <div className="relative space-y-3">
                    {accountingLines && accountingLines.map((accountingLine, idx) => (
                        <CollectionLine
                            key={idx}
                            colIdx={idx}
                            transaction={transaction as TransactionProps}
                            accountingLine={accountingLine}
                            updateLine={updateLine}
                            handleDeleteLine={handleDeleteLine}
                            accountingTypeOptions={accountingTypeOptions}
                            tokenSymbol={tokenSymbol}
                            token={token}
                        />
                    ))}
                    {(transaction.status === 'NonPublished' && !isSwap) && (
                        <button
                            className="absolute -bottom-12 right-0.5 w-7 h-8 flex items-center justify-center"
                            onClick={(): void => handleAddNewLine()}
                        >
                            <CirclePlus className="w-6 h-6"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};