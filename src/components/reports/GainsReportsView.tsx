import { useState } from "react";
import { useQueryGainsReport } from "@/hooks/reports/gains";
import { toLocaleDate } from "@/lib/helpers";
import { CostingMethod, GainsReport } from "@/services/reports/gains";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import { GainsReportTable } from "@/components/reports/gains/GainsReportTable";


export const GainsReportsView = (): React.JSX.Element => {
  const [selectedMethod, setSelectedMethod] = useState<CostingMethod>(CostingMethod.FIFO);

  const { data, isLoading, isError } = useQueryGainsReport();

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

  const report = data?.data as GainsReport;

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
      <h2 className="text-lg underline mb-4">Gains report</h2>
      <div className="flex mb-12 space-x-4">
        <span className="flex-grow">Covering the period of {toLocaleDate(report?.reportStartDate)} to {toLocaleDate(report?.reportEndDate)}</span>
        <div className="flex items-center space-x-2">
          <span>Costing method:</span>
          {Object.values(CostingMethod).map(
            method => <div key={method}>
              <input
                type="radio"
                name="method"
                id={method}
                value={method}
                checked={selectedMethod === method}
                onChange={(): void => setSelectedMethod(method)}
              />
              <label htmlFor={method}>{method.toUpperCase()}</label>
            </div>
          )}
        </div>
      </div>
      <GainsReportTable assets={report?.assets} selectedMethod={selectedMethod} />
    </div>
  );
};
