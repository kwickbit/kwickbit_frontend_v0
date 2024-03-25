import { ReactNode } from "react"
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import Modal from "@/components/Modal"

interface Props {
  createReport: UseBooleanReturnProps;
}

const CreateReportModal = ({ createReport }: Props): ReactNode => {
  return (
    <>
      <Modal
        title="Create new accounting report"
        modalClassNames="max-w-2xl"
        show={createReport.value}
        closeModal={(): void => undefined}
      >
        <div>Contents of CreateReportModal come here.</div>
      </Modal>
    </>
  )
}

export default CreateReportModal
