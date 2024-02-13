import { Tooltip } from "react-tooltip";
import React, { ReactNode } from "react";
import {symbolFormatTransaction, tooltipFormatterTransaction} from "@/lib/helpers";
import {Token} from "@/services/token_currencies_conversions";


export const reactNodeFormatterTransaction = (token: Token, atomicTransactionId: string, nonce: string): ReactNode => {
    return (
        <React.Fragment >
            <Tooltip id={`tooltip-non-set-mapping-${atomicTransactionId}-${nonce}`}
                     content={tooltipFormatterTransaction(token)}
            />
            <span data-tooltip-id={`tooltip-non-set-mapping-${atomicTransactionId}-${nonce}`}
              className="text-base font-bold underline decoration-white">
                {symbolFormatTransaction(token)}
            </span>
        </React.Fragment>
    );
};