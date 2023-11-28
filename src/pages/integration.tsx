import MainLayout from "@/components/layouts/MainLayout";
import React, { ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

const IntegrationsPage = (): ReactNode => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleClick = () => {
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (code) {
      console.log("code: ", code);
      // will call the backend API to get the access token
    }
  }, [code]);

  return (
    <div>
      <button onClick={handleClick}>Connect to QuickBooks</button>
    </div>
  );
};

IntegrationsPage.Layout = MainLayout;

export default IntegrationsPage;
