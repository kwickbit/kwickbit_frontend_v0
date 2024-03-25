import { useState } from "react";
import { ReconciliationReportSummary } from "@/services/reports";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CreateItemButton from "../common/CreateItemButton";
import ReconciliationReportListItem from "./reconciliation/ReconciliationReportListItem";

interface Props {
  className: string;
  reports: ReconciliationReportSummary[];
  showModal: UseBooleanReturnProps;
}

const ReportsList = ({
  className,
  reports,
  showModal,
}: Props): React.JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<ReconciliationReportSummary[]>([]);

  const handleSelectItem = (isChecked: boolean, report: ReconciliationReportSummary): void => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, report]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.reportId !== report.reportId));
    }
  };

  return (
    <div className={className}>
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-center">No reports yet, please add report</p>
          <div className="mt-12">
            <CreateItemButton showModal={showModal} itemName="Report" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 h-full pb-8">
            {reports.map((report) => (
              <ReconciliationReportListItem
                key={report.reportId}
                report={report}
                onSelect={handleSelectItem}
                isSelected={selectedItems.includes(report)}
              />))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsList;
