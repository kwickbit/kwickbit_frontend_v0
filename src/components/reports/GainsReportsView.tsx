import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useBoolean } from "@/hooks/useBoolean";
import useUserWebSocket from "@/hooks/useWebSocket";
import { useQueryAllGainsReports } from "@/hooks/reports/gains";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import CreateItemButton from "@/components/common/CreateItemButton";
import CreateGainsReportModal from "@/components/reports/create/gains/CreateGainsReportModal";
import { GainsReportList } from "@/components/reports/gains/GainsReportList";

export const GainsReportsView = (): JSX.Element => {
  const { data, isLoading, isError } = useQueryAllGainsReports();
  const showModal = useBoolean();

  const {
    newGainsReport: newReport,
    newGainsReportError: newReportError,
    setNewGainsReportError: setNewReportError
  } = useUserWebSocket();

  const [reports, setReports] = useState(data?.data ?? []);
  const [newReportId, setNewReportId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setReports(data?.data?? []);
  }, [data]);

  useEffect(() => {
    if (newReport) {
      setReports(prevReports => [newReport, ...prevReports]);
      setNewReportId(newReport.reportId);
      setTimeout(() => setNewReportId(undefined), 10_000);
    }
  }, [newReport]);

  useEffect(() => {
    if (newReportError) {
      toast.error(`Error building gains report: ${newReportError}`);
      setNewReportError(null);
    }
  }, [newReportError, setNewReportError]);

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
    <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
      <CreateGainsReportModal shouldDisplay={showModal} />
      <div className="flex justify-end">
        <CreateItemButton showModal={showModal} itemName="Report" />
      </div>
      <GainsReportList reports={reports} newReportId={newReportId} />
    </div>
  );
};
