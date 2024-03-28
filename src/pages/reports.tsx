import Head from "next/head";
import ReportsView from "@/components/reports/ReportsView";
import MainLayout from "@/components/layouts/MainLayout";

const ReportsPage = (): React.JSX.Element => {
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
