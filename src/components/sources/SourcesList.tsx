/* eslint-disable @next/next/no-img-element */
import { ReactNode, SyntheticEvent, useState } from "react";
import { SourceProps } from "@/services/sources";
import AddSourceButton from "./AddSourceButton";
import SourceItem from "./SourceItem";
import SourcesHeader from "./SourcesHeader";

interface Props {
  className: string;
  sources: SourceProps[];
}

const SourcesList = ({ className, sources }: Props): ReactNode => {
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
      setSelectedItems(sources.map((source) => source.id));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className={className}>
      <SourcesHeader onSelectAll={handleSelectAll} />
      <div className="flex flex-col gap-4 h-full">
        {sources.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16">
            <p className="text-center">No wallet yet, please add source</p>
            <div className="mt-24">
              <AddSourceButton />
            </div>
          </div>
        )}
        {sources.map((source, idx) => (
          <SourceItem
            source={source}
            key={idx}
            onSelect={handleSelectItem}
            isSelected={selectedItems.includes(source.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SourcesList;
