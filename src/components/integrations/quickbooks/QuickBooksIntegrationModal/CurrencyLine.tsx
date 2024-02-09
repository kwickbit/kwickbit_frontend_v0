import CurrencySelect from "./CurrencySelect";
import {AvailableAccount, CurrencyMapping} from "@/services/integrations/quickbooks";
import { StellarLogo } from "@/components/common/AppIcon";
import { Tooltip } from "react-tooltip";
import { Info } from "@/components/common/AppIcon";
import React, { useEffect, useState } from "react";

interface Props {
  currencyMapping: CurrencyMapping;
  accountPayableOptions: AvailableAccount[] | undefined;
  accountReceivableOptions: AvailableAccount[] | undefined;
  bankOptions: AvailableAccount[] | undefined;
  onSelectionChange: (tokenCode: CurrencyMapping | undefined, accountType: string, selection: AvailableAccount) => void;
}

const CurrencyLine = ({
  currencyMapping,
  accountPayableOptions,
  accountReceivableOptions,
  bankOptions,
  onSelectionChange,
}: Props): React.JSX.Element => {
    const [selectedAccountsPayable, setSelectedAccountsPayable] = useState<AvailableAccount | null>(null);
    const [selectedAccountsReceivable, setSelectedAccountsReceivable] = useState<AvailableAccount | null>(null);
    const [selectedAccountBank, setSelectedAccountBank] = useState<AvailableAccount | null>(null);
    const [isCurrencyMismatch, setIsCurrencyMismatch] = useState(false);

    // Whenever an account selection changes, call the onSelectionChange callback to update the modal's state
    useEffect(() => {
        if (selectedAccountsPayable) {
            onSelectionChange(currencyMapping, 'accountsPayable', selectedAccountsPayable);
        }
    }, [selectedAccountsPayable, onSelectionChange, currencyMapping]);

    useEffect(() => {
        if (selectedAccountsReceivable) {
            onSelectionChange(currencyMapping, 'accountsReceivable', selectedAccountsReceivable);
        }
    }, [selectedAccountsReceivable, onSelectionChange, currencyMapping]);

    useEffect(() => {
        if (selectedAccountBank) {
            onSelectionChange(currencyMapping, 'bank', selectedAccountBank);
        }
    }, [selectedAccountBank, onSelectionChange, currencyMapping]);

    useEffect(() => {
        // Derive the currency identifiers from the selected options.
        const accountPayableCurrency = selectedAccountsPayable?.currencyRef.reference;
        const accountReceivableCurrency = selectedAccountsReceivable?.currencyRef.reference;
        const bankAccountCurrency = selectedAccountBank?.currencyRef.reference;

        // Check if all currencies are set and match each other.
        const allSelectionsMade = accountPayableCurrency && accountReceivableCurrency && bankAccountCurrency;

        // If all selections are made, then check if they match. Otherwise, there is no mismatch.
        const isCurrencyMismatch = allSelectionsMade
            ? accountPayableCurrency !== accountReceivableCurrency || accountReceivableCurrency !== bankAccountCurrency
            : false;

        setIsCurrencyMismatch(isCurrencyMismatch);
    }, [selectedAccountsPayable, selectedAccountsReceivable, selectedAccountBank]);

    return (
    <div className="py-4 mb-4 grid grid-cols-[180px,200px,200px,200px]">
      <>
        {currencyMapping.tokenMetadata.isNative ? (
          <div className="w-[105px] flex justify-center">
            <StellarLogo />
          </div>
        ) : (
          <>
            <div className="w-[105px] flex justify-center text-sm text-[#171A1F] text-wrap relative">
              {currencyMapping.tokenMetadata.code}
              <span
                data-tooltip-id={`help-${currencyMapping.tokenMetadata.issuer}`}
                className="absolute bottom-4 lg:top-0.5 -right-5 cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </span>
            </div>
            <Tooltip
              id={`help-${currencyMapping.tokenMetadata.issuer}`}
              place="right"
              variant="info"
            >
              {`issuer: ${currencyMapping.tokenMetadata.issuer}`}
            </Tooltip>
          </>
        )}
      </>
      <div className="flex items-center px-1">
        {currencyMapping.isIntegrationRefDefined ? (
            <span>{currencyMapping.integrationRef?.accountsPayable?.id}-{currencyMapping.integrationRef?.accountsPayable?.name} ({currencyMapping.integrationRef?.accountsPayable?.currencyRef.reference})</span>
        ) : (
            <CurrencySelect
                selected ={selectedAccountsPayable}
                setSelected={setSelectedAccountsPayable}
                options={accountPayableOptions}
                placeholder="Select an account"
            />
        )}
      </div>
      <div className="flex items-center px-1">
        {currencyMapping.isIntegrationRefDefined ? (
            <span>{currencyMapping.integrationRef?.accountsReceivable?.id}-{currencyMapping.integrationRef?.accountsReceivable?.name} ({currencyMapping.integrationRef?.accountsReceivable?.currencyRef.reference})</span>
        ) : (
            <CurrencySelect
              selected={selectedAccountsReceivable}
              setSelected={setSelectedAccountsReceivable}
              options={accountReceivableOptions}
              placeholder="Select an account"
            />
        )}
      </div>
      <div className="flex items-center px-1">
        {currencyMapping.isIntegrationRefDefined ? (
            <span>{currencyMapping.integrationRef?.bank?.id}-{currencyMapping.integrationRef?.bank?.name} ({currencyMapping.integrationRef?.bank?.currencyRef.reference})</span>
        ) : (
            <CurrencySelect
              selected={selectedAccountBank}
              setSelected={setSelectedAccountBank}
              options={bankOptions}
              placeholder="Select an account"
            />
        )}
      </div>
      {isCurrencyMismatch && (
        <div className="col-span-full bg-yellow-100 text-yellow-700 p-3" role="alert">
            Warning: The selected accounts do not have the same currency.
        </div>
      )}
    </div>
  );
};

export default CurrencyLine;
