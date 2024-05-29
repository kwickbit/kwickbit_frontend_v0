import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { ReconciliationEntrySources } from "@/services/reports/reconciliation";

interface Props {
  entriesSource: ReconciliationEntrySources;
  setEntriesSource: Dispatch<SetStateAction<ReconciliationEntrySources>>;
}

export const EntrySourceButtons = ({
  entriesSource,
  setEntriesSource
}: Props): React.JSX.Element => {

  const buttonClasses = (source: ReconciliationEntrySources): string => {
    return classNames(
      "px-4 py-2 text-base font-bold text-[#9095A1] hover:text-[#565D6D] font-manrope",
      "hover:bg-[#D7F0FB] rounded-lg transition-all duration-200 ease-in-out relative capitalize",
      entriesSource === source ? "bg-[#D7F0FB]" : "bg-gray-200");
  };

  return (
    <div className="flex justify-between mx-16">
      {Object.values(ReconciliationEntrySources).map(
        source => {
          return <div
            key={source}
            className={buttonClasses(source)}
            onClick={(): void => setEntriesSource(source)}
          >
            {source}
          </div>
        }
      )}
    </div>
  );
};
