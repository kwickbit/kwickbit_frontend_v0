import { toast } from "react-toastify";
import { useMutationCreateAPIKey } from "@/hooks/apiKeys";
import { UseBooleanReturnProps } from "@/hooks/useBoolean"
import { CreateAPIKeyAPIProps } from "@/services/apiKeys";
import Modal from "@/components/Modal"
import PrimaryButton from "@/components/PrimaryButton";

interface Props {
  shouldCreateAPIKey: UseBooleanReturnProps;
}

export const CreateAPIKeyModal = ({ shouldCreateAPIKey }: Props): React.JSX.Element => {
  const postNewAPIKey = useMutationCreateAPIKey();

  const expiresInWeeks = 52;

  const newAPIKey: CreateAPIKeyAPIProps = {
    expiresInWeeks,
  };

  const createAPIKey = (): void => {
    postNewAPIKey.mutate(
      newAPIKey,
      {
        onSuccess: (data: any) => {
          toast.success(data?.message ?? "API key created successfully.");
        },
        onError: (error: any) => {
          toast.error(error?.message ?? "Error while creating API key.");
        },
      }
    );
  };

  return (
    <Modal
      title={"New API Key"}
      modalClassNames="max-w-2xl"
      show={shouldCreateAPIKey.value}
      closeModal={shouldCreateAPIKey.onFalse}
    >
      <p>Creating an API key to expire in {expiresInWeeks} weeks.</p>
      <PrimaryButton
        className="flex items-center gap-2"
        onClick={createAPIKey}
      >
        Create
      </PrimaryButton>
    </Modal>
  );
};
