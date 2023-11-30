import {
  useMutationIntegrationsOAuth2CallbackIntuit,
  useMutationRequestState,
} from "./oauth2-providers/intuit";
import { toast } from "react-toastify";

const clientId = encodeURIComponent(
  process.env.NEXT_PUBLIC_API_QUICKBOOK_CLIENT_ID!
);
const redirectUri = encodeURIComponent(
  process.env.NEXT_PUBLIC_API_QUICKBOOK_REDIRECT_URI!
);
const scope = encodeURIComponent(process.env.NEXT_PUBLIC_API_QUICKBOOK_SCOPE!);

interface ReturnProps {
  handleConnecToQuickbook: () => Promise<void>;
}

const useConnectToQuickbook = (): ReturnProps => {
  const OAuth2CallbackIntuit = useMutationIntegrationsOAuth2CallbackIntuit();
  const requestState = useMutationRequestState();

  const handleConnecToQuickbook = async (): Promise<void> => {
    requestState.mutate(undefined, {
      onSuccess: (data) => {
        const { state } = data;
        const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;

        // Open a new window
        const oauthWindow = window.open(
          authUrl,
          "oauth2Popup",
          "width=500,height=600,scrollbars=yes,resizable=yes"
        );

        // Function to check the pop-up window for the auth code
        const checkPopup = (): void => {
          try {
            // Check if the pop-up window is closed
            if (!oauthWindow || oauthWindow.closed) {
              clearInterval(checkInterval);
            }

            // Check if the URL has the code parameter
            const popupUrl = new URL(oauthWindow?.location.href as string);
            const code = popupUrl.searchParams.get("code");
            const state = popupUrl.searchParams.get("state");
            if (code && state) {
              clearInterval(checkInterval);
              OAuth2CallbackIntuit.mutate(
                { code, state },
                {
                  onSuccess: () => {
                    toast.success("Quickbook account connected successfully");
                    oauthWindow?.close();
                  },
                  onError: (error) => {
                    toast.error(
                      error?.message ??
                        "There was an error trying to connect your Quickbook account, please try again"
                    );
                    oauthWindow?.close();
                  },
                }
              );
            }
          } catch (_) {
            // eslint-disable-next-line no-empty
          }
        };

        // Set an interval to periodically check the pop-up window
        const checkInterval = setInterval(checkPopup, 1000);
      },
      onError: (error) => {
        toast.error(error?.message ?? "Something went wrong, please try again");
      },
    });
  };

  return { handleConnecToQuickbook };
};

export default useConnectToQuickbook;
