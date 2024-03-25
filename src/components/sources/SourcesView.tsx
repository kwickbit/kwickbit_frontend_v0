import { ReactNode } from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { useQuerySources } from "@/hooks/sources";
import CreateItemButton from "../common/CreateItemButton";
import CreateSourceModal from "./create/CreateSourceModal";
import Loader from "../Loader";
import ServerError from "../ServerError";
import SourcesList from "./SourcesList";

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

  const maybeData = data?.data ?? []

  return (
    <>
      <CreateSourceModal createSource={createSource} />
      <div className="max-w-7xl mx-auto mt-12 px-4 pb-12">
        <div className="overflow-auto">
          {maybeData.length && <div className="flex justify-end">
            <CreateItemButton showModal={createSource} itemName="Source" />
          </div>}
          <SourcesList
            className="max-w-7xl mx-auto min-w-[800px] overflow-x-auto"
            sources={maybeData}
            createSource={createSource}
          />
        </div>
      </div>
    </>
  );
};

export default SourcesView;
