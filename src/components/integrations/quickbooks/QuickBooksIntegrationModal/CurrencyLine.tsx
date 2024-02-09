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
  onRadioSelectionChange: (currencyMapping: CurrencyMapping | undefined, usePlaceholderCurrency: boolean) => void;
}

const CurrencyLine = ({
  currencyMapping,
  accountPayableOptions,
  accountReceivableOptions,
  bankOptions,
  onSelectionChange,
  onRadioSelectionChange,
}: Props): React.JSX.Element => {
    const [selectedAccountsPayable, setSelectedAccountsPayable] = useState<AvailableAccount | null>(null);
    const [selectedAccountsReceivable, setSelectedAccountsReceivable] = useState<AvailableAccount | null>(null);
    const [selectedAccountBank, setSelectedAccountBank] = useState<AvailableAccount | null>(null);
    const [isCurrencyMismatch, setIsCurrencyMismatch] = useState(false);
    const [usePlaceholderCurrencyWithinIntegration, setUsePlaceholderCurrencyWithinIntegration] = useState<boolean | null>(null);

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

    const onRadioChange = (usePlaceholder: boolean): void => {
        setUsePlaceholderCurrencyWithinIntegration(usePlaceholder);
        onRadioSelectionChange(currencyMapping, usePlaceholder);
    };

    const key = currencyMapping?.tokenMetadata.isNative ? `${currencyMapping.chain}-native` : `${currencyMapping?.chain}-${currencyMapping?.tokenMetadata.code}-${currencyMapping?.tokenMetadata.issuer}`;

    return (
        <div className="py-4 mb-4 grid grid-cols-[180px,200px,200px,200px]">
            <>
                {currencyMapping.tokenMetadata.isNative ? (
                    <div className="w-[105px] flex justify-center">
                        <StellarLogo/>
                    </div>
                ) : (
                    <>
                        <div className="w-[105px] flex justify-center text-sm text-[#171A1F] text-wrap relative">
                            {currencyMapping.tokenMetadata.code}
                            <span
                                data-tooltip-id={`help-${currencyMapping.tokenMetadata.issuer}`}
                                className="absolute bottom-4 lg:top-0.5 -right-5 cursor-pointer"
                            >
                <Info className="w-4 h-4"/>
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
                        selected={selectedAccountsPayable}
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
            <div className="mt-4 col-span-4 flex items-center justify-between">
                <div className="text-base font-semibold flex items-center gap-1">
                    {currencyMapping.isIntegrationRefDefined ? (
                        <>How this {currencyMapping.tokenMetadata.isNative ? 'native crypto currency' : 'crypto token'} is handled:</>
                    ) : (
                        <>How do you want to handle this {currencyMapping.tokenMetadata.isNative ? 'native crypto currency' : 'crypto token'}?</>
                    )}
                    <span data-tooltip-id={`tooltip_handle_currency_${key}`} className="bottom-4 right-1 cursor-pointer">
                        <Info className="w-4 h-4"/>
                    </span>
                    <Tooltip
                        id={`tooltip_handle_currency_${key}`}
                        place="right"
                        variant="info"
                    >
                        {currencyMapping.isIntegrationRefDefined ? (
                            "This section displays how the selected token is currently mapped in QuickBooks."
                        ) : (
                            <>
                                Select &apos;Map to an alternative currency&apos; if you prefer to represent this token using a placeholder currency in QuickBooks.
                                <br />
                                Choose &apos;Convert to my home currency&apos; to record transactions in a fiat currency, using the current exchange rate at the time of the transaction.
                            </>
                        )}
                    </Tooltip>
                </div>


                <div className="flex items-center">

                    {currencyMapping.isIntegrationRefDefined ? (
                        <div className="flex items-center">
                            {usePlaceholderCurrencyWithinIntegration ? 'Map to placeholder currency' : 'Convert to fiat managed currency' + ' ' + currencyMapping.integrationRef?.bank?.currencyRef.reference}
                        </div>
                    ) : (
                        <>
                            <label className="flex items-center mr-4">
                                <input type="radio"
                                       name={`currency_handling_${key}`}
                                       value="placeholder"
                                       checked={usePlaceholderCurrencyWithinIntegration === true}
                                       onChange={(): void => onRadioChange(true)}
                                />
                                <span className="ml-2">Map to an placeholder currency</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio"
                                    name={`currency_handling_${key}`}
                                    value="convert"
                                    checked={usePlaceholderCurrencyWithinIntegration === false}
                                    onChange={(): void => onRadioChange(false)}
                                />
                                <span className="ml-2">Convert to fiat managed currency</span>
                            </label>
                        </>
                    )}
                </div>
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
