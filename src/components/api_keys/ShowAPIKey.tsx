import { APIKey } from "@/services/apiKeys";

interface Props {
  apiKey: APIKey;
}

export const ShowAPIKey = ({ apiKey }: Props): React.JSX.Element => {
  return (<div>
    <p>Key: {apiKey.apiKey}</p>
    <p>Expires in: {apiKey?.expiresIn ?? "never"}</p>
  </div>)
};
