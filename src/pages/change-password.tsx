import ChangePasswordView from "@/components/auth/ChangePasswordView";
import Head from "next/head";
import { ReactNode } from "react";

const ChangePasswordPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Change password</title>
      </Head>
      <ChangePasswordView />
    </>
  );
};

export default ChangePasswordPage;
