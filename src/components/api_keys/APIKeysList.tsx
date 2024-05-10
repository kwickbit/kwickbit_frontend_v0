import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import { APIKey } from "@/services/apiKeys";
import { ShowAPIKey } from "./ShowAPIKey";

interface Props {
  className: string;
  apiKeys: APIKey[];
  createAPIKey: UseBooleanReturnProps;
}

export const APIKeysList = (props: Props): React.JSX.Element => {
  return (<>
    {props.apiKeys.map(keyObj =>
      <ShowAPIKey key={keyObj.apiKey} apiKey={keyObj} />
    )}
  </>)
};
