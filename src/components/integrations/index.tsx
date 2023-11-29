import React from "react";
import PrimaryButton from "../PrimaryButton";
import { useMutationIntegrationsOAuth2CallbackIntuit } from "@/hooks/oauth2-providers/intuit";

const clientId = encodeURIComponent(process.env.NEXT_PUBLIC_API_QUICKBOOK_CLIENT_ID as string);
const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_API_QUICKBOOK_REDIRECT_URI as string);
const scope = encodeURIComponent(process.env.NEXT_PUBLIC_API_QUICKBOOK_SCOPE as string);
import { apiClient } from "@/lib/api-client";

const Integration: React.FC = (): React.JSX.Element => {
  const { mutate } = useMutationIntegrationsOAuth2CallbackIntuit();

  const connectQuickbook = async (): Promise<void> => {
    const state = (await apiClient.post('/integrations/intuit/request-state')).data.state;

    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;

    // Open a new window
    const oauthWindow = window.open(
        authUrl,
        'oauth2Popup',
        'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    // Function to check the pop-up window for the auth code
    const checkPopup = (): void => {
      try {
        // Check if the pop-up window is closed
        if (!oauthWindow || oauthWindow?.closed) {
          clearInterval(checkInterval);
        }

        // Check if the URL has the code parameter
        const popupUrl = new URL(oauthWindow?.location.href as string);
        const code = popupUrl.searchParams.get("code");
        const state = popupUrl.searchParams.get("state");
        if (code && state) {
          clearInterval(checkInterval);
          oauthWindow?.close();
          mutate({code, state});
        }
      } catch (_) {
        // eslint-disable-next-line no-empty
      }
    };

    // Set an interval to periodically check the pop-up window
    const checkInterval = setInterval(checkPopup, 1000);
  };


  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-8">
        <div className="border rounded-md px-4 pt-2 pb-4 w-fit">
          <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
            <div>
              <img src="/assets/quickbook-logo.png" alt="quickbooks" />
            </div>
            <div>
              <p className="text-base text-neutral-900 font-bold">Quickbooks</p>
              <p className="text-base text-neutral-500 font-bold">Accounting</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-4 px-4 h-64">
            <p className="text-base text-neutral-500 font-bold">
              Connecting a Quickbooks account
            </p>
            <PrimaryButton
              onClick={connectQuickbook}
              className="bg-[#4ADDB6FF] text-[#21254EFF] w-fit py-3 px-1 rounded-xl text-base"
            >
              Connect
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
