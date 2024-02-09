import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { DownArrowIcon } from "@/components/common/AppIcon";
import { AvailableAccount } from "@/services/integrations/quickbooks";

export interface SelectOption {
  id: number | string;
  title: string;
  value: string;
}

interface Props {
  selected: AvailableAccount | null;
  setSelected: (s: AvailableAccount) => void;
  options: AvailableAccount[] | undefined;
  disabled?: boolean;
  placeholder: string;
}
const CurrencySelect = ({
  selected,
  setSelected,
  options = [],
  disabled = false,
  placeholder
}: Props): React.JSX.Element => {
  return (
    <Listbox value={selected || {}} onChange={setSelected} disabled={disabled}>
      <div className="relative">
        <Listbox.Button className="relative rounded border-[#9095A1] border text-[#171A1F] text-sm pl-3 pr-7 py-2 w-48 flex items-center">
          <span className="block truncate text-left w-full">
            { selected? selected.name: placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                      {obj.name}
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

export default CurrencySelect;
