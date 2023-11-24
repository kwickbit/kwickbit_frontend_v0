import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import { getPublicKey } from "@stellar/freighter-api";
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
  handleClickPasteManually: () => void;
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
  selectedTab: "manually" | "freighter";
  handleClickPasteFreighter: () => void;
  handleClickCopyFreighter: () => void;
}

const useCreateSourceModal = ({ createSource }: Props): ReturnProps => {
  const queryClient = useQueryClient();

  const [selectedBlockchainId, setSelectedBlockchainId] = useState("");

  const handleClickBlockchainItem = (blockchainId: string): void => {
    setSelectedBlockchainId(blockchainId);
  };

  const [selectedTab, setSelectedTab] = useState<"manually" | "freighter">(
    "manually"
  );

  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const handleClickPasteManually = (): void => {
    setSelectedTab("manually");
  };

  const handleClickPasteFreighter = (): void => {
    setSelectedTab("freighter");
  };

  const handleClickCopyFreighter = async (): Promise<void> => {
    try {
      const publicKey = await getPublicKey();
      setValue("address", publicKey);
    } catch (error: any) {
      toast.error(error ?? "Error while getting public key");
    }
  };

  const onCloseModal = (): void => {
    setSelectedBlockchainId("");
    reset();
    createSource.onFalse();
  };

  const onSubmit = handleSubmit((data) => {
    const today = new Date();

    const actualDateFormat = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const actualTimeFormat = today.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const newSourceItem: SourceProps = {
      id: Math.random().toString(),
      walletName: data.name,
      walletAddress: data.address,
      importDate: actualDateFormat,
      importTime: actualTimeFormat,
      lastUpdatedDate: actualDateFormat,
      lastUpdatedTime: actualTimeFormat,
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
    handleClickBlockchainItem,
    handleClickCopyFreighter,
    handleClickPasteFreighter,
    handleClickPasteManually,
    methods,
    onCloseModal,
    onSubmit,
    selectedBlockchainId,
    selectedTab,
    setSelectedBlockchainId,
  };
};

export default useCreateSourceModal;
