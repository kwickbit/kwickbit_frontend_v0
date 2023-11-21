import { ReactNode } from "react";
import LoginView from "@/components/LoginView";
import Head from "next/head";

const LoginPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginView />
    </>
  );
};

export default LoginPage;
