import { ReactNode } from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { useQueryReports } from "@/hooks/reports";
import CreateItemButton from "../common/CreateItemButton";
import CreateReportModal from "./create/CreateReportModal";
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
      <CreateReportModal createReport={createReport} />
      <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
        <div className="overflow-auto">
          {data?.data.length ?
            <div className="flex justify-end">
              <CreateItemButton shouldCreate={createReport} itemName="Report" />
            </div> :
            <></>}
          <ReportsList
            className="max-w-7xl mx-auto min-w-[800px] overflow-x-auto my-6"
            reports={data?.data ?? []}
            createReport={createReport}
          />
        </div>
      </div>
    </>
  );
};

export default ReportsView;
