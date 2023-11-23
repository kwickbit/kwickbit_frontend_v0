import { ReactNode } from "react";
import { useQuerySources } from "@/hooks/sources";
import Loader from "../Loader";
import ServerError from "../ServerError";
import SourcesList from "./SourcesList";
import AddSourceButton from "./AddSourceButton";

const SourcesView = (): ReactNode => {
  const { data, isLoading, isError } = useQuerySources();

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
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4">
      <div className="flex justify-end">
        <AddSourceButton />
      </div>
      <SourcesList
        className="max-w-5xl mx-auto min-w-[800px] overflow-x-auto"
        sources={data?.data}
      />
    </div>
  );
};

export default SourcesView;
