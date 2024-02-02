import { useQueryIntegrationInformation } from "@/hooks/oauth2-providers/intuit";
import Loader from "../Loader";
import PrimaryButton from "../PrimaryButton";
import useConnectToQuickbook from "@/hooks/useConnectToQuickbook";
import ServerError from "../ServerError";
import classNames from "classnames";
import Image from "next/image";
import {apiClient} from "@/lib/api-client";
import { v4 as uuidv4 } from "uuid";

const IntegrationsView: React.FC = (): React.JSX.Element => {
  const { handleConnectToQuickbook } = useConnectToQuickbook();

  const { data, isLoading, isError } = useQueryIntegrationInformation();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  const isConnected = data?.data?.message === "Found intuit integration";

  const getCurrencyMappings = async (): Promise<void> => {
    const currencyMappings = await apiClient.get('/currency-mappings/list?onlyNonMappedTokens=true', {});
    console.log('------currencyMappings: ', currencyMappings);
  };

  const getAvailableCurrencies = async (): Promise<void> => {
    const availableCurrencies = await apiClient.get('/get-available-currencies/QuickBooks');
    console.log('------availableCurrencies: ', availableCurrencies);
  }

  const addCurrencyMappings = async (): Promise<void> => {
    const currencyMappingsAddResponse = await apiClient.post('/currency-mappings/add', {
      mappings: [
        {
          chain: 'stellar',
          tokenMetadata: {
            isNative: true
          },
          integrationCurrencyRef: {something: 'not defined yet'},
        },
        {
          chain: 'stellar',
          tokenMetadata: {
            isNative: false,
            code: 'USD',
            issuer: '0x7785699EWFV52552'
          },
          integrationCurrencyRef: {something: 'not defined yet'},
        },
      ],
    });
    console.log('------currencyMappingsAddResponse: ', currencyMappingsAddResponse);
  };

  const fetchCurrencies = async (): Promise<void> => {
    const currencies = await apiClient.post('/fetch-currencies', {
      deduplicationId: uuidv4(),
      integrationProvider: 'QuickBooks',
    });
    console.log('------currenciesResponse: ', currencies);
  };

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-8">
        <div className="border rounded-md px-4 pt-2 pb-4 w-fit bg-white">
          <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
            <div>
              <Image
                src="/assets/quickbook-logo.png"
                alt="quickbooks"
                width={50}
                height={50}
              />
            </div>
            <div>
              <p className="text-base text-neutral-900 font-bold">Quickbooks</p>
              <p className="text-base text-neutral-500 font-bold">Accounting</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-4 h-64">
            <p className="text-base text-neutral-500 font-bold">
              {isConnected
                  ? "Connected to Quickbooks account"
                  : "Connecting a Quickbooks account"}
            </p>
            <PrimaryButton
                onClick={
                  isConnected
                      ? (): null => null
                      : (): Promise<void> => handleConnectToQuickbook()
                }
                className={classNames(
                    " text-[#21254EFF] w-fit py-3 px-1 rounded-xl text-base",
                    isConnected ? "bg-sky-500 cursor-not-allowed" : "bg-[#4ADDB6FF]"
                )}
            >
              {isConnected ? "Settings" : "Connect"}
            </PrimaryButton>

            <button onClick={getCurrencyMappings}>Get currency mappings</button>
            <button onClick={addCurrencyMappings}>Add currency mappings</button>

            <button onClick={fetchCurrencies}>Fetch currencies</button>
            <button onClick={getAvailableCurrencies}>Get Available currencies</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
