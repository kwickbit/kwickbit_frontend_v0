import { Warning } from "../common/AppIcon";
import Link from "next/link";
import cn from "classnames";
import { CurrencyMapping } from "@/services/integrations/quickbooks";
import React from "react";
import {reactNodeFormatterTransaction} from "@/lib/react-node-formatters";

interface Props {
  nonSetMappings: CurrencyMapping[];
  shouldShow: boolean;
}

const WarningAlert = ({
  nonSetMappings,
  shouldShow,
}: Props): React.JSX.Element => {
  return (
    <div
      className={cn(
        "relative w-full py-4 px-2 mb-2 bg-[#ECB90D] shadow border text-white text-base font-bold flex items-center gap-2",
        { hidden: !shouldShow },
        { block: shouldShow }
      )}
    >
      <Warning />
      <span>
        {
          nonSetMappings.length === 1 ?
              `Current currency token is not set on integration mapping: ` :
              `Current currencies tokens are not set on integration mapping: `
        }
        {
          nonSetMappings.map((currencyMapping, index) => (
              reactNodeFormatterTransaction(currencyMapping.token, `transactions-page-warning-alert-${index}`, index < nonSetMappings.length - 1 ? ', ' : '')
          ))
        }

        <br/>
        {'Define mappings in '}
        <Link
            className="text-white text-base font-bold underline decoration-white"
            href="/integrations"
        >
          {'integration mapping'}
        </Link>
        {' section, in order to be able to push transactions involving'}
        {
          nonSetMappings.length === 1 ? ' this currency/token.' : ' these currencies/tokens.'
        }
      </span>
    </div>
  );
};

export default WarningAlert;
