import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import { useCreateGainsReportModal } from "@/hooks/reports/useCreateGainsReportModal";
import Modal from "@/components/Modal"
import PrimaryButton from "@/components/PrimaryButton";
import { DatePicker } from "@/components/common/DatePicker";
import { CreateGainsReportAPIProps as FormValues } from "@/services/reports/gains";
import { ProvidedCostsInput } from "./ProvidedCostsInput";

interface Props {
  shouldDisplay: UseBooleanReturnProps;
}

const CreateGainsReportModal = ({ shouldDisplay }: Props): JSX.Element => {
  const closeModal = (): void => { shouldDisplay.onFalse(); };
  const {
    addAsset,
    assetCount,
    errors,
    getValues,
    register,
    removeAsset,
    setValue,
    submitForm,
    watch,
  } = useCreateGainsReportModal();


  const startDate = watch("transactionsStartDate");
  const endDate = watch("transactionsEndDate");

  const onSubmit = async (): Promise<void> => {
    submitForm();
    closeModal();
  };

  return (
    <Modal
      title="Create gains report"
      modalClassNames="max-w-2xl h-[80vh] flex flex-col"
      show={shouldDisplay.value}
      closeModal={closeModal}
    >
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <div className="grid grid-cols-6 gap-4">
            <input type="hidden" {...register("deduplicationId")} />
            <input type="hidden" {...register("batchId")} />
            <DatePicker
              className="col-span-3"
              label="Start Date"
              inputId="transactionsStartDate"
              value={startDate}
              register={register}
              validate={
                (startDate, formValues: FormValues): boolean =>
                  new Date(startDate) <= new Date(formValues.transactionsEndDate)
              }
            />
            <DatePicker
              className="col-span-3"
              label="End Date"
              inputId="transactionsEndDate"
              value={endDate}
              register={register}
              validate={(endDate): boolean => new Date(endDate) <= new Date()}
            />
            {(errors.transactionsStartDate || errors.transactionsEndDate) &&
              <p role="alert" className="col-span-6 text-red-500 text-sm">
                End date must be between start date and today, inclusive.
              </p>
            }
          </div>
        </div>
        <div className="border-t-2 border-gray-200 pt-4 mt-4 flex-grow overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Assets</h3>
          <div className="space-y-4">
            {[...Array(assetCount)].map((_, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 relative border p-4 rounded-md">
                <ProvidedCostsInput
                  errors={errors}
                  getValues={getValues}
                  index={index}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
                {assetCount > 1 && (
                  <button
                    type="button"
                    onClick={(): void => removeAsset(index)}
                    className="absolute top-2 right-2 text-sky-500"
                  >
                    <FaMinusCircle />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 mt-4">
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={addAsset}
              className="flex items-center gap-2 text-sky-400"
            >
              <FaPlusCircle /> Add Another Asset
            </button>
          </div>
          <div className="flex justify-center">
            <PrimaryButton
              className="flex items-center gap-2 w-fit font-bold bg-sky-400"
              type="submit"
            >
              <FaPlusCircle />Create report
            </PrimaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGainsReportModal;
