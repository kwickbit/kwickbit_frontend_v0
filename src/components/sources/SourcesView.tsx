import { ReactNode } from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { useQuerySources } from "@/hooks/sources";
import CreateSourceButton from "./create/CreateSourceButton";
import CreateSourceModal from "./create/CreateSourceModal";
import Loader from "../Loader";
import ServerError from "../ServerError";
import SourcesList from "./SourcesList";
import {apiClient} from "@/lib/api-client";

const SourcesView = (): ReactNode => {
  const { data, isLoading, isError } = useQuerySources();

  const createSource = useBoolean();

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

  const getSources = async (): Promise<void> => {
    const result = await apiClient.get('/wallets/list');
    console.log(result);
  };

  const addSources = async (): Promise<void> => {
    const result = await apiClient.post('/wallets/add', {
      name: 'Wallet name from form input',
      address: 'Wallet address from form input',
      workspaceId: 'constant to whatever you want for now',
    });
    console.log(result);
  };

  return (
    <>
      <CreateSourceModal createSource={createSource} />
      <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
        <div className="flex justify-end">
          <CreateSourceButton createSource={createSource} />
        </div>
        <SourcesList
          className="max-w-5xl mx-auto min-w-[800px] overflow-x-auto"
          sources={data?.data}
          createSource={createSource}
        />
        <button onClick={getSources}>Get Sources</button>
        <button onClick={addSources}>Add Source</button>
      </div>
    </>
  );
};

export default SourcesView;
