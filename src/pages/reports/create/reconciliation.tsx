import { ReactNode } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import { CreateReconciliationReport } from "@/components/reports/create/reconciliation/CreateReconciliationReport";

const CreateReconciliationReportPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Reconciliation Report</title>
      </Head>
      <CreateReconciliationReport />
    </>
  );
};

CreateReconciliationReportPage.Layout = MainLayout;

export default CreateReconciliationReportPage;
