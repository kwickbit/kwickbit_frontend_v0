import Link from "next/link";
import { BiPencil } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { toLocaleDate } from "@/lib/helpers";
import { ReconciliationReportSummary } from "@/services/reports";

interface Props {
  report: ReconciliationReportSummary;
  onSelect: (isChecked: boolean, report: ReconciliationReportSummary) => void;
  isSelected?: boolean;
}

const ReconciliationReportListItem = ({ report, onSelect, isSelected }: Props): React.JSX.Element => {
  const {
    reportId,
    reportDate,
    reconciliationCount,
    transactionsStartDate,
    transactionsEndDate
  } = report;

  return (
    <Link href={`reports/reconciliation/${reportId}`}>
      <div className="flex bg-white text-[#BDC1CA] font-bold items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
        <div className="col-span-1 flex grow-0 items-center gap-8 mr-8">
          <input
            className="checkbox-round"
            type="checkbox"
            onChange={(event): void => onSelect(event.currentTarget.checked, report)}
            checked={isSelected}
          />
        </div>

        <div className="col-span-1 flex flex-col justify-center grow">
          <span className="">Report creation date: {toLocaleDate(reportDate)}</span>
          <span>Transactions between {toLocaleDate(transactionsStartDate)} and {toLocaleDate(transactionsEndDate)}</span>
        </div>
        <div className="col-span-1 flex justify-center grow">
          <span className="col-span-1 ">{reconciliationCount} transactions reconciled</span>
        </div>
        <div className="col-span-1 flex gap-4 justify-center grow-0">
          <BiPencil className="w-6 h-6 cursor-pointer text-neutral-900" />
          <CiSearch className="w-6 h-6 cursor-pointer text-neutral-900" />
        </div>
      </div>
    </Link>
  );
};

export default ReconciliationReportListItem;
