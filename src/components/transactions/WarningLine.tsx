import {Direction, TransactionProps} from "@/services/transactions";
import { CurrencyMapping } from "@/services/integrations/quickbooks";
import { YellowWarning } from "@/components/common/AppIcon";
import { reactNodeFormatterTransaction } from "@/lib/react-node-formatters";
import React, {useMemo} from "react";
import {keyFormatTransaction} from "@/lib/helpers";
import {Token} from "@/services/token_currencies_conversions";


interface Props {
    transaction: TransactionProps;
    nonSetMappings: CurrencyMapping[];
}

export const WarningLine = ({transaction, nonSetMappings}: Props): React.JSX.Element => {
    const nonSetMappedTokensFromTransaction = useMemo((): Token[] => {
        const nonMappedTokens = nonSetMappings.filter(tokenMapping => tokenMapping.token.chain === transaction?.tokenIncoming?.chain || tokenMapping.token.chain === transaction?.tokenOutgoing?.chain)
            .map(tokenMapping => keyFormatTransaction(tokenMapping.token));

        const tokensToCheck = [];
        if (transaction?.direction === Direction.Incoming) tokensToCheck.push(transaction.tokenIncoming as Token);
        else if (transaction?.direction === Direction.Outgoing) tokensToCheck.push(transaction.tokenOutgoing as Token);
        else if (transaction?.direction === Direction.Swap) {
            tokensToCheck.push(transaction.tokenIncoming as Token);
            tokensToCheck.push(transaction.tokenOutgoing as Token);
        }

        return tokensToCheck.filter(token => nonMappedTokens.includes(keyFormatTransaction(token)));
    }, [nonSetMappings, transaction]);

    return (
        <>
            {nonSetMappedTokensFromTransaction.length > 0 && (
                <div className="absolute bottom-2 right-4 text-[#ECB90D] text-sm font-bold space-y-0.5">
                    <div className="flex justify-end">
                        <YellowWarning />
                    </div>
                    {'Configure Mapping for token '}
                    {nonSetMappedTokensFromTransaction.map((token, idx) => reactNodeFormatterTransaction(token, transaction.atomicTransactionId, `warning-${transaction.atomicTransactionId}-${idx}`))}
                    {' to integrate this transaction'}
                </div>
            )}
        </>
    );
};