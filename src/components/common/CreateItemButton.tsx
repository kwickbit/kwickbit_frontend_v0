import { ReactNode } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import PrimaryButton from "@/components/PrimaryButton";

interface Props {
  createSource: UseBooleanReturnProps;
  itemName: string
}

const CreateItemButton = ({ createSource, itemName }: Props): ReactNode => {
  return (
    <PrimaryButton
      className="flex items-center gap-2"
      onClick={createSource.onTrue}
    >
      <FaPlusCircle /> Add {itemName}
    </PrimaryButton>
  );
};

export default CreateItemButton;
