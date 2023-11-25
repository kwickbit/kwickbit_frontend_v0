import { NonSetCurrencyProps } from "@/services/transactions";
import { Warning, CircleClose } from "../common/AppIcon";
import Link from "next/link";
import cn from "classnames";

interface Props {
  nonSetMapping: NonSetCurrencyProps;
  shouldShow: boolean;
  onClose: () => void;
}

const WarningAlert = ({
  nonSetMapping,
  shouldShow,
  onClose,
}: Props): JSX.Element => {
  return (
    <div
      className={cn(
        "relative w-full py-4 px-2 mb-2 bg-[#ECB90D] shadow border text-white text-base font-bold flex items-center gap-2",
        { hidden: !shouldShow },
        { block: shouldShow }
      )}
    >
      <Warning />
      <span>
        {`Current currency/token is not set on integration mapping: ${nonSetMapping.token}. Configure `}
        <Link
          className="text-white text-base font-bold underline decoration-white"
          href="#"
        >
          integration mapping
        </Link>
        &nbsp; for TRT in order to be able to push this transaction to
        Quickbooks.
      </span>
      <button
        className="absolute top-1 right-1 appearance-none"
        onClick={(): void => onClose()}
      >
        <CircleClose />
      </button>
    </div>
  );
};

export default WarningAlert;
