import { AccountingReport } from "@/services/reports";
import { BiPencil } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

interface Props {
  report: AccountingReport;
  onSelect: (isChecked: boolean, id: string) => void;
  isSelected?: boolean;
}

const ReportItem = ({ report, onSelect, isSelected }: Props): React.JSX.Element => {
  const { reportType, sourceTransactions, localTransactions } = report;
  return (
    <div className="grid grid-cols-5 bg-white text-[#BDC1CA] font-bold items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
      <div className="col-span-1 flex items-center gap-8">
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(event): void => onSelect(event.currentTarget.checked, reportType)}
          checked={isSelected}
        />
      </div>

      <div className="col-span-1 flex justify-center">
        <span className="">{reportType}</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span className="col-span-1 ">{sourceTransactions.length} source transactions</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span className="col-span-1 ">{localTransactions.length} local transactions</span>
      </div>
      <div className="col-span-1 flex gap-4 justify-center">
        <BiPencil className="w-6 h-6 cursor-pointer text-neutral-900" />
        <CiSearch className="w-6 h-6 cursor-pointer text-neutral-900" />
      </div>
    </div>
  );
};

export default ReportItem;
