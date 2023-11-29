import React, { useEffect } from "react";
import PrimaryButton from "../PrimaryButton";
import { useSearchParams } from "next/navigation";
import { useMutationIntegrations } from "@/hooks/integration";

const clientId = "ABuPzxGEOadryTiwHbFLaIwEqKfJJreHdDZn8xd6jP6OHvKuQt";
const redirectUri = encodeURIComponent("http://localhost:3000/integration");
const scope = encodeURIComponent("com.intuit.quickbooks.accounting");
const state = generateState();

function generateState(length = 24) {
  const validChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let state = "";

  if (typeof window !== "undefined") {
    let array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    let numArray = Array.from(array);
    state = numArray
      .map((x) => validChars.charAt(x % validChars.length))
      .join("");
  }

  return state;
}

const Integration: React.FC = (): JSX.Element => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { mutate } = useMutationIntegrations();

  const connectQuickbook = () => {
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (code) {
      console.log("code: ", code);
      mutate(code);
      // will call the backend API to get the access token
    }
  }, [code]);

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
