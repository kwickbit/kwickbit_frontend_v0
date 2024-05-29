import { GainsReport } from "@/services/reports/gains";
import { GainsReportListItem } from "./GainsReportListItem";

interface Props {
  reports: GainsReport[];
  newReportId?: string;
}

export const GainsReportList = ({ reports, newReportId }: Props): JSX.Element => (
  <div className="flex flex-col gap-4 h-full pb-8 mt-6">
    {reports.map(
      (report: GainsReport) =>
        <GainsReportListItem
          key={report.reportId}
          report={report}
          isNew={report.reportId === newReportId}
        />
    )}
  </div>
);
