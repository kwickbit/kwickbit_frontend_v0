import { ReactNode } from "react"
import Link from "next/link";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import useCreateReportModal from "@/hooks/useCreateReportModal";
import Modal from "@/components/Modal"
import Select from "@/components/common/Select";

interface Props {
  createReport: UseBooleanReturnProps;
}

const CreateReportModal = ({ createReport }: Props): ReactNode => {
  const { reportTypes } = useCreateReportModal();
  const renderLabel = (): ReactNode => <span>{reportTypes[0]}</span>

  return (
    <>
      <Modal
        title="Create new accounting report"
        modalClassNames="max-w-2xl"
        show={createReport.value}
        closeModal={(): void => { createReport.onFalse() }}
      >
        <span className="text-sm text-[#565D6D] font-bold py-4">Report type</span>
            <Select
              selected={reportTypes[0]}
              setSelected={(): void => undefined}
              options={reportTypes}
              renderLabel={renderLabel}
            />
        <div className="mt-6">
          <Link
            className="bg-sky-400 rounded-md font-bold text-lg text-white px-6 py-2"
            href="/reports/create/reconciliation"
          >
            Create
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default CreateReportModal
