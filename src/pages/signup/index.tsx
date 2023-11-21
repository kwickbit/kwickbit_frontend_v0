import { ReactNode } from "react";
import Head from "next/head";
import SignupView from "@/components/SignupView";

const SignupPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <SignupView />
    </>
  );
};

export default SignupPage;
