import React from "react";
import PrimaryButton from "../PrimaryButton";

const Integration: React.FC = (): JSX.Element => {
  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-8">
        <div className="border rounded-md px-4 pt-2 pb-4 w-fit">
          <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
            <div>
              <img src="/assets/quickbook-logo.png" alt="quickbooks" />
            </div>
            <div>
              <p className="text-base text-[#171A1FFF] font-bold">Quickbooks</p>
              <p className="text-base text-[#9095A1FF] font-bold">Accounting</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-4 px-4 h-64">
            <p className="text-base text-[#9095A1FF] font-bold">
              Connecting a Quickbooks account
            </p>
            <PrimaryButton className="bg-[#4ADDB6FF] text-[#21254EFF] w-20 py-3 px-1 rounded-xl text-base">
              Connect
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
