import { ReactNode } from "react";

interface Props {
  onClickPrimary?: () => void;
  onClickSecondary: () => void;
}

const CreateSourceActionButtons = ({
  onClickPrimary,
  onClickSecondary,
}: Props): ReactNode => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <button
        onClick={onClickSecondary}
        type="button"
        className="flex items-center bg-[#F3F4F6FF] rounded-md font-bold text-lg  px-6 py-2 gap-2 my-6"
      >
        Previous
      </button>
      <button
        onClick={onClickPrimary}
        type="submit"
        className="flex items-center bg-sky-400 rounded-md font-bold text-lg text-white px-6 py-2 gap-2 my-6"
      >
        Create
      </button>
    </div>
  );
};

export default CreateSourceActionButtons;
