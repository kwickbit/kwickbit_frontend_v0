import Modal from "@/components/Modal"
import { UseBooleanReturnProps } from "@/hooks/useBoolean"

interface Props {
  createAPIKey: UseBooleanReturnProps;
}

export const CreateAPIKeyModal = ({ createAPIKey }: Props): React.JSX.Element => {
  return (
    <Modal
      title={"New API Key"}
      modalClassNames="max-w-2xl"
      show={createAPIKey.value}
      closeModal={(): void => undefined}
    >
      <p>Contents of CreateAPIKeyModal come here</p>
    </Modal>
  );
};
