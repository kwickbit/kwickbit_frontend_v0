import { ReactNode } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import dynamic from "next/dynamic";
const TransactionsView = dynamic(
  () => import("@/components/transactions/TransactionsView"),
  { ssr: false }
);

const TransactionsPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <TransactionsView />
    </>
  );
};

TransactionsPage.Layout = MainLayout;

export default TransactionsPage;
