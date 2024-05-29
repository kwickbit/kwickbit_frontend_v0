import Head from "next/head";
import { GainsReportsView } from "@/components/reports/GainsReportsView";
import MainLayout from "@/components/layouts/MainLayout";

const GainsReportsPage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>Gains Reports</title>
      </Head>
      <GainsReportsView />
    </>
  );
};

GainsReportsPage.Layout = MainLayout;

export default GainsReportsPage;
