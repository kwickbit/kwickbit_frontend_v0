import type { UseBooleanReturnProps } from "@/hooks/useBoolean";
import type { ReconciliationReportSummary } from "@/services/reports/reconciliation";
import CreateItemButton from "@/components/common/CreateItemButton";
import { ReconciliationReportListItem } from "@/components/reports/reconciliation/ReconciliationReportListItem";

interface Props {
  className: string;
  reports: ReconciliationReportSummary[];
  showModal: UseBooleanReturnProps;
}

export const ReconciliationReportsList = ({ className, reports, showModal }: Props): React.JSX.Element => {
  return (
    <div className={className}>
      {reports.length === 0
        ? <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-center">No reconciliation reports yet</p>
            <div className="mt-12">
              <CreateItemButton showModal={showModal} itemName="Report" />
            </div>
          </div>
        : <div className="flex flex-col gap-4 h-full pb-8">
            {reports.map(report =>
              <ReconciliationReportListItem key={report.reportId} report={report} />
            )}
          </div>
      }
    </div>
  );
};
