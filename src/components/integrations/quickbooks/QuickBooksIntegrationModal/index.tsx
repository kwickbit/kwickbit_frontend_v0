import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CenterModal from "@/components/CenterModal";
import useQuickbookIntegrationModal from "@/hooks/integrations/useQuickbookIntegrationModal";
import Loader from "@/components/Loader";
import CurrencyLine from "./CurrencyLine";
import React, {useCallback, useEffect, useState} from "react";
import {
  AvailableAccount,
  AvailableAccountMappedToCurrency,
  CurrencyMapping
} from "@/services/integrations/quickbooks";
import {useMutationAddCurrencyMappings} from "@/hooks/integrations/quickbooks";

interface Props {
  shouldOpenModal: UseBooleanReturnProps;
}


const QuickBooksSettingsModal = ({
  shouldOpenModal
}: Props): React.JSX.Element => {
  const {
    currencyMappings,
    accountsPayables,
    accountsReceivables,
    accountBanks,
    isLoading,
    isError,
  } = useQuickbookIntegrationModal({ shouldOpenModal });
  const [accountsSelections, setAccountsSelections] = useState<Record<string, AvailableAccountMappedToCurrency>>({});
  const addCurrencyMappingsMutation = useMutationAddCurrencyMappings();

  if (isError) {
    shouldOpenModal.onFalse();
  }

  useEffect(() => {
    if (!shouldOpenModal.value) {
      setAccountsSelections({});
    }
  }, [shouldOpenModal.value, setAccountsSelections]);

  const handleSelectionChange = useCallback((currencyMapping: CurrencyMapping | undefined, accountType: string, selection: AvailableAccount): void => {
    const key = currencyMapping?.tokenMetadata.isNative ? `${currencyMapping.chain}-NATIVE` : `${currencyMapping?.chain}-${currencyMapping?.tokenMetadata.code}-${currencyMapping?.tokenMetadata.issuer}`
    setAccountsSelections((prevSelections) => ({
      ...prevSelections,
      [key]: {
        ...prevSelections[key],
        chain: currencyMapping?.chain as string,
        ...(currencyMapping?.tokenMetadata ? {tokenMetadata: currencyMapping.tokenMetadata} : {}),
        integrationRef: {
          [accountType]: {
            id: selection.id,
          },
          ...prevSelections[key]?.integrationRef,
        },
      },
    }));
  }, []);

  const onSubmit = (): void => {
    addCurrencyMappingsMutation.mutate(Object.values(accountsSelections));
    shouldOpenModal.onFalse();
  };

  const isSubmitDisabled = (): boolean => {
    const isAccountsSelectionsEmpty = Object.keys(accountsSelections).length === 0;
    const isThereAnyOnlyPartiallyDefined = Object.values(accountsSelections).some(accountsSelection => {
      const receivableDefined = accountsSelection.integrationRef?.accountsReceivable !== undefined;
      const payableDefined = accountsSelection.integrationRef?.accountsPayable !== undefined;
      const bankDefined = accountsSelection.integrationRef?.bank !== undefined;

      // Count the number of truthy values among receivableDefined, payableDefined, and bankDefined
      const countDefined = [receivableDefined, payableDefined, bankDefined].filter(Boolean).length;

      // Check if one or two are defined, but not all three
      return countDefined > 0 && countDefined < 3;
    });
    return isAccountsSelectionsEmpty || isThereAnyOnlyPartiallyDefined;
  };

  return (
    <CenterModal
      modalClassNames="max-w-fit max-h-[calc(100%-54px)] "
      show={shouldOpenModal.value}
      closeModal={shouldOpenModal.onFalse}
    >
      <div className="rounded pt-4 pb-6 px-8 bg-white border-0 shadow-lg relative outline-none focus:outline-none">
        {isLoading && <Loader/>}
          <>
            <h2 className="text-4xl font-bold text-center text-[#21254E] text-lexend mb-9">
              Currency mapping
            </h2>
            <div className="py-4 grid grid-cols-[180px,170px,170px,170px]">
              <p className="text-base text-bold">
                TOKENS
              </p>
              <p className="text-base text-bold text-center">
                A/P Account
              </p>
              <p className="text-base text-bold text-center">
                A/R Account
              </p>
              <p className="text-base text-bold text-center">
                Bank Account
              </p>
            </div>
            <div className="space-y-4 mb-6">
            {currencyMappings?.map((mapping, idx) => (
              <CurrencyLine
                key={idx}
                currencyMapping={mapping}
                accountPayableOptions={accountsPayables}
                accountReceivableOptions={accountsReceivables}
                bankOptions={accountBanks}
                onSelectionChange={handleSelectionChange}
              />
            ))}
            </div>
            <div className="text-sm mb-2 whitespace-pre-line">
              {`
                  QuickBooks doesn't natively support Stellar or adding new currencies..

                  To address this situation, please select an exotic currency on QuickBooks that you will use as Stellar.
                  KwickBit will take charge of using the right conversion rate at each upload synchronization.             
              `}
            </div>
            <div className="px-14 flex justify-end">
              <button
                  className={`bg-[#4ADDB6] rounded-xl text-[#082C22] text-sm px-5 py-3 flex items-center gap-2 
      ${isSubmitDisabled() ? 'hover:cursor-not-allowed opacity-50' : 'hover:scale-95'}`}
                disabled={isSubmitDisabled()}
                onClick={onSubmit}
              >
                Save
              </button>
            </div>
          </>
      </div>
    </CenterModal>
  );
};

export default QuickBooksSettingsModal;
