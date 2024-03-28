import { ReactNode } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import PrimaryButton from "@/components/PrimaryButton";

interface Props {
  showModal: UseBooleanReturnProps;
  itemName: string;
}

const CreateItemButton = ({ showModal, itemName }: Props): ReactNode => {
  return (
    <PrimaryButton
      className="flex items-center gap-2"
      onClick={showModal.onTrue}
    >
      <FaPlusCircle /> Add {itemName}
    </PrimaryButton>
  );
};

export default CreateItemButton;
