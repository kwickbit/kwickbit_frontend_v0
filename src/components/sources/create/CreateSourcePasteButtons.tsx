import { ReactNode } from "react";
import { LuPaperclip } from "react-icons/lu";
import { PiKeyThin } from "react-icons/pi";

interface Props {
  onClickPasteManually?: () => void;
  onClickPasteFromFreighter?: () => void;
}

const CreateSourcePasteButtons = ({
  onClickPasteManually,
  onClickPasteFromFreighter,
}: Props): ReactNode => {
  return (
    <div className="flex items-center gap-4 flex-wrap my-6">
      <button
        onClick={onClickPasteManually}
        type="button"
        className="flex items-center bg-[#21254EFF] text-white px-4 py-2 gap-2"
      >
        <LuPaperclip />
        Paste manually
      </button>
      <button
        onClick={onClickPasteFromFreighter}
        type="button"
        className="flex items-center px-4 py-2 gap-2"
      >
        <PiKeyThin />
        Paste from Freighter
      </button>
    </div>
  );
};

export default CreateSourcePasteButtons;
