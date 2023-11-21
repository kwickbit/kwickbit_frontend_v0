import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  onClick?: VoidFunction;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  disabled,
  type,
  isLoading,
}: Props): JSX.Element => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      className={classNames(
        "text-white px-24 py-2 rounded-lg",
        "bg-[#21254EFF]",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
