import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import { getPublicKey } from "@stellar/freighter-api";
import { toast } from "react-toastify";
import { UseBooleanReturnProps } from "./useBoolean";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutationCreateSource } from "./sources";

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
      chain: string;
    },
    any,
    undefined
  >;
  handleClickBlockchainItem: (blockchainId: string) => void;
  onCloseModal: () => void;
  selectedTab: "manually" | "freighter";
  handleClickPasteFreighter: () => void;
  handleClickCopyFreighter: () => void;
  isLoadingCreate: boolean;
}

const useCreateSourceModal = ({ createSource }: Props): ReturnProps => {
  const create = useMutationCreateSource();

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
      chain: "",
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
    create.mutate(
      {
        address: data.address,
        name: data.name,
        workspaceId: "whatever",
        chain: selectedBlockchainId,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message ?? "Source created successfully");
          onCloseModal();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error while creating source");
        },
      }
    );
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
    isLoadingCreate: create.isPending,
  };
};

export default useCreateSourceModal;
