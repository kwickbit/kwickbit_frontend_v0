import { useBoolean } from "@/hooks/useBoolean";
import { useQueryReconciliationReportSummaries } from "@/hooks/reports/reconciliation";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import CreateItemButton from "@/components/common/CreateItemButton";
import CreateReportModal from "@/components/reports/create/CreateReportModal";
import { ReconciliationReportsList } from "@/components/reports/reconciliation/ReconciliationReportsList";


const ReconciliationReportsView = (): React.JSX.Element => {
  const { data, isLoading, isError } = useQueryReconciliationReportSummaries();

  const showModal = useBoolean();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  const reports = data?.data ?? [];

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
      <CreateReportModal shouldDisplay={showModal} />
      <div className="overflow-auto">
        {reports.length ?
          <div className="flex justify-end">
            <CreateItemButton showModal={showModal} itemName="Report" />
          </div>
          : <></>}
        <ReconciliationReportsList
          className="max-w-7xl mx-auto min-w-[800px] overflow-x-auto my-6"
          reports={reports}
          showModal={showModal}
        />
      </div>
    </div>
  );
};

export default ReconciliationReportsView;
