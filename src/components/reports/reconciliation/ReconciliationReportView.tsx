import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import { useQueryReconciliationReport } from "@/hooks/reports/reconciliation";
import { toLocaleDate } from "@/lib/helpers";
import { ReconciliationReport } from "@/services/reports/reconciliation";
import { Reconciliation } from "@/components/reports/reconciliation/Reconciliation";

interface Props {
  reportId: string;
}

export const ReconciliationReportView = ({ reportId }: Props): React.JSX.Element => {
  const { data, isLoading, isError } = useQueryReconciliationReport(reportId);

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

  const report = data?.data as ReconciliationReport;

  return (
    <div className="mx-16">
      {report ? <>
        <h5>Reconciliation report of {toLocaleDate(report.reportDate)}</h5>
        <p>This report covers transactions between {toLocaleDate(report.transactionsStartDate)} and {toLocaleDate(report.transactionsEndDate)}.</p>
        <div className="flex flex-col">
          {report.reconciledTransactions.map(
            (reconciliation, index) =>
              <div key={index} className={index % 2 === 0 ? "" : "bg-sky-100"}>
                <Reconciliation reconciliation={reconciliation} />
              </div>
            )
          }
        </div></>
        : <></>
      }
    </div>
  );
};
