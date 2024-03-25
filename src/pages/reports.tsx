import { ReactNode } from "react";
import Head from "next/head";
import ReportsView from "@/components/reports/ReportsView";
import MainLayout from "@/components/layouts/MainLayout";

const ReportsPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      <ReportsView />
    </>
  );
};

ReportsPage.Layout = MainLayout;

export default ReportsPage;
