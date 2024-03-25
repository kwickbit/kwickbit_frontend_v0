import { useRouter } from "next/router";
import { ReconciliationReportView } from "@/components/reports/reconciliation/ReconciliationReportView";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";

const ReconciliationReportPage = (): React.JSX.Element => {
  const router = useRouter();
  const { reportId } = router.query;

  return (
    <>
      <Head>
        <title>{reportId}</title>
      </Head>
      <ReconciliationReportView reportId={reportId as string} />
    </>
  );
};

ReconciliationReportPage.Layout = MainLayout;

export default ReconciliationReportPage;
