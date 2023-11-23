import { ReactNode, SyntheticEvent } from "react";

interface Props {
  onSelectAll: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
}

const SourcesHeader = ({ onSelectAll }: Props): ReactNode => {
  return (
    <div className="grid grid-cols-6 items-center px-6 py-4">
      <div className="col-span-1 flex items-center gap-8">
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={onSelectAll}
        />
      </div>
      <div className="col-span-2" />
      <div className="col-span-1 flex justify-center">
        <span>Import date</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span>LAST UPDATED</span>
      </div>
    </div>
  );
};

export default SourcesHeader;
