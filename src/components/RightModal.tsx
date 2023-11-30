import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface Props {
  show: boolean;
  children: ReactNode;
  closeModal: () => void;
  modalClassNames?: string;
}

const RightModal = ({
  show,
  closeModal,
  children,
  modalClassNames,
}: Props): ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModalOnClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", closeModalOnClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", closeModalOnClickOutside);
    };
  }, [show, closeModalOnClickOutside]);

  return (
    <>
      {show ? (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex justify-end items-center h-full">
              <div
                className={classNames(
                  "relative my-6 w-full",
                  modalClassNames
                )}
                ref={modalRef}
              >
                { children }
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default RightModal;
