import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import useCreateReportModal from "@/hooks/reports/useCreateReportModal";
import Modal from "@/components/Modal"
import Select from "@/components/common/Select";

interface Props {
  shouldDisplay: UseBooleanReturnProps;
}

const CreateReportModal = ({ shouldDisplay }: Props): React.JSX.Element => {
  const router = useRouter();
  const { reportTypes } = useCreateReportModal();
  const renderLabel = (): React.JSX.Element => <span>{reportTypes[0]}</span>;
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");

  const areDatesValid = (): boolean => {
    const currentDate = new Date();
    const startDate = new Date(reportStartDate);
    const endDate = new Date(reportEndDate);
    return startDate < endDate && endDate <= currentDate
  };

  return (
    <>
      <Modal
        title="Create new accounting report"
        modalClassNames="max-w-2xl"
        show={shouldDisplay.value}
        closeModal={(): void => { shouldDisplay.onFalse() }}
      >
        <span className="text-sm text-[#565D6D] font-bold py-4">Report type</span>
          <Select
            selected={reportTypes[0]}
            setSelected={(): void => undefined}
            options={reportTypes}
            renderLabel={renderLabel}
          />
        <div className="flex gap-4 my-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="reportStartDate" className="mb-2">Start Date</label>
            <input
              type="date"
              id="reportStartDate"
              value={reportStartDate}
              onChange={(event): void => setReportStartDate(event.target.value)}
              className="border-2 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="reportEndDate" className="mb-2">End Date</label>
            <input
              type="date"
              id="reportEndDate"
              value={reportEndDate}
              onChange={(event): void => setReportEndDate(event.target.value)}
              className="border-2 rounded-md p-2"
            />
          </div>
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

export default CreateReportModal;
