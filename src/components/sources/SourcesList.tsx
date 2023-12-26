import { ReactNode, SyntheticEvent, useState } from "react";
import { SourceWallet } from "@/services/sources";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CreateSourceButton from "./create/CreateSourceButton";
import SourceItem from "./SourceItem";
import SourcesHeader from "./SourcesHeader";

interface Props {
  className: string;
  sources: SourceWallet[];
  createSource: UseBooleanReturnProps;
}

const SourcesList = ({
  className,
  sources,
  createSource,
}: Props): ReactNode => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelectItem = (
    e: SyntheticEvent<HTMLInputElement, Event>,
    id: string
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems(sources.map((source) => source.walletId));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className={className}>
      {sources.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-center">No wallet yet, please add source</p>
          <div className="mt-24">
            <CreateSourceButton createSource={createSource} />
          </div>
        </div>
      ) : (
        <>
          <SourcesHeader onSelectAll={handleSelectAll} />
          <div className="flex flex-col gap-4 h-full pb-8">
            {sources && sources.map((source, idx) => (
              <SourceItem
                source={source}
                key={idx}
                onSelect={handleSelectItem}
                isSelected={selectedItems.includes(source.walletId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SourcesList;
