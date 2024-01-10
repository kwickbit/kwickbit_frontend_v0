import { ReactNode, SyntheticEvent, useState } from "react";
import { SourceWallet } from "@/services/sources";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CreateSourceButton from "./create/CreateSourceButton";
import SourceItem from "./SourceItem";
import SourcesHeader from "./SourcesHeader";
import {v4 as uuidv4} from "uuid";
import {apiClient} from "@/lib/api-client";
import { RxTriangleDown, RxUpdate, RxClipboardCopy, RxClipboard, RxEnvelopeOpen, RxEnvelopeClosed } from "react-icons/rx";

interface Props {
  className: string;
  sources: SourceWallet[];
  createSource: UseBooleanReturnProps;
}

const SourcesList = ({
  className,
  sources,
  createSource,
}: Props): ReactNode => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelectItem = (
    e: SyntheticEvent<HTMLInputElement, Event>,
    id: string
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems(sources.map((source) => source.walletId));
    } else {
      setSelectedItems([]);
    }
  };

  const updateTransactions = async (): Promise<void> => {
    console.log('Fetch all transactions not implemented yet');
  };

  const fetchInvoices = async (): Promise<void> => {
    const deduplicationId = uuidv4();
    const request = await apiClient.post('/fetch-invoices', {
      integrationProvider: 'QuickBooks',
      deduplicationId,
    });
    console.log(request.data);

    // if (request.data.nextCursors) {
    //   const request2 = await apiClient.post('/transactions', {
    //     cursors: request.data.nextCursors
    //   });
    //   console.log(request2.data);
    // }
  };

  const fetchBills = async (): Promise<void> => {
    const deduplicationId = uuidv4();
    const request = await apiClient.post('/fetch-bills', {
      integrationProvider: 'QuickBooks',
      deduplicationId,
    });
    console.log(request.data);

    // if (request.data.nextCursors) {
    //   const request2 = await apiClient.post('/transactions', {
    //     cursors: request.data.nextCursors
    //   });
    //   console.log(request2.data);
    // }
  };

  const getInvoices = async (): Promise<void> => {
    const request = await apiClient.post('/integrations/intuit/get-invoices', {
      integrationProvider: 'QuickBooks',
    });
    console.log(request.data);

    // if (request.data.nextCursors) {
    //   const request2 = await apiClient.post('/transactions', {
    //     cursors: request.data.nextCursors
    //   });
    //   console.log(request2.data);
    // }
  };

  const getBills = async (): Promise<void> => {
    const request = await apiClient.post('/integrations/intuit/get-bills', {
      integrationProvider: 'QuickBooks',
    });
    console.log(request.data);

    // if (request.data.nextCursors) {
    //   const request2 = await apiClient.post('/transactions', {
    //     cursors: request.data.nextCursors
    //   });
    //   console.log(request2.data);
    // }
  };

  const getTransactions = async (): Promise<void> => {
    const request = await apiClient.post('/transactions');
    console.log(request.data);

    if (request.data.nextCursors) {
      const request2 = await apiClient.post('/transactions', {
        cursors: request.data.nextCursors
      });
      console.log(request2.data);
    }
  };

  return (
    <div className={className}>
      {sources.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-center">No wallet yet, please add source</p>
          <div className="mt-24">
            <CreateSourceButton createSource={createSource} />
          </div>
        </div>
      ) : (
        <>
          <RxUpdate className="w-6 h-6 cursor-pointer text-neutral-900" onClick={updateTransactions} />
          <RxClipboardCopy className="w-6 h-6 cursor-pointer text-neutral-900" onClick={fetchInvoices} />
          <RxEnvelopeClosed className="w-6 h-6 cursor-pointer text-neutral-900" onClick={fetchBills} />
          <RxClipboard className="w-6 h-6 cursor-pointer text-neutral-900" onClick={getInvoices} />
          <RxEnvelopeOpen className="w-6 h-6 cursor-pointer text-neutral-900" onClick={getBills} />
          <RxTriangleDown className="w-6 h-6 cursor-pointer text-neutral-900" onClick={getTransactions} />
          <SourcesHeader onSelectAll={handleSelectAll} />
          <div className="flex flex-col gap-4 h-full pb-8">
            {sources && sources.map((source, idx) => (
              <SourceItem
                source={source}
                key={idx}
                onSelect={handleSelectItem}
                isSelected={selectedItems.includes(source.walletId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SourcesList;
