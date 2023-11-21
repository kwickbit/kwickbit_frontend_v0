/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import SignupSuccessView from "@/components/SignupSuccessView";
import Head from "next/head";

const SuccessSignupPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Signup success</title>
      </Head>
      <SignupSuccessView />
    </>
  );
};

export default SuccessSignupPage;
