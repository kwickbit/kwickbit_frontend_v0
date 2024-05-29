import Head from "next/head";
import ReconciliationReportsView from "@/components/reports/ReconciliationReportsView";
import MainLayout from "@/components/layouts/MainLayout";

const ReconciliationReportsPage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>Reconciliation Reports</title>
      </Head>
      <ReconciliationReportsView />
    </>
  );
};

ReconciliationReportsPage.Layout = MainLayout;

export default ReconciliationReportsPage;
