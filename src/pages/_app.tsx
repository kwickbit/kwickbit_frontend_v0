import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import {
  isConnected,
  isRefreshTokenExpired,
  refreshToken,
} from "@/lib/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Noop: React.FC<{ children: any }> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const { route, replace } = useRouter();
  const Layout = (Component as any).Layout || Noop;
  React.useEffect(() => {
    // List of routes that must be excluded from the authentication check
    const nonAuthExclusiveRoutes = ["/login", "/signup"];
    const authExcludedRoutes = [
      ...nonAuthExclusiveRoutes,
      "/change-password",
      "/confirm-code",
      "/signup/success",
    ];

    if (
      !authExcludedRoutes.includes(route) &&
      !isConnected() &&
      !isRefreshTokenExpired()
    )
      refreshToken();
    else if (
      !authExcludedRoutes.includes(route) &&
      !isConnected() &&
      isRefreshTokenExpired()
    ) {
      replace(`/login?redirect=${route}`);
    } else if (nonAuthExclusiveRoutes.includes(route) && isConnected())
      replace("/");
  }, [route, replace]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
