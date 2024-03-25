import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import { CreateReconciliationReport } from "@/components/reports/create/reconciliation/CreateReconciliationReport";

const CreateReconciliationReportPage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>Reconcile</title>
      </Head>
      <CreateReconciliationReport />
    </>
  );
};

CreateReconciliationReportPage.Layout = MainLayout;

export default CreateReconciliationReportPage;
