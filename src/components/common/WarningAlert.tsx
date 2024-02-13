import {CircleClose, Warning} from "../common/AppIcon";
import cn from "classnames";
import React from "react";

interface Props {
  message: string;
  shouldShow: boolean;
  onClose: () => void;
}

const CommonWarningAlert = ({ shouldShow, message, onClose }: Props): React.JSX.Element => {
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
      <CircleClose onClick={onClose} />
    </div>
  );
};

export default CommonWarningAlert;
