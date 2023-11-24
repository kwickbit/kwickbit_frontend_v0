import React from "react";
import PrimaryButton from "../PrimaryButton";

const Integration = () => {
  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-[30px]">
        <div className="border rounded-[4px] px-[14px] pt-[8px] pb-[16px] w-fit">
          <div className="flex items-center gap-[15px] py-[16px] pl-[26px] bg-[#D7F0FBFF]">
            <div>
              <img src="/assets/quickbook-logo.png" alt="quickbooks" />
            </div>
            <div>
              <p className="text-[16px] text-[#171A1FFF] font-bold">
                Quickbooks
              </p>
              <p className="text-[16px] text-[#9095A1FF] font-bold">
                Accounting
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-[14px] px-[14px] h-[260px]">
            <p className="text-[16px] text-[#9095A1FF] font-bold">
              Connecting a Quickbooks account
            </p>
            <PrimaryButton className="bg-[#4ADDB6FF] text-[#21254EFF] w-[76px] py-[10px] px-[4px] rounded-[11px] text-[16px]">
              Connect
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
