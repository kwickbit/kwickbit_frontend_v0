import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import Modal from "@/components/Modal"
import { DatePicker } from "@/components/common/DatePicker";

interface Props {
  shouldDisplay: UseBooleanReturnProps;
}

const CreateReconciliationReportModal = ({ shouldDisplay }: Props): React.JSX.Element => {
  const router = useRouter();
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");

  const areDatesValid = (): boolean => {
    const currentDate = new Date();
    const startDate = new Date(reportStartDate);
    const endDate = new Date(reportEndDate);
    return startDate < endDate && endDate <= currentDate;
  };

  return (
    <>
      <Modal
        title="Create reconciliation report"
        modalClassNames="max-w-2xl"
        show={shouldDisplay.value}
        closeModal={(): void => { shouldDisplay.onFalse() }}
      >
        <div className="flex gap-4">
          <DatePicker
            label="Start Date"
            inputId="reportStartDate"
            value={reportStartDate}
            onChangeCallback={setReportStartDate}
          />
          <DatePicker
            label="End Date"
            inputId="reportEndDate"
            value={reportEndDate}
            onChangeCallback={setReportEndDate}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className={classNames(
              "rounded-md font-bold text-lg text-white px-6 py-2",
              areDatesValid() ? "bg-sky-400" : "bg-gray-500"
            )}
            disabled={!areDatesValid()}
            onClick={(): void => {
              router.push({
                pathname: "/reports/create/reconciliation",
                query: { reportStartDate, reportEndDate }
              })
            }}
          >
            Next
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateReconciliationReportModal;
