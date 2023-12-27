import { ReactNode } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import TransactionsView from "@/components/transactions/TransactionsView";

const TransactionsPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <TransactionsView />
    </>
  )
};

TransactionsPage.Layout = MainLayout;

export default TransactionsPage;
