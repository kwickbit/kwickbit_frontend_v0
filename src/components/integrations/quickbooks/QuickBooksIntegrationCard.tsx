import React from 'react';
import Image from "next/image";
import { useBoolean } from "@/hooks/useBoolean";
import QuickBooksSettingsModal from "./QuickBooksIntegrationModal";
import classNames from "classnames";
import PrimaryButton from "../../PrimaryButton";
import useConnectToQuickbook from "@/hooks/integrations/quickbooks/useConnectToQuickbook";
import { useQueryIntegrationInformation } from "@/hooks/integrations/quickbooks";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";


const QuickBooksIntegrationCard: React.FC = (): React.JSX.Element => {
    const { handleConnectToQuickbook } = useConnectToQuickbook();
    const { data, isLoading, isError } = useQueryIntegrationInformation();
    const editIntegrationModal = useBoolean(false);

    if (isLoading) return (<div className="flex justify-center mt-8"><Loader/></div>);
    if (isError) return (<ServerError />);

    const isConnected = !!data?.data;
    const handleButtonClick = isConnected ? editIntegrationModal.onTrue : handleConnectToQuickbook;

    return (
        <>
            <div className="border rounded-md px-4 pt-2 pb-4 w-fit bg-white">
                <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
                    <div>
                        <Image src="/assets/quickbook-logo.png" alt="quickbooks" width={50} height={50} />
                    </div>
                    <div>
                        <p className="text-base text-neutral-900 font-bold">Quickbooks</p>
                        <p className="text-base text-neutral-500 font-bold">Accounting</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-4 h-64">
                    <p className="text-base text-neutral-500 font-bold">
                        {isConnected ? "Connected to Quickbooks account" : "Connecting a Quickbooks account"}
                    </p>
                    <PrimaryButton
                        onClick={handleButtonClick}
                        className={classNames(
                            "text-[#21254EFF] w-fit py-3 px-1 rounded-xl text-base",
                            isConnected ? "bg-sky-500" : "bg-[#4ADDB6FF]"
                        )}
                    >
                        {isConnected ? "Settings" : "Connect"}
                    </PrimaryButton>
                </div>
            </div>
            <QuickBooksSettingsModal shouldOpenModal={editIntegrationModal} />
        </>
    );
};

export default QuickBooksIntegrationCard;