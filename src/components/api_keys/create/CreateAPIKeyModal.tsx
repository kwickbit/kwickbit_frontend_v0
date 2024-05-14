import { Dispatch, SetStateAction } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { UseBooleanReturnProps } from "@/hooks/useBoolean"
import Modal from "@/components/Modal"
import PrimaryButton from "@/components/PrimaryButton";
import FormProvider from "@/components/FormProvider";
import RHFTextField from "@/components/RHFTextField";
import { useCreateAPIKeyModal } from "@/hooks/apiKeys/useCreateAPIKeyModal";

interface Props {
  shouldCreateAPIKey: UseBooleanReturnProps;
  shouldShowNewAPIKey: UseBooleanReturnProps;
  setNewAPIKey: Dispatch<SetStateAction<string>>;
}

export const CreateAPIKeyModal = ({
  shouldCreateAPIKey,
  shouldShowNewAPIKey,
  setNewAPIKey
}: Props): React.JSX.Element => {
  const { submitForm, methods } = useCreateAPIKeyModal({ shouldShowNewAPIKey, setNewAPIKey });

  const onSubmit = async (): Promise<void> => {
    submitForm();
    shouldCreateAPIKey.onFalse();
  };

  return (
    <Modal
      title={"New API Key"}
      modalClassNames="max-w-2xl"
      show={shouldCreateAPIKey.value}
      closeModal={shouldCreateAPIKey.onFalse}
    >
      <FormProvider
        onSubmit={onSubmit}
        methods={methods}
        className="w-full flex flex-col gap-4"
      >
        <RHFTextField
          name="expiresInWeeks"
          label="API key expiration in weeks"
          placeholder="4"
          min="1"
          type="number"
          horizontal="true"
          required
        />
        <div className="flex justify-center">
          <PrimaryButton
            className="flex items-center gap-2 w-fit"
            type="submit"
          >
            <FaPlusCircle />Create key
          </PrimaryButton>
        </div>
      </FormProvider>
    </Modal>
  );
};
