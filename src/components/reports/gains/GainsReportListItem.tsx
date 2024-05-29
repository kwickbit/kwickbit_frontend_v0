import { useState } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import { toLocaleDate } from "@/lib/helpers";
import { CostingMethod, GainsReport } from "@/services/reports/gains";
import { CostingMethodSelector } from "./CostingMethodSelector";
import { GainsReportTable } from "./GainsReportTable";
import classNames from "classnames";

interface Props {
  report: GainsReport;
  isNew?: boolean;
}

export const GainsReportListItem = ({ report, isNew }: Props): React.JSX.Element => {
  const [reportOpened, setReportOpened] = useState(false);
  const toggleReportOpened = (): void => setReportOpened(!reportOpened);
  const [selectedMethod, setSelectedMethod] = useState<CostingMethod>(CostingMethod.FIFO);

  const {
    reportDate,
    transactionsStartDate,
    transactionsEndDate,
    assets,
  } = report;

  return (
    <div className={
      classNames(
        "flex flex-col bg-white text-[#9095A1] font-bold shadow p-6 rounded-lg border space-y-6",
        isNew ? 'border-[#21254E] border-4' : 'transition-all hover:border-[#39bff0]'
      )}>
      <div className="flex items-center">
        <div className="col-span-1 flex flex-col justify-center grow">
          <span className="">Gains report created on {toLocaleDate(reportDate)}</span>
          <span>
            Covers transactions between {toLocaleDate(transactionsStartDate)} and {toLocaleDate(transactionsEndDate)}
          </span>
        </div>
        <span className="col-span-1">
          {assets.length} asset{assets.length !== 1 && "s"} included
        </span>
        <div className={reportOpened ? "" : "invisible"}>
          <CostingMethodSelector
            key={selectedMethod}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        </div>
        <button
          className="text-xl transition-transform duration-300 ease-in-out"
          onClick={toggleReportOpened}
          style={{ transform: `rotate(${reportOpened ? 0 : 180}deg)` }}
        >
          <FaChevronCircleUp />
        </button>
      </div>
      {reportOpened && <GainsReportTable assets={report.assets} selectedMethod={selectedMethod} />}
    </div>
  );
};
