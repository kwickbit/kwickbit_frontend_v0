import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import { SourceProps } from "@/services/sources";
import { toast } from "react-toastify";
import { UseBooleanReturnProps } from "./useBoolean";
import { UseFormReturn, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  createSource: UseBooleanReturnProps;
}

interface ReturnProps {
  getModalTitle: () => string;
  setSelectedBlockchainId: Dispatch<SetStateAction<string>>;
  selectedBlockchainId: string;
  handlePasteClipboardIntoAddress: () => Promise<any>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  methods: UseFormReturn<
    {
      name: string;
      address: string;
    },
    any,
    undefined
  >;
  handleClickBlockchainItem: (blockchainId: string) => void;
  onCloseModal: () => void;
}

const useCreateSourceModal = ({ createSource }: Props): ReturnProps => {
  const queryClient = useQueryClient();

  const [selectedBlockchainId, setSelectedBlockchainId] = useState("");

  const handleClickBlockchainItem = (blockchainId: string): void => {
    setSelectedBlockchainId(blockchainId);
  };

  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  const handlePasteClipboardIntoAddress = async (): Promise<any> => {
    try {
      const text = await navigator.clipboard.readText();
      setValue("address", text);
    } catch (err) {
      toast.error("We couldn't read your clipboard.");
    }
  };

  const onCloseModal = (): void => {
    setSelectedBlockchainId("");
    reset();
    createSource.onFalse();
  };

  const onSubmit = handleSubmit((data) => {
    const actualDate = new Date();

    const newSourceItem: SourceProps = {
      id: Math.random().toString(),
      walletName: data.name,
      walletAddress: data.address,
      importDate: actualDate.toLocaleDateString(),
      importTime: actualDate.toLocaleTimeString(),
      lastUpdatedDate: actualDate.toLocaleDateString(),
      lastUpdatedTime: actualDate.toLocaleTimeString(),
    };

    queryClient.setQueryData(["sources"], (oldData: any) => ({
      ...oldData,
      data: [...oldData.data, newSourceItem],
    }));

    toast.success("Source created successfully");

    onCloseModal();
  });

  const getModalTitle = (): string => {
    if (!selectedBlockchainId) return "Choose Source Blockchain";
    return "Please enter Wallet details";
  };

  return {
    getModalTitle,
    setSelectedBlockchainId,
    selectedBlockchainId,
    handlePasteClipboardIntoAddress,
    onSubmit,
    methods,
    handleClickBlockchainItem,
    onCloseModal,
  };
};

export default useCreateSourceModal;
