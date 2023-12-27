import { Warning } from "../common/AppIcon";
import cn from "classnames";

interface Props {
  message: string;
  shouldShow: boolean;
}

const CommonWarningAlert = ({ shouldShow, message }: Props): JSX.Element => {
  return (
    <div
      className={cn(
        "relative w-full py-4 px-2 mb-2 bg-[#ECB90D] shadow border text-white text-base font-bold flex items-center gap-2",
        { hidden: !shouldShow },
        { block: shouldShow }
      )}
    >
      <Warning />
      <span>{message}</span>
    </div>
  );
};

export default CommonWarningAlert;
