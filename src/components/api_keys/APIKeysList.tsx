import { UseBooleanReturnProps } from "@/hooks/useBoolean";

interface Props {
  className: string;
  apiKeys: any[];
  createAPIKey: UseBooleanReturnProps;
}

export const APIKeysList = (props: Props): React.JSX.Element => {
  return <p>{props ? "I am an empty keys list" : ""}</p>
};
