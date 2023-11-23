import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface Props {
  show: boolean;
  children: ReactNode;
  closeModal: () => void;
  title: string;
  modalClassNames?: string;
}

const Modal = ({
  show,
  closeModal,
  children,
  title,
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className={classNames(
                "relative my-6 mx-auto w-full",
                modalClassNames
              )}
              ref={modalRef}
            >
              <div className="rounded pt-5 pb-8 px-10 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start mb-8">
                  <h3 className="text-3xl font-semibold text-[#21254EFF]">
                    {title}
                  </h3>
                </div>
                <div className="relative flex-auto">{children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
