import { ReactNode } from "react";
import ConfirmCodeView from "@/components/auth/ConfirmCodeView";
import Head from "next/head";

const ConfirmCodePage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Code confirmation</title>
      </Head>
      <ConfirmCodeView />
    </>
  );
};

export default ConfirmCodePage;
