import { ReactNode, useEffect } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const HomePage = (): ReactNode => {
  const router = useRouter();

  useEffect(() => {
    router.push("/transactions");
  }, [router]);
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <div className="flex justify-center mt-12">
        <Loader />
      </div>
    </>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
