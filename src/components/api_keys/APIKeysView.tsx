import { useQueryAPIKeys } from "@/hooks/apiKeys";
import { useBoolean } from "@/hooks/useBoolean";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import CreateItemButton from "@/components/common/CreateItemButton";
import { APIKeysList } from "./APIKeysList";

export const APIKeysView = (): React.JSX.Element => {
  const { data, isLoading, isError } = useQueryAPIKeys();

  const createAPIKey = useBoolean();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <>
      {/* <CreateAPIKeyModal createAPIKey={createAPIKey} /> */}
      <div className="max-w-7xl mx-auto mt-12 px-4 pb-12">
        <div className="overflow-auto">
          <div className="flex justify-end">
            <CreateItemButton showModal={createAPIKey} itemName="API key"/>
          </div>
          <APIKeysList
            className="max-w-7xl mx-auto min-w-[800px] overflow-x-auto"
            apiKeys={data?.data ?? []}
            createAPIKey={createAPIKey}
          />
        </div>
      </div>
    </>
  );
};
