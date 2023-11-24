import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  onClickPrimary?: () => void;
  onClickSecondary: () => void;
  isLoading?: boolean;
}

const CreateSourceActionButtons = ({
  onClickPrimary,
  onClickSecondary,
  isLoading,
}: Props): ReactNode => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <button
        onClick={onClickSecondary}
        type="button"
        className={classNames(
          "flex items-center bg-[#F3F4F6FF] rounded-md font-bold text-lg  px-6 py-2 gap-2 my-6",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        Previous
      </button>
      <button
        onClick={onClickPrimary}
        type="submit"
        className={classNames(
          "flex items-center bg-sky-400 rounded-md font-bold text-lg text-white px-6 py-2 gap-2 my-6",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        Create
      </button>
    </div>
  );
};

export default CreateSourceActionButtons;
