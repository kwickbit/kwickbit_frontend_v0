import PrimaryButton from "@/components/PrimaryButton";
import { FaMinusCircle } from "react-icons/fa";

interface Props {
  keyId: string;
}

export const DeleteAPIKeyButton = ({ keyId }: Props): React.JSX.Element => {
  return (
    <PrimaryButton
      className="flex items-center gap-2"
      onClick={(): void => alert(`Delete key ${keyId}`)}
    >
      <FaMinusCircle />Delete key
    </PrimaryButton>
  );
};
