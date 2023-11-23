import { ReactNode } from "react";
import { FaPlusCircle } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";

const AddSourceButton = (): ReactNode => {
  return (
    <PrimaryButton className="flex items-center gap-2">
      <FaPlusCircle /> Add Source
    </PrimaryButton>
  );
};

export default AddSourceButton;
