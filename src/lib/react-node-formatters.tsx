import { Tooltip } from "react-tooltip";
import React, { ReactNode } from "react";
import {symbolFormatTransaction, tooltipFormatterTransaction} from "@/lib/helpers";
import {Token} from "@/services/token_currencies_conversions";



export const reactNodeFormatterTransaction = (token: Token, nonce: string, separator: string = ''): ReactNode => {
    return (
        <React.Fragment key={nonce}>
            <Tooltip id={`tooltip-non-set-mapping-${nonce}`}
                     content={tooltipFormatterTransaction(token)}
            />
            <span data-tooltip-id={`tooltip-non-set-mapping-${nonce}`}
              className="text-base font-bold underline decoration-white">
                {symbolFormatTransaction(token)}
            </span>
            {separator}
        </React.Fragment>
    );
};