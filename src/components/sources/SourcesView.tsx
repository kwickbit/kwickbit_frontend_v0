import { ReactNode } from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { useQuerySources } from "@/hooks/sources";
import CreateSourceButton from "./create/CreateSourceButton";
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
      </div>
    </>
  );
};

export default SourcesView;
