import { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames";
import Modal from "@/components/Modal";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";

interface Props {
  shouldShowNewAPIKey: UseBooleanReturnProps;
  newAPIKey: string;
  setNewAPIKey: Dispatch<SetStateAction<string>>;
}

export const NewAPIKeyModal = ({
  shouldShowNewAPIKey,
  newAPIKey,
  setNewAPIKey,
}: Props): React.JSX.Element => {
  const [keyIsCopied, setKeyIsCopied] = useState(false);
  const [keyIsShown, setKeyIsShown] = useState(false);

  const toggleShowKey = (): void => {
    setKeyIsShown(!keyIsShown);
  };

  const maskedKey = newAPIKey.replaceAll(/./g, "*")

  const copyKeyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(newAPIKey);
      setKeyIsCopied(true);
      setTimeout(() => setKeyIsCopied(false), 2000);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const closeModal = (): void => {
    shouldShowNewAPIKey.onFalse();
    setNewAPIKey("");
  };

  return (
    <Modal
      title={"Your new API key"}
      modalClassNames="max-w-2xl"
      show={shouldShowNewAPIKey.value}
      closeModal={closeModal}
    >
      <div className="flex justify-between mb-4">
        <div>
          <p>This is your new API key. You need to put it somewhere safe.</p>
          <p className="font-bold">The key will not be shown to you again.</p>
          <p>Store it safely now.</p>
        </div>
        <button
          className={classNames(
            "rounded-md font-bold text-lg text-white px-6 py-2 min-w-[160px]",
            keyIsCopied ? "bg-green-400" : "bg-sky-400"
          )}
          onClick={copyKeyToClipboard}
        >
          {keyIsCopied ? "Copied!" : "Copy key"}
        </button>
      </div>
      <div className="flex flex-wrap bg-[#F3F4F6]">
        <div
          className="flex-1 flex items-center justify-center font-bold text-lg underline"
          onClick={toggleShowKey}
        >
          {keyIsShown ? "Hide key" : "Show key"}
        </div>
        <p
          className="break-words p-2 flex-shrink max-w-full"
        >
          {keyIsShown ? newAPIKey : maskedKey}
        </p>
      </div>
    </Modal>
  );
};
