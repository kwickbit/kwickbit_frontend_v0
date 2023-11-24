import { ReactNode } from "react";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import CreateSourceActionButtons from "./CreateSourceActionButtons";
import CreateSourceBlockchainsList from "./CreateSourceBlockchainsList";
import CreateSourceFieldInput from "./CreateSourceFieldInput";
import CreateSourcePasteButtons from "./CreateSourcePasteButtons";
import FormProvider from "../../FormProvider";
import Modal from "../../Modal";
import useCreateSourceModal from "@/hooks/useCreateSourceModal";

export interface SourceBlockchain {
  id: string;
  name: string;
  image: string;
}

const sourceBlockchains: SourceBlockchain[] = [
  {
    id: "1",
    name: "Stellar",
    image: "/assets/stellar-logo.jpeg",
  },
];

interface Props {
  createSource: UseBooleanReturnProps;
}

const CreateSourceModal = ({ createSource }: Props): ReactNode => {
  const {
    getModalTitle,
    setSelectedBlockchainId,
    selectedBlockchainId,
    onSubmit,
    methods,
    handleClickBlockchainItem,
    onCloseModal,
    handleClickPasteFreighter,
    handleClickPasteManually,
    selectedTab,
    handleClickCopyFreighter,
  } = useCreateSourceModal({ createSource });

  return (
    <>
      <Modal
        title={getModalTitle()}
        modalClassNames="max-w-2xl"
        show={createSource.value}
        closeModal={onCloseModal}
      >
        <div className="min-h-[350px] w-full">
          {!selectedBlockchainId && (
            <CreateSourceBlockchainsList
              sourceBlockchains={sourceBlockchains}
              onClickBlockchainItem={handleClickBlockchainItem}
            />
          )}
          {selectedBlockchainId && (
            <FormProvider
              methods={methods}
              onSubmit={onSubmit}
              className="text-[#21254EFF] h-full"
            >
              <CreateSourceFieldInput
                name="name"
                label="Name"
                placeholder="Enter your wallet name"
                required
              />
              <CreateSourcePasteButtons
                onClickPasteManually={handleClickPasteManually}
                onClickPasteFromFreighter={handleClickPasteFreighter}
                selectedTab={selectedTab}
              />
              <CreateSourceFieldInput
                name="address"
                label="Address"
                placeholder="Enter your wallet address"
                required
                withPasteButton={selectedTab === "freighter"}
                onClickPasteButton={handleClickCopyFreighter}
              />
              <CreateSourceActionButtons
                onClickSecondary={(): void => setSelectedBlockchainId("")}
              />
            </FormProvider>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CreateSourceModal;
