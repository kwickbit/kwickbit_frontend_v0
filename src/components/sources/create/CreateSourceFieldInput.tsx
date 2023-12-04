import classNames from "classnames";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { PiKeyThin } from "react-icons/pi";

interface Props {
  name: string;
  label: string;
  withPasteButton?: boolean;
  onClickPasteButton?: () => void;
  [x: string]: any;
}

const CreateSourceFieldInput = ({
  name,
  label,
  withPasteButton,
  onClickPasteButton,
  ...rest
}: Props): ReactNode => {
  const { register } = useFormContext();
  return (
    <div>
      <label className="block font-semibold mb-1 text-lg">{label}</label>
      <div className="grid grid-cols-5">
        {withPasteButton && (
          <button
            onClick={onClickPasteButton}
            type="button"
            className="bg-indigo-600 col-span-2 flex items-center px-4 py-2 gap-2 text-sm text-white rounded-tl-md rounded-bl-md"
          >
            <PiKeyThin />
            Copy address from freighter
          </button>
        )}
        <input
          type="text"
          {...register(name)}
          className={classNames(
            "outline-none border border-gray-500 py-3 px-3 w-full",
            withPasteButton ? "rounded-tr-md rounded-br-md col-span-3" : "rounded-md col-span-5",
            withPasteButton ? "bg-gray-200" : "bg-white"
          )}
          readOnly={withPasteButton}
          {...rest}
        />
      </div>
    </div>
  );
};

export default CreateSourceFieldInput;
