import classNames from "classnames";
import { ReactNode } from "react";
import { LuPaperclip } from "react-icons/lu";
import { PiKeyThin } from "react-icons/pi";

interface Props {
  onClickPasteManually?: () => void;
  onClickPasteFromFreighter?: () => void;
  selectedTab: "manually" | "freighter";
}

const CreateSourcePasteButtons = ({
  onClickPasteManually,
  onClickPasteFromFreighter,
  selectedTab,
}: Props): ReactNode => {
  return (
    <div className="flex items-center flex-wrap my-6">
      <button
        onClick={onClickPasteManually}
        type="button"
        className={classNames(
          "flex items-center px-4 py-2 gap-2",
          selectedTab === "manually"
            ? "bg-[#21254EFF] text-white "
            : "bg-transparent"
        )}
      >
        <LuPaperclip />
        Paste manually
      </button>
      <button
        onClick={onClickPasteFromFreighter}
        type="button"
        className={classNames(
          "flex items-center px-4 py-2 gap-2",
          selectedTab === "freighter"
            ? "bg-[#21254EFF] text-white "
            : "bg-transparent"
        )}
      >
        <PiKeyThin />
        Paste from Freighter
      </button>
    </div>
  );
};

export default CreateSourcePasteButtons;
