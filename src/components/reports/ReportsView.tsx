import { ReactNode } from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { useQueryReports } from "@/hooks/reports";
// import CreateReportButton from "./create/CreateReportButton";
// import CreateReportModal from "./create/CreateReportModal";
import Loader from "../Loader";
import ServerError from "../ServerError";
import ReportsList from "./ReportsList";

const ReportsView = (): ReactNode => {
  const { data, isLoading, isError } = useQueryReports();

  const createReport = useBoolean();

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

  return (
    <>
      {/* <CreateReportModal createReport={createReport} /> */}
      <div className="max-w-7xl mx-auto mt-12 px-4 pb-12">
        <div className="overflow-auto">
          <div className="flex justify-end">
            {/* <CreateReportButton createReport={createReport} /> */}
          </div>
          <ReportsList
            className="max-w-7xl mx-auto min-w-[800px] overflow-x-auto"
            reports={data?.data ?? []}
            createReport={createReport}
          />
        </div>
      </div>
    </>
  );
};

export default ReportsView;
