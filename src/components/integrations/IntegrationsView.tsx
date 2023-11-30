/* eslint-disable @next/next/no-img-element */
import PrimaryButton from "../PrimaryButton";
import useConnectToQuickbook from "@/hooks/useConnectToQuickbook";

const IntegrationsView: React.FC = (): React.JSX.Element => {
  const { handleConnecToQuickbook } = useConnectToQuickbook();

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-8">
        <div className="border rounded-md px-4 pt-2 pb-4 w-fit bg-white">
          <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
            <div>
              <img src="/assets/quickbook-logo.png" alt="quickbooks" />
            </div>
            <div>
              <p className="text-base text-neutral-900 font-bold">Quickbooks</p>
              <p className="text-base text-neutral-500 font-bold">Accounting</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-4 h-64">
            <p className="text-base text-neutral-500 font-bold">
              Connecting a Quickbooks account
            </p>
            <PrimaryButton
              onClick={handleConnecToQuickbook}
              className="bg-[#4ADDB6FF] text-[#21254EFF] w-fit py-3 px-1 rounded-xl text-base"
            >
              Connect
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
