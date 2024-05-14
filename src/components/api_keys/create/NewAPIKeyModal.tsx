import Modal from "@/components/Modal";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import { Dispatch, SetStateAction } from "react";

interface Props {
  shouldShowNewAPIKey: UseBooleanReturnProps;
  newAPIKey: string;
  setNewAPIKey: Dispatch<SetStateAction<string>>;
}

export const NewAPIKeyModal = ({
  shouldShowNewAPIKey,
  newAPIKey,
  setNewAPIKey,
}: Props): React.JSX.Element => {
  const closeModal = (): void => {
    shouldShowNewAPIKey.onFalse();
    setNewAPIKey("");
  };

  return (
    <Modal
      title={"Your new API key"}
      modalClassNames="max-w-2xl"
      show={shouldShowNewAPIKey.value}
      closeModal={closeModal}
    >
      <p>Your new API key is {newAPIKey}.</p>
    </Modal>
  );
};
