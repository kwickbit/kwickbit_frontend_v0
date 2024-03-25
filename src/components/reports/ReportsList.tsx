import { ReactNode, SyntheticEvent, useState } from "react";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
// import CreateReportButton from "./create/CreateReportButton";
import ReportItem from "./ReportItem";
// import ReportsHeader from "./ReportsHeader";
import { AccountingReport } from "@/services/reports";

interface Props {
  className: string;
  reports: AccountingReport[];
  createReport: UseBooleanReturnProps;
}

const ReportsList = ({
  className,
  reports,
  // createReport,
}: Props): ReactNode => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // TODO: check if this is fully shared with Sources and, if so, extract
  const handleSelectItem = (
    e: SyntheticEvent<HTMLInputElement, Event>,
    id: string
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  // const handleSelectAll = (
  //   e: SyntheticEvent<HTMLInputElement, Event>
  // ): void => {
  //   if (e.currentTarget.checked) {
  //     setSelectedItems(reports.map((report) => report.reportType));
  //   } else {
  //     setSelectedItems([]);
  //   }
  // };

  return (
    <div className={className}>
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-center">No reports yet, please add report</p>
          <div className="mt-24">
            {/* <CreateReportButton createReport={createReport} /> */}
          </div>
        </div>
      ) : (
        <>
          {/* <ReportsHeader onSelectAll={handleSelectAll} /> */}
          <div className="flex flex-col gap-4 h-full pb-8">
            {reports.map((report, idx) => (
              <ReportItem
                report={report}
                key={idx}
                onSelect={handleSelectItem}
                isSelected={selectedItems.includes(report.reportType)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsList;
