import React, {useEffect} from 'react';
import Image from "next/image";
import { useBoolean } from "@/hooks/useBoolean";
import QuickBooksSettingsModal from "./QuickBooksIntegrationModal";
import classNames from "classnames";
import PrimaryButton from "../../PrimaryButton";
import useConnectToQuickbook from "@/hooks/integrations/quickbooks/useConnectToQuickbook";
import { useQueryIntegrationInformation } from "@/hooks/integrations/quickbooks";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import {v4 as uuidv4} from "uuid";
import useUserWebSocket from "@/hooks/useWebSocket";
import {toast} from "react-toastify";
import { useQuickBooksData } from '@/hooks/useQuickBooksDataProvider';


const QuickBooksIntegrationCard: React.FC = (): React.JSX.Element => {
    const { handleConnectToQuickbook } = useConnectToQuickbook();
    const { data, isLoading, isError } = useQueryIntegrationInformation();
    const editIntegrationModal = useBoolean(false);
    const { fetchUpdateAllAttributes, bills, accounts, invoices, currencies } = useQuickBooksData();
    const { fetchedUpdateIntegrationAllAttributes, setFetchedUpdateIntegrationAllAttributes } = useUserWebSocket();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (fetchedUpdateIntegrationAllAttributes) {
                toast.success("Integration account attributes (accounts, invoices, bills) fetched successfully");
                await currencies.refetch();
                await bills.refetch();
                await accounts.refetch();
                setFetchedUpdateIntegrationAllAttributes(null);
            }
        };

        fetchData();
    }, [fetchedUpdateIntegrationAllAttributes, bills, accounts, invoices, currencies, setFetchedUpdateIntegrationAllAttributes]);

    if (isLoading) return (<div className="flex justify-center mt-8"><Loader/></div>);
    if (isError) return (<ServerError />);

    const isConnected = !!data?.data;
    const handleButtonClick = isConnected ? editIntegrationModal.onTrue : handleConnectToQuickbook;

    const handleUpdateFetch = (): void => {
        const batchId = uuidv4();
        fetchUpdateAllAttributes.mutate({batchId, totalJobsCount: 4});
    };

    return (
        <>
            <div className="border rounded-md px-4 pt-2 pb-4 w-fit bg-white">
                <div className="flex items-center gap-4 py-4 pl-4 bg-[#D7F0FBFF]">
                    <div>
                        <Image src="/assets/quickbook-logo.png" alt="quickbooks" width={50} height={50}/>
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
                    <div className="flex justify-between items-end mt-4">
                        <PrimaryButton
                            onClick={handleButtonClick}
                            className={classNames(
                                "text-[#21254EFF] py-3 px-1 rounded-xl text-base",
                                isConnected ? "bg-sky-500" : "bg-[#4ADDB6FF]"
                            )}
                        >
                            {isConnected ? "Settings" : "Connect"}
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={handleUpdateFetch}
                            className={classNames(
                                "text-[#21254EFF] text-white font-bold py-3 px-4 rounded",
                                isConnected ? "bg-blue-500 hover:bg-blue-700" : "bg-[#4ADDB6FF]"
                            )}
                        >
                            Update/Fetch
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <QuickBooksSettingsModal shouldOpenModal={editIntegrationModal}/>
        </>
    );
};

export default QuickBooksIntegrationCard;