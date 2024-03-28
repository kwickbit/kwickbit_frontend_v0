import Link from "next/link";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import useCreateReportModal from "@/hooks/useCreateReportModal";
import Modal from "@/components/Modal"
import Select from "@/components/common/Select";

interface Props {
  shouldDisplay: UseBooleanReturnProps;
}

const CreateReportModal = ({ shouldDisplay }: Props): React.JSX.Element => {
  const { reportTypes } = useCreateReportModal();
  const renderLabel = (): React.JSX.Element => <span>{reportTypes[0]}</span>

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
