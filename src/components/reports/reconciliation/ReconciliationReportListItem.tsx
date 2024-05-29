import Link from "next/link";
import { toLocaleDate } from "@/lib/helpers";
import { ReconciliationReportSummary } from "@/services/reports/reconciliation";

interface Props {
  report: ReconciliationReportSummary;
}

export const ReconciliationReportListItem = ({ report }: Props): React.JSX.Element => {
  const {
    reportId,
    reportDate,
    reconciliationCount,
    transactionsStartDate,
    transactionsEndDate
  } = report;

  return (
    <Link href={`reconciliation/${reportId}`}>
      <div className="flex bg-white text-[#BDC1CA] font-bold items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
        <div className="col-span-1 flex flex-col justify-center grow">
          <span className="">Reconciliation report created on {toLocaleDate(reportDate)}</span>
          <span>Covers transactions between {toLocaleDate(transactionsStartDate)} and {toLocaleDate(transactionsEndDate)}</span>
        </div>
        <div className="col-span-1 flex justify-center grow">
          <span className="col-span-1 ">{reconciliationCount} transactions reconciled</span>
        </div>
      </div>
    </Link>
  );
};
