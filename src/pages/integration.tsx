import MainLayout from "@/components/layouts/MainLayout";
import React, { ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const clientId = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID;
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

  // will create a backend to handle this
  // function getAccessToken(code: any, callback: any) {
  //   const clientId = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID;
  //   const clientSecret = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_SECRET;
  //   const redirectUri = "http://localhost:3000/integration";

  //   const authHeader = "Basic " + btoa(clientId + ":" + clientSecret);

  //   fetch("https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: authHeader,
  //     },
  //     body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => callback(null, data))
  //     .catch((error) => callback(error, null));
  // }

  useEffect(() => {
    if (code) {
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
