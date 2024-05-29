import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import { ReportsView } from "@/components/reports/ReportsView";

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
