import { useEffect, useState } from "react";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CenterModal from "@/components/CenterModal";
import { StellarLogo } from "@/components/common/AppIcon";
import CurrencySelect, { SelectOption } from "./CurrencySelect";
import useIntegrationSettingsModal from "@/hooks/integrations/useIntegrationSettingsModal";
import Loader from "@/components/Loader";
import { CreateCurrencyMappingAPIProps } from "@/services/integrations";

interface Props {
  editIntegration: UseBooleanReturnProps;
  currency: string | undefined;
  token: string | undefined;
}

const IntegrationSettingsModal = ({
  editIntegration,
  currency = "stellar",
  token = "TRT"
}: Props): JSX.Element => {
  const { saving, quickbookCurrencies, isLoading, isError, onSave } =
    useIntegrationSettingsModal();

  const [currencyOptions, setCurrencyOptions] = useState<SelectOption[]>([]);
  const [tokenOptions, setTokenOptions] = useState<SelectOption[]>([]);
  const [currencyOption, setCurrencyOption] = useState<SelectOption>();
  const [tokenOption, setTokenOption] = useState<SelectOption>();

  useEffect(() => {
    if (quickbookCurrencies) {
      const currencies = quickbookCurrencies.currencies;
      const arr: SelectOption[] = [{ title: "QuickBooks currency" }];
      for (const currency of currencies) {
        arr.push({
          title: currency,
          value: currency,
        });
      }
      setCurrencyOptions(arr);
      setCurrencyOption(arr[0]);

      setTokenOptions(arr);
      setTokenOption(arr[0]);
    }
  }, [quickbookCurrencies]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    editIntegration.onFalse();
  }

  const onSaveMapping = ():void => {
    if( currencyOption?.value && tokenOption?.value ) {
      const apiProps: CreateCurrencyMappingAPIProps = {
        currency: {
          name: currency,
          quickCurrency: currencyOption.value,
        },
        token: {
          name: token,
          quickCurrency: tokenOption.value
        }
      };

      onSave(apiProps);
  
    }
  }

  return (
    <CenterModal
      modalClassNames="max-w-xl max-h-[calc(100%-54px)] "
      show={editIntegration.value}
      closeModal={editIntegration.onFalse}
    >
      <div className="rounded pt-4 pb-6 px-8 bg-white border-0 shadow-lg relative outline-none focus:outline-none">
        {isLoading && <Loader />}
        {quickbookCurrencies && (
          <>
            <h2 className="text-4xl font-bold text-center text-[#21254E] text-lexend mb-9">
              Currency mapping
            </h2>

            <div className="pl-10 pr-16 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="w-[105px] flex justify-center">
                  <StellarLogo />
                </div>
                <CurrencySelect
                  selected={currencyOption}
                  setSelected={setCurrencyOption}
                  options={currencyOptions}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[105px] flex justify-center text-sm text-[#171A1F]">
                  Token {token}
                </div>
                <CurrencySelect
                  selected={tokenOption}
                  setSelected={setTokenOption}
                  options={tokenOptions}
                />
              </div>
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
                className="bg-[#4ADDB6] rounded-xl text-[#082C22] text-sm px-5 py-3 flex items-center gap-2 hover:scale-95"
                disabled={saving || !currencyOption?.value || !tokenOption?.value || currencyOption.value === tokenOption.value }
                onClick={():void => onSaveMapping()}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </CenterModal>
  );
};

export default IntegrationSettingsModal;
