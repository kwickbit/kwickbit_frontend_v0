import PrimaryButton from "@/components/PrimaryButton";
import { FaMinusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryDeleteAPIKey } from "@/hooks/apiKeys";

interface Props {
  keyId: string;
}

export const DeleteAPIKeyButton = ({ keyId }: Props): React.JSX.Element => {
  const apiKeyMutator = useQueryDeleteAPIKey();

  const deleteAPIKey = (): void => {
    apiKeyMutator.mutate(
      keyId,
      {
        onSuccess: (data: any) => {
          toast.success(data?.message ?? "API key deleted successfully.");
        },
        onError: (error: any) => {
          toast.error(error?.message ?? "Error while deleting API key.");
        },
      }
    )
  };

  return (
    <PrimaryButton
      className="flex items-center gap-2"
      onClick={deleteAPIKey}
    >
      <FaMinusCircle />Delete key
    </PrimaryButton>
  );
};
