import { ReactNode } from "react"
import { Controller } from "react-hook-form";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import useCreateReportModal from "@/hooks/useCreateReportModal";
import Modal from "@/components/Modal"
import FormProvider from "@/components/FormProvider";
import Select from "@/components/common/Select";

interface Props {
  createReport: UseBooleanReturnProps;
}

const CreateReportModal = ({ createReport }: Props): ReactNode => {
  const { onSubmit, methods, reportTypes } = useCreateReportModal({ createReport });
  const { control, watch, register } = methods
  const renderLabel = (): ReactNode => <span>{reportTypes[0]}</span>

  const createTransactionInput = (transaction: string, index: number): React.JSX.Element => (
    // Later, when the transaction is complete, we'll have some better key here
    <div key={index} className="mb-2">
      <input
        {...register(`transactions.${index}`)}
        defaultValue={transaction}
        className="outline-none border border-gray-500 py-3 px-3 w-full rounded-md col-span-5"
      />
    </div>
  )

  return (
    <>
      <Modal
        title="Create new accounting report"
        modalClassNames="max-w-2xl"
        show={createReport.value}
        closeModal={(): void => { createReport.onFalse() }}
      >
        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className="text-[#21254EFF] h-full"
        >
          <span className="text-sm text-[#565D6D] font-bold py-4">Report type</span>
          <Controller
            name="reportType"
            control={control}
            render={({field}): React.JSX.Element => (
              <Select
                selected={field.value}
                setSelected={field.onChange}
                options={reportTypes}
                renderLabel={renderLabel}
              />
            )}
          />

          {/* Mock list of transactions */}
          <div className="my-4">
            <label className="text-sm text-[#565D6D] font-bold py-4">Transactions</label>
            {watch("transactions").map(createTransactionInput)}
          </div>

          <button
            onSubmit={onSubmit}
            type="submit"
            className="flex items-center bg-sky-400 rounded-md font-bold text-lg text-white px-6 py-2 gap-2 my-6"
          >
            Create
          </button>
        </FormProvider>
      </Modal>
    </>
  )
}

export default CreateReportModal
