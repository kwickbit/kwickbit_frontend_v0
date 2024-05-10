import Modal from "@/components/Modal"
import { UseBooleanReturnProps } from "@/hooks/useBoolean"

interface Props {
  shouldCreateAPIKey: UseBooleanReturnProps;
}

export const CreateAPIKeyModal = ({ shouldCreateAPIKey }: Props): React.JSX.Element => {
  return (
    <Modal
      title={"New API Key"}
      modalClassNames="max-w-2xl"
      show={shouldCreateAPIKey.value}
      closeModal={(): void => undefined}
    >
      <p>Contents of CreateAPIKeyModal come here</p>
    </Modal>
  );
};
