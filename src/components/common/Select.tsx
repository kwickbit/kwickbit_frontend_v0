import { Listbox, Transition } from "@headlessui/react";
import React, {Fragment, ReactNode} from "react";
import { DownArrowIcon } from "./AppIcon";


interface Props<T> {
  selected: T | null;
  setSelected: (s: T) => void;
  options: T[];
  disabled?: boolean;
  renderLabel: (value: T | null) => ReactNode;
}
const Select = <T,>({
  selected,
  setSelected,
  options = [],
  disabled = false,
  renderLabel,
}: Props<T>): React.JSX.Element => {
  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled}>
      <div className="relative w-full">
        <Listbox.Button className="relative rounded-xl bg-[#F3F4F6] text-[#565D6D] text-xs px-3 w-full h-8 flex items-center">
          <span className="block truncate text-left w-[calc(100%-24px)]">
            {renderLabel(selected)}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <DownArrowIcon className="w-4 h-4" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((obj, index) => (
              <Listbox.Option
                key={index}
                className={({ active }):string =>
                  `relative cursor-pointer select-none py-2 px-4 text-sm text-black font-poppins hover:bg-primary hover:text-white ${
                    active ? "bg-[#21254E] text-white" : "text-black"
                  }`
                }
                value={obj}
              >
                {({ selected }): React.JSX.Element => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {renderLabel(obj)}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
