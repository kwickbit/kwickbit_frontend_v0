enum ReportType {
  Reconciliation = "Reconciliation",
}

interface ReturnProps {
  reportTypes: ReportType[];
}

const useCreateReportModal = (): ReturnProps => {
  const reportTypes = ["Reconciliation"] as ReportType[];

  return { reportTypes };
};

export default useCreateReportModal;
