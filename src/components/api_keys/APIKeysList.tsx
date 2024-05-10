import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import { APIKey } from "@/services/apiKeys";

interface Props {
  className: string;
  apiKeys: APIKey[];
  createAPIKey: UseBooleanReturnProps;
}

export const APIKeysList = (props: Props): React.JSX.Element => {
  return <p>{JSON.stringify(props.apiKeys)}</p>
};
