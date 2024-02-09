import { useQueryClient } from "@tanstack/react-query";
import { useMutationRequestState } from "./index";
import { toast } from "react-toastify";

const clientId = encodeURIComponent(
  process.env.NEXT_PUBLIC_API_QUICKBOOK_CLIENT_ID!
);
const redirectUri = encodeURIComponent(
  process.env.NEXT_PUBLIC_API_QUICKBOOK_REDIRECT_URI!
);
const scope = encodeURIComponent(process.env.NEXT_PUBLIC_API_QUICKBOOK_SCOPE!);

interface ReturnProps {
  handleConnectToQuickbook: () => Promise<void>;
}

const useConnectToQuickbook = (): ReturnProps => {
  const requestState = useMutationRequestState();

  const queryClient = useQueryClient();

  const handleConnectToQuickbook = async (): Promise<void> => {
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
            if (
              oauthWindow?.location.origin ===
              process.env.NEXT_PUBLIC_FRONTEND_APP_URL
            ) {
              clearInterval(checkInterval);
              toast.success("Quickbook account connected successfully");
              oauthWindow?.close();
              queryClient.invalidateQueries({ queryKey: ["integration-info"] });
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

  return { handleConnectToQuickbook };
};

export default useConnectToQuickbook;
