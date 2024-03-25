import { useState } from "react";
import { AccountingReport } from "@/services/reports";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CreateItemButton from "../common/CreateItemButton";
import ReportItem from "./ReportItem";

interface Props {
  className: string;
  reports: AccountingReport[];
  showModal: UseBooleanReturnProps;
}

const ReportsList = ({
  className,
  reports,
  showModal,
}: Props): React.JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (isChecked: boolean, id: string): void => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
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
